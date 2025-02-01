using GreenPath.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GreenPath.Services
{
    public class HousesService
    {
        private readonly IMongoCollection<House> _housesCollection;

        public HousesService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _housesCollection = mongoDatabase.GetCollection<House>(
                databaseSettings.Value.HousesCollectionName);
        }

        public async Task<List<House>> GetAsync() =>
            await _housesCollection.Find(_ => true).ToListAsync();

        public async Task<House?> GetAsync(string id) =>
            await _housesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        internal async Task<List<House>> GetByUserIdAsync(string userId)
        {
            var filter = Builders<House>.Filter.AnyEq(x => x.UserIds, userId);
            return await _housesCollection.Find(filter).ToListAsync();
        }

        public async Task CreateAsync(House newHouse) =>
            await _housesCollection.InsertOneAsync(newHouse);

        public async Task UpdateAsync(string id, House updatedHouse) =>
            await _housesCollection.ReplaceOneAsync(x => x.Id == id, updatedHouse);

        public async Task RemoveAsync(string id) =>
            await _housesCollection.DeleteOneAsync(x => x.Id == id);
    }
}