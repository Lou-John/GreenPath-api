using System.Text.Json;
using GreenPath.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


namespace GreenPath.Services
{
   public class PlantsService
   {
      private readonly IMongoCollection<Plant> _plantsCollection;
      private readonly string _apiKey;


      public PlantsService(
          IOptions<DatabaseSettings> databaseSettings)
      {
         var mongoClient = new MongoClient(
             databaseSettings.Value.ConnectionString);

         var mongoDatabase = mongoClient.GetDatabase(
             databaseSettings.Value.DatabaseName);

         _apiKey = databaseSettings.Value.ApiKey;

         _plantsCollection = mongoDatabase.GetCollection<Plant>(
             databaseSettings.Value.PlantsCollectionName);
         Console.WriteLine($"Connecting to MongoDB at: {databaseSettings.Value.ConnectionString}");
         Console.WriteLine($"Using database: {databaseSettings.Value.DatabaseName}");

      }

      public async Task<List<Plant>> GetAsync()
      {
         try
         {
            return await _plantsCollection.Find(_ => true).ToListAsync();
         }
         catch (Exception ex)
         {
            Console.WriteLine($"Error fetching plants: {ex.Message}");
            throw;
         }
      }

      public async Task<Plant?> GetAsync(string id) =>
          await _plantsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();


      public async Task<Plant?> GetByExternalIdAsync(string externalId) =>
          await _plantsCollection.Find(x => x.ExternalId == externalId).FirstOrDefaultAsync();

      public async Task CreateAsync(Plant newPlant) =>
          await _plantsCollection.InsertOneAsync(newPlant);

      public async Task UpdateAsync(string id, Plant updatedPlant) =>
          await _plantsCollection.ReplaceOneAsync(x => x.Id == id, updatedPlant);

      public async Task RemoveAsync(string id) =>
          await _plantsCollection.DeleteOneAsync(x => x.Id == id);

      public async Task<string> GetApiKeyAsync()
      {
         return _apiKey;
      }

      // Implementation of external api data fetching
      public async Task<List<Plant>?> GetOrFetchByNameAsync(string name)
      {
         // 1. Try local DB first
         var filter = Builders<Plant>.Filter.Or(
    Builders<Plant>.Filter.Regex(p => p.CommonName, new BsonRegularExpression(name, "i")),
    Builders<Plant>.Filter.Regex(p => p.ScientificName, new BsonRegularExpression(name, "i"))
);

         var localPlants = await _plantsCollection.Find(filter).ToListAsync();
         if (localPlants.Any())
            return localPlants;

         // 2. Fetch from external API
         var externalPlants = await FetchMultipleFromExternalApiAsync(name);

         if (externalPlants == null || !externalPlants.Any())
            return new List<Plant>();

         // 3. Save to DB
         await _plantsCollection.InsertManyAsync(externalPlants);

         return externalPlants;
      }

      // Get data from external api as an array
      private async Task<List<Plant>> FetchMultipleFromExternalApiAsync(string name)
      {
         var httpClient = new HttpClient();
         var requestUrl = $"https://perenual.com/api/v2/species-list?key={_apiKey}&q={name}";

         try
         {
            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
               Console.WriteLine($"Failed to fetch plants from external API. Status Code: {response.StatusCode}");
               return new List<Plant>();
            }

            var responseContent = await response.Content.ReadAsStringAsync();

            // Deserialize the response into a dynamic object to extract only the required fields
            var apiResponse = JsonSerializer.Deserialize<JsonElement>(responseContent);

            if (!apiResponse.TryGetProperty("data", out var plantsData))
            {
               Console.WriteLine("No 'data' field found in the API response.");
               return new List<Plant>();
            }


            var plants = new List<Plant>();

            foreach (var plantData in plantsData.EnumerateArray())
            {
               var plant = new Plant
               {
                  ExternalId = plantData.GetProperty("id").GetInt32().ToString(),
                  CommonName = plantData.GetProperty("common_name").GetString(),
                  ScientificName = plantData.TryGetProperty("scientific_name", out var scientificName) &&
                     scientificName.ValueKind == JsonValueKind.Array
                     ? scientificName.EnumerateArray().FirstOrDefault().GetString()
                     : null,
                  ThumbmailUrl = plantData.TryGetProperty("default_image", out var defaultImage) &&
                   defaultImage.ValueKind == JsonValueKind.Object && // Ensure default_image is not null
                   defaultImage.TryGetProperty("thumbnail", out var thumbnail) &&
                   thumbnail.ValueKind != JsonValueKind.Null
                   ? thumbnail.GetString()
                   : null,
                  MediumUrl = plantData.TryGetProperty("default_image", out defaultImage) &&
                defaultImage.ValueKind == JsonValueKind.Object && // Ensure default_image is not null
                defaultImage.TryGetProperty("medium_url", out var mediumUrl) &&
                mediumUrl.ValueKind != JsonValueKind.Null
                ? mediumUrl.GetString()
                : null,
                  Detailed = false
               };

               plants.Add(plant);
            }
            return plants;
         }
         catch (Exception ex)
         {
            Console.WriteLine($"Error fetching plants from external API: {ex.Message}");
            return new List<Plant>();
         }
      }

      // When user looks at specific plant, check if detail =true; if not get data from external api, save and show user
      public async Task<Plant?> GetOrUpdatePlantByIdAsync(string id)
      {
         // 1. Find the plant by its ID in the database
         var plant = await _plantsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

         if (plant == null)
         {
            Console.WriteLine($"Plant with ID {id} not found in the database.");
            return null;
         }

         // 2. Check if the plant's "Detailed" field is false
         if (!plant.Detailed)
         {
            Console.WriteLine($"Plant with ID {id} is not detailed. Fetching details from external API...");

            // 3. Fetch updated details from the external API
            var updatedPlant = await FetchPlantDetailsFromExternalApiAsync(plant.ExternalId);

            if (updatedPlant != null)
            {
               // 4. Update specific fields in the database
               var updateDefinition = Builders<Plant>.Update
                   .Set(p => p.Watering, updatedPlant.Watering)
                   .Set(p => p.WateringBenchmark, updatedPlant.WateringBenchmark)
                   .Set(p => p.Sunlight, updatedPlant.Sunlight)
                   .Set(p => p.PruningMonth, updatedPlant.PruningMonth)
                   .Set(p => p.Flowers, updatedPlant.Flowers)
                   .Set(p => p.FloweringSeason, updatedPlant.FloweringSeason)
                   .Set(p => p.CareLevel, updatedPlant.CareLevel)
                   .Set(p => p.Description, updatedPlant.Description)
                   .Set(p => p.PoisonousToHumans, updatedPlant.PoisonousToHumans)
                   .Set(p => p.PoisonousToPets, updatedPlant.PoisonousToPets)
                   .Set(p => p.Detailed, true); // Mark as detailed

               await _plantsCollection.UpdateOneAsync(x => x.Id == id, updateDefinition);

               Console.WriteLine($"Plant with ID {id} has been updated with detailed information.");
               return updatedPlant;
            }
            else
            {
               Console.WriteLine($"Failed to fetch detailed information for plant with ID {id} from the external API.");
            }
         }

         // 5. Return the plant (either updated or as-is)
         return plant;
      }

      // Helper to fetch plant details from the external API
      private async Task<Plant?> FetchPlantDetailsFromExternalApiAsync(string externalId)
      {
         var httpClient = new HttpClient();
         var requestUrl = $"https://perenual.com/api/v2/species/details/{externalId}?key={_apiKey}";

         try
         {
            var response = await httpClient.GetAsync(requestUrl);

            if (!response.IsSuccessStatusCode)
            {
               Console.WriteLine($"Failed to fetch plant details from external API. Status Code: {response.StatusCode}");
               return null;
            }

            var responseContent = await response.Content.ReadAsStringAsync();

            // Deserialize the response into a dynamic object to extract only the required fields
            var plantData = JsonSerializer.Deserialize<JsonElement>(responseContent);

            if (plantData.ValueKind != JsonValueKind.Object)
            {
               Console.WriteLine("Invalid response format from external API.");
               return null;
            }
            if (plantData.TryGetProperty("watering_general_benchmark", out var wateringGeneralBenchmarkt))
            {
               Console.WriteLine($"Raw watering_general_benchmark JSON: {wateringGeneralBenchmarkt}");
            }
            // Map the API response to the Plant model
            var plant = new Plant
            {
               ExternalId = plantData.GetProperty("id").GetInt32().ToString(),
               WateringBenchmark = plantData.TryGetProperty("watering_general_benchmark", out var wateringGeneralBenchmark) &&
                               wateringGeneralBenchmark.ValueKind == JsonValueKind.Object
                               ? new WateringBenchmark
                               {
                                  Value = wateringGeneralBenchmark.TryGetProperty("value", out var value) ? value.GetString() : null,
                                  Unit = wateringGeneralBenchmark.TryGetProperty("unit", out var unit) ? unit.GetString() : null
                               }
                               : null,

               Sunlight = plantData.TryGetProperty("sunlight", out var sunlight) &&
               sunlight.ValueKind == JsonValueKind.Array
               ? sunlight.EnumerateArray().Select(x => x.GetString()).Where(x => x != null).ToList()
               : new List<string>(),

               PruningMonth = plantData.TryGetProperty("pruning_month", out var pruningMonth) &&
               pruningMonth.ValueKind == JsonValueKind.Array
               ? pruningMonth.EnumerateArray().Select(x => x.GetString()).Where(x => x != null).ToList()
               : new List<string>(),

               Flowers = plantData.TryGetProperty("flowers", out var flowers) &&
               flowers.ValueKind == JsonValueKind.True || flowers.ValueKind == JsonValueKind.False
               ? flowers.GetBoolean()
               : false,

               FloweringSeason = plantData.TryGetProperty("flowering_season", out var floweringSeason) &&
               floweringSeason.ValueKind == JsonValueKind.String
               ? floweringSeason.GetString()
               : null,

               CareLevel = plantData.TryGetProperty("care_level", out var careLevel) &&
               careLevel.ValueKind == JsonValueKind.String
               ? careLevel.GetString()
               : null,

               Description = plantData.TryGetProperty("description", out var description) &&
               description.ValueKind == JsonValueKind.String
               ? description.GetString()
               : null,

               PoisonousToHumans = plantData.TryGetProperty("poisonous_to_humans", out var poisonousToHumans) &&
               poisonousToHumans.ValueKind == JsonValueKind.True || poisonousToHumans.ValueKind == JsonValueKind.False
               ? poisonousToHumans.GetBoolean()
               : false,

               PoisonousToPets = plantData.TryGetProperty("poisonous_to_pets", out var poisonousToPets) &&
               poisonousToPets.ValueKind == JsonValueKind.True || poisonousToPets.ValueKind == JsonValueKind.False
               ? poisonousToPets.GetBoolean()
               : false,

               Watering = plantData.TryGetProperty("watering", out var watering) &&
               watering.ValueKind == JsonValueKind.String
               ? poisonousToPets.GetString()
               : null
            };

            return plant;
         }
         catch (Exception ex)
         {
            Console.WriteLine($"Error fetching plant details from external API: {ex.Message}");
            return null;
         }
      }
   }
}
