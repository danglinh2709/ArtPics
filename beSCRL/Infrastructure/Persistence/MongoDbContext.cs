using Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;

namespace Infrastructure.Persistence
{
    public sealed class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IOptions<MongoDbSettings> options)
        {
            // get dl from appsettings.json
            var settings = options.Value;

            // create connect to mongodb (chưa kết nối, chỉ tạo client)
            var client = new MongoClient(settings.ConnectionString);
            // choice partical database
            _database = client.GetDatabase(settings.DatabaseName);
        }


        // allow to access trực tiếp db 
        public IMongoDatabase Database => _database;

        // get collection theo name
        public IMongoCollection<TDocument> GetCollection<TDocument>(string name)
        {
            return _database.GetCollection<TDocument>(name);
        }

    }
}
