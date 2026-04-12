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
    public class UserRepository  : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IMongoDatabase db) : base(db, CollectionNames.Users)
        {

        }

        public async Task<bool> ExistsByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq( x => x.Email, email);
            return await _collection.Find(filter).AnyAsync();
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Email, email);
            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task UpdateLastLoginAsync(string userId, DateTime lastLoginAt)
        {
            var filter = Builders<User>.Filter.Eq(x => x.Id, userId);

            var update = Builders<User>.Update
                .Set(x => x.LastLoginAt, lastLoginAt)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            await _collection.UpdateOneAsync(filter, update);
        }
    }
}
