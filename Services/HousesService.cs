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
      private readonly IMongoCollection<User> _usersCollection;


      public HousesService(
          IOptions<DatabaseSettings> databaseSettings)
      {
         var mongoClient = new MongoClient(
             databaseSettings.Value.ConnectionString);

         var mongoDatabase = mongoClient.GetDatabase(
             databaseSettings.Value.DatabaseName);

         _housesCollection = mongoDatabase.GetCollection<House>(
             databaseSettings.Value.HousesCollectionName);

         _plantsCollection = mongoDatabase.GetCollection<Plant>(
             databaseSettings.Value.PlantsCollectionName);

         _usersCollection = mongoDatabase.GetCollection<User>(
               databaseSettings.Value.UsersCollectionName);
      }

      public async Task<List<House>> GetAsync() =>
          await _housesCollection.Find(_ => true).ToListAsync();

      public async Task<House?> GetAsync(string id) =>
          await _housesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

      public async Task CreateAsync(House newHouse) =>
          await _housesCollection.InsertOneAsync(newHouse);

      public async Task UpdateAsync(string id, House updatedHouse) =>
          await _housesCollection.ReplaceOneAsync(x => x.Id == id, updatedHouse);

      public async Task RemoveAsync(string id) =>
          await _housesCollection.DeleteOneAsync(x => x.Id == id);

      // User related methods
      public async Task AddUserInHouseAsync(string houseId, string userId)
      {
         var house = await GetAsync(houseId);
         if (house != null)
         {
            if (house.UserIds == null)
            {
               house.UserIds = new List<string>();
            }
            // Add houseId to the user's list of house IDs
            var user = await _usersCollection.Find(x => x.Id == userId).FirstOrDefaultAsync();
            user.HouseIds.Add(houseId);
            
            // Add userId to the house's list of user IDs
            house.UserIds.Add(userId);
            await UpdateAsync(houseId, house);
         }
      }
      public async Task<List<User>> GetUsersInHouseAsync(string houseId)
      {
         var house = await GetAsync(houseId);
         if (house != null && house.UserIds != null && house.UserIds.Count() != 0)
         {
            // Use the $in operator to find all users whose IDs are in the UserIds list
            var filter = Builders<User>.Filter.In(u => u.Id, house.UserIds);
            return await _usersCollection.Find(filter).ToListAsync();
         }
         return new List<User>();
      }

      // Plant related methods
      public async Task<List<Plant>> GetPlantsInHouseAsync(string houseId)
      {
         var house = await GetAsync(houseId);
         if (house != null && house.Plants != null)
         {
            return house.Plants;
         }
         return new List<Plant>();
      }
      public async Task AddPlantInHouseAsync(string houseId, string plantId)
      {
         var house = await GetAsync(houseId);
         var plant = await _plantsCollection.Find(x => x.Id == plantId).FirstOrDefaultAsync();
         if (house != null && plant != null)
         {
            if (house.Plants == null)
            {
               house.Plants = new List<Plant>();
            }
            house.Plants.Add(plant);
            await UpdateAsync(houseId, house);
         }
      }
      public async Task UpdatePlantInHouseAsync(string houseId, string plantId, Plant updatedPlant)
      {
         var house = await GetAsync(houseId);
         if (house != null)
         {
            var plantIndex = house.Plants?.FindIndex(p => p.Id == plantId);
            if (plantIndex != null)
            {
               house.Plants[plantIndex.Value] = updatedPlant;
               await UpdateAsync(houseId, house);
            }
         }
      }
   }


}