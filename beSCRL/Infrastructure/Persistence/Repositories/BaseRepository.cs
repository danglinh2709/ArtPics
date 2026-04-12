using Application.Abstractions.Persistence;
using Domain.Common;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : AuditableEntity
    {
        protected readonly IMongoCollection<T> _collection;

        public BaseRepository(IMongoDatabase database, string collectionName)
        {
            _collection = database.GetCollection<T>(collectionName);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
            => await _collection.Find(_ => true).ToListAsync();

        public async Task<T?> GetByIdAsync(string id)
            => await _collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(T entity)
            => await _collection.InsertOneAsync(entity);

        public async Task UpdateAsync(string id, T entity)
            => await _collection.ReplaceOneAsync(x => x.Id == id, entity);

        public async Task DeleteAsync(string id)
            => await _collection.DeleteOneAsync(x => x.Id == id);

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
            => await _collection.Find(predicate).ToListAsync();
    }
}
