using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Persistence.Repositories
{
    public class AssetRepository : BaseRepository<Asset>, IAssetRepository
    {
        public AssetRepository(IMongoDatabase db) : base(db, CollectionNames.Assets)
        {
        }

        public async Task<IEnumerable<Asset>> GetByProjectIdAsync(string projectId)
        {
            return await _collection.Find(x => x.ProjectId == projectId).ToListAsync();
        }
    }
}
