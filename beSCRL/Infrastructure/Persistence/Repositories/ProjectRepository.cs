using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class ProjectRepository : BaseRepository<Project>, IProjectRepository
    {
        public ProjectRepository(IMongoDatabase db) : base(db, CollectionNames.Projects)
        {
        }

        public async Task<Project?> GetByIdAndUserIdAsync(string projectId, string userId)
        {
            var filter = Builders<Project>.Filter.And(
                Builders<Project>.Filter.Eq(x=> x.Id,projectId),
                Builders<Project>.Filter.Eq(x=> x.UserId, userId)
                );

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Project>> GetByUserIdAsync(string userId)
        {
            var filter = Builders<Project>.Filter.Eq(x => x.UserId, userId);
            return await _collection.Find(filter)
                .SortByDescending(x => x.UpdatedAt)
                .ToListAsync();
        }
    }
}
