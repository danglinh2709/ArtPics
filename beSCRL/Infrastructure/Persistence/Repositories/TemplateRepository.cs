using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Persistence.Repositories
{
    public class TemplateRepository : BaseRepository<Template>, ITemplateRepository
    {
        public TemplateRepository(IMongoDatabase db) : base(db, CollectionNames.Templates)
        {
        }

      

        public async Task<IEnumerable<Template>> GetAllActiveAsync(string? category = null)
        {
            var filter = Builders<Template>.Filter.Eq(t => t.IsActive, true);
            
            if (!string.IsNullOrEmpty(category))
            {
                filter &= Builders<Template>.Filter.Eq(t => t.Category, category);
            }

            return await _collection
                .Find(filter)
                .SortBy(t => t.SortOrder)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<string>> GetAllCategoriesAsync()
        {
#pragma warning disable CS8619 // Nullability of reference types in value doesn't match target type.
            return await _collection
                .Distinct(t => t.Category, Builders<Template>.Filter.Eq(t => t.IsActive, true))
                .ToListAsync();
#pragma warning restore CS8619 // Nullability of reference types in value doesn't match target type.
        }
    }
}
