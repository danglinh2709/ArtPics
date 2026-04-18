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

      

        public async Task<IEnumerable<Template>> GetAllActiveAsync(string? categoryCode = null, string? format = null)
        {
            var filter = Builders<Template>.Filter.Eq(t => t.IsActive, true);
            
            if (!string.IsNullOrEmpty(categoryCode))
            {
                filter &= Builders<Template>.Filter.Eq(t => t.CategoryCode, categoryCode);
            }

            if (!string.IsNullOrEmpty(format))
            {
                filter &= Builders<Template>.Filter.Eq(t => t.Format, format);
            }

            return await _collection
                .Find(filter)
                .SortBy(t => t.SortOrder)
                .ThenByDescending(t => t.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<string>> GetAllCategoriesAsync()
        {
#pragma warning disable CS8619 
            return await _collection
                .Distinct(t => t.CategoryCode, Builders<Template>.Filter.Eq(t => t.IsActive, true))
                .ToListAsync();
#pragma warning restore CS8619
        }

        public async Task<List<string>> GetFormatsAsync(string categoryCode)
        {
            var filter = Builders<Template>.Filter.Eq(t => t.IsActive, true) & 
                         Builders<Template>.Filter.Eq(t => t.CategoryCode, categoryCode);

            return await _collection
                .Distinct(t => t.Format, filter)
                .ToListAsync();
        }
    }
}
