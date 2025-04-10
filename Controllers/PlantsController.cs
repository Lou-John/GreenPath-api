using GreenPath.Models;
using GreenPath.Services;
using Microsoft.AspNetCore.Mvc;

namespace GreenPath.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class PlantsController : ControllerBase
   {
      private readonly PlantsService _plantsService;

      public PlantsController(PlantsService plantsService) =>
  _plantsService = plantsService;

      [HttpGet]
      public async Task<List<Plant>> Get() =>
          await _plantsService.GetAsync();

      [HttpGet("{id:length(24)}")]
      public async Task<ActionResult<Plant>> Get(string id)
      {
         // Check if plant exist
         var plant = await _plantsService.GetAsync(id);

         if (plant is null)
         {
            // If plant is not found, call external API to get the plant
            return NotFound();
         }

         return plant;
      }



      [HttpGet("api")]
      public async Task<string> GetApiKey()
      {
         var api = await _plantsService.GetApiKeyAsync();

         if (api is null)
         {
            return "API key not found";
         }

         return api;
      }

      [HttpPost]
      public async Task<IActionResult> Post(Plant newPlant)
      {
         await _plantsService.CreateAsync(newPlant);

         return CreatedAtAction(nameof(Get), new { id = newPlant.Id }, newPlant);
      }

      [HttpPut("{id:length(24)}")]
      public async Task<IActionResult> Update(string id, Plant updatedPlant)
      {
         var plant = await _plantsService.GetAsync(id);

         if (plant is null)
         {
            return NotFound();
         }

         updatedPlant.Id = plant.Id;

         await _plantsService.UpdateAsync(id, updatedPlant);

         return NoContent();
      }

      [HttpDelete("{id:length(24)}")]
      public async Task<IActionResult> Delete(string id)
      {
         var plant = await _plantsService.GetAsync(id);

         if (plant is null)
         {
            return NotFound();
         }

         await _plantsService.RemoveAsync(id);

         return NoContent();
      }

      [HttpGet("detail/{id:length(24)}")]
      public async Task<IActionResult> GetPlantDetails(string id)
      {
         var plant = await _plantsService.GetOrUpdatePlantByIdAsync(id);
         if (plant == null)
         {
            return NotFound(new
            {
               Message = $"No plant with the ID '{id}' was found in the database.",
               SearchedId = id
            });
         }

         // Return the plant details
         return Ok(new
         {
            Message = $"Found plant with ID '{id}'.",
            Plant = plant
         });
      }

      //From here on is the logic for the external API
      [HttpGet("search")]
      public async Task<IActionResult> GetPlantByName(string name)
      {
         var plants = await _plantsService.GetOrFetchByNameAsync(name);

         if (plants == null || !plants.Any())
         {
            return NotFound(new
            {
               Message = $"No plants with the name '{name}' were found in the external API or the database.",
               SearchedName = name
            });
         }

         // Return the list of plants
         return Ok(new
         {
            Message = $"Found {plants.Count} plant(s) with the name '{name}'.",
            Plants = plants
         });
      }
   }
}

