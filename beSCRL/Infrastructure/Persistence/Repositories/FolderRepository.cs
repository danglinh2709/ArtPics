using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class FolderRepository : BaseRepository<Folder>, IFolderRepository
    {
        public FolderRepository(IMongoDatabase database) 
            : base(database, CollectionNames.Folders)
        {
        }

        public async Task<IEnumerable<Folder>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
        {
            return await _collection.Find(f => f.UserId == userId).ToListAsync(cancellationToken);
        }

        public async Task<Folder?> GetByIdAndUserIdAsync(string id, string userId, CancellationToken cancellationToken = default)
        {
            return await _collection.Find(f => f.Id == id && f.UserId == userId).FirstOrDefaultAsync(cancellationToken);
        }
    }
}
