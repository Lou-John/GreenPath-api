using GreenPath.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace GreenPath.Services
{
    public class HousesService
    {
        private readonly IMongoCollection<House> _housesCollection;
        private readonly IMongoCollection<Plant> _plantsCollection;


        public HousesService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _housesCollection = mongoDatabase.GetCollection<House>(
                databaseSettings.Value.HousesCollectionName);
               
            Console.WriteLine($"Connecting to MongoDB at: {databaseSettings.Value.ConnectionString}");
            Console.WriteLine($"Using database: {databaseSettings.Value.DatabaseName}");
        }

        public async Task<List<House>> GetAsync() =>
            await _housesCollection.Find(_ => true).ToListAsync();

        public async Task<House?> GetAsync(string id) =>
            await _housesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        internal async Task<List<House>> GetByUserIdAsync(string userId)
        {
            var filter = Builders<House>.Filter.AnyEq(h => h.UserIds, userId);
            return await _housesCollection.Find(filter).ToListAsync();
        }

        public async Task<List<Plant>> GetPlantsByHouseIdAsync(string houseId)
        {
            // Get the house first
            var house = await _housesCollection.Find(h => h.Id == houseId).FirstOrDefaultAsync();
            if (house == null || house.Plants == null || !house.Plants.Any())
                return new List<Plant>();

            // Filter to find plants where their IDs are in the house's Plants list
            var filter = Builders<Plant>.Filter.In(p => p.Id, house.Plants);
            return await _plantsCollection.Find(filter).ToListAsync();
        }

        public async Task CreateAsync(House newHouse) =>
            await _housesCollection.InsertOneAsync(newHouse);

        public async Task UpdateAsync(string id, House updatedHouse) =>
            await _housesCollection.ReplaceOneAsync(x => x.Id == id, updatedHouse);

        public async Task RemoveAsync(string id) =>
            await _housesCollection.DeleteOneAsync(x => x.Id == id);
    }
}