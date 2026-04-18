using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Persistence.Repositories
{
    public class TemplateCategoryRepository : BaseRepository<TemplateCategory>, ITemplateCategoryRepository
    {
        public TemplateCategoryRepository(IMongoDatabase db) : base(db, CollectionNames.TemplateCategory)
        {
        }

        public async Task<IEnumerable<TemplateCategory>> GetActiveCategoriesAsync()
        {
            var filter = Builders<TemplateCategory>.Filter.Eq(c => c.IsActive, true);
            
            return await _collection
                .Find(filter)
                .SortBy(c => c.SortOrder)
                .ToListAsync();
        }
    }
}