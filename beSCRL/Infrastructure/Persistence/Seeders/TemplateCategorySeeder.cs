using Domain.Entities;
using Infrastructure.Persistence;
using MongoDB.Driver;

namespace Infrastructure.Persistence.Seeders
{
    public class TemplateCategorySeeder
    {
        private readonly IMongoCollection<TemplateCategory> _collection;

        public TemplateCategorySeeder(IMongoDatabase database)
        {
            _collection = database.GetCollection<TemplateCategory>(CollectionNames.TemplateCategory);
        }

        public async Task SeedAsync()
        {
            var categories = new List<TemplateCategory>
            {
                new()
                {
                    Code = "stories",
                    Name = "Stories",
                    Description = "Vertical story templates for quick visual storytelling.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 1,
                    IsFeatured = false,
                    IsActive = true
                },
                new()
                {
                    Code = "top-templates",
                    Name = "Top Templates",
                    Description = "Most popular and featured templates.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 2,
                    IsFeatured = true,
                    IsActive = true
                },
                new()
                {
                    Code = "collage",
                    Name = "Collage",
                    Description = "Editorial collage templates with multiple photos.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 3,
                    IsFeatured = false,
                    IsActive = true
                },
                new()
                {
                    Code = "scrapbook",
                    Name = "Scrapbook",
                    Description = "Memory-book style templates with notes and photos.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 4,
                    IsFeatured = false,
                    IsActive = true
                },
                new()
                {
                    Code = "film",
                    Name = "Film",
                    Description = "Analog and film-like layouts.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 5,
                    IsFeatured = false,
                    IsActive = true
                },
                new()
                {
                    Code = "celebrations",
                    Name = "Celebrations",
                    Description = "Birthday and party templates for special moments.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 6,
                    IsFeatured = false,
                    IsActive = true
                },
                new()
                {
                    Code = "creator-templates",
                    Name = "Creator Templates",
                    Description = "Templates for creators and personal brands.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 7,
                    IsFeatured = false,
                    IsActive = true
                },
                new()
                {
                    Code = "vision-boards",
                    Name = "Vision Boards",
                    Description = "Moodboard and vision board layouts.",
                    CoverImageUrl = "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80",
                    SortOrder = 8,
                    IsFeatured = false,
                    IsActive = true
                }
            };

            foreach (var category in categories)
            {
                var filter = Builders<TemplateCategory>.Filter.Eq(c => c.Code, category.Code);
                var update = Builders<TemplateCategory>.Update
                    .Set(c => c.Name, category.Name)
                    .Set(c => c.Description, category.Description)
                    .Set(c => c.CoverImageUrl, category.CoverImageUrl)
                    .Set(c => c.SortOrder, category.SortOrder)
                    .Set(c => c.IsFeatured, category.IsFeatured)
                    .Set(c => c.IsActive, category.IsActive);

                await _collection.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true });
            }
        }
    }
}