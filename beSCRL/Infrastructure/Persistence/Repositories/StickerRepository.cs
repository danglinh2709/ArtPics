using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Persistence.Repositories
{
    public class StickerRepository : BaseRepository<Sticker>, IStickerRepository
    {
        public StickerRepository(IMongoDatabase db) : base(db, CollectionNames.Stickers)
        {
        }

        public async Task<IEnumerable<Sticker>> GetAllActiveAsync(string? category = null)
        {
            var filter = Builders<Sticker>.Filter.Eq(s => s.IsActive, true);

            if (!string.IsNullOrEmpty(category))
            {
                filter &= Builders<Sticker>.Filter.Eq(s => s.Category, category);
            }

            return await _collection
                .Find(filter)
                .SortBy(s => s.SortOrder)
                .ThenByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<string>> GetAllCategoriesAsync()
        {
#pragma warning disable CS8619 
            return await _collection
                .Distinct(s => s.Category, Builders<Sticker>.Filter.Eq(s => s.IsActive, true))
                .ToListAsync();
#pragma warning restore CS8619
        }
    }
}
