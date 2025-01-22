using GreenPath.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace GreenPath.Services
{
    public class PlantsService
    {
        private readonly IMongoCollection<Plant> _plantsCollection;

        public PlantsService(
            IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);

            _plantsCollection = mongoDatabase.GetCollection<Plant>(
                databaseSettings.Value.PlantsCollectionName);
        }

        public async Task<List<Plant>> GetAsync() =>
            await _plantsCollection.Find(_ => true).ToListAsync();

        public async Task<Plant?> GetAsync(string id) =>
            await _plantsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Plant newPlant) =>
            await _plantsCollection.InsertOneAsync(newPlant);

        public async Task UpdateAsync(string id, Plant updatedPlant) =>
            await _plantsCollection.ReplaceOneAsync(x => x.Id == id, updatedPlant);

        public async Task RemoveAsync(string id) =>
            await _plantsCollection.DeleteOneAsync(x => x.Id == id);
    }
}