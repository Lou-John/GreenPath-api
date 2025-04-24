using GreenPath.Models;
using GreenPath.Services;
using Microsoft.AspNetCore.Mvc;

namespace GreenPath.Controllers
{
   [ApiController]
   [Route("api/[controller]")]
   public class HousesController : ControllerBase
   {
      private readonly HousesService _housesService;

      public HousesController(HousesService housesService) =>
  _housesService = housesService;

      [HttpGet]
      public async Task<List<House>> Get() =>
          await _housesService.GetAsync();

      [HttpGet("{id:length(24)}")]
      public async Task<ActionResult<House>> Get(string id)
      {
         // Check if house exists in local database
         var house = await _housesService.GetAsync(id);

         if (house is null)
         {
            // If house is not found, call external API to get the house
            return NotFound();
         }

         return house;
      }

      [HttpPost]
      public async Task<IActionResult> Post(House newHouse)
      {
         await _housesService.CreateAsync(newHouse);

         return CreatedAtAction(nameof(Get), new { id = newHouse.Id }, newHouse);
      }

      [HttpPut("{id:length(24)}")]
      public async Task<IActionResult> Update(string id, House updatedHouse)
      {
         var house = await _housesService.GetAsync(id);

         if (house is null)
         {
            return NotFound();
         }

         updatedHouse.Id = house.Id;

         await _housesService.UpdateAsync(id, updatedHouse);

         return NoContent();
      }

      [HttpDelete("{id:length(24)}")]
      public async Task<IActionResult> Delete(string id)
      {
         var house = await _housesService.GetAsync(id);

         if (house is null)
         {
            return NotFound();
         }

         await _housesService.RemoveAsync(id);

         return NoContent();
      }

      [HttpPut("{houseId}/plants/{plantId}")]
      public async Task<IActionResult> UpdatePlantInHouse(string houseId, string plantId, Plant updatedPlant)
      {
         var house = await _housesService.GetAsync(houseId);

         if (house == null)
         {
            return NotFound(new { Message = $"House with ID {houseId} not found." });
         }

         await _housesService.UpdatePlantInHouseAsync(houseId, plantId, updatedPlant);

         return Ok(new { Message = $"Plant with ID {plantId} updated in house with ID {houseId}." });
      }

      [HttpPost("{houseId}/plants/{plantId}")]
      public async Task<IActionResult> PostPlantInHouse(string houseId, string plantId)
      {
         var house = await _housesService.GetAsync(houseId);

         if (house == null)
         {
            return NotFound(new { Message = $"House with ID {houseId} not found." });
         }

         await _housesService.AddPlantInHouseAsync(houseId, plantId);

         return Ok(new { Message = $"Plant with ID {plantId} added to house with ID {houseId}." });
      }

      [HttpPost("{houseId}/users/{userId}")]
      public async Task<IActionResult> PostUserInHouse(string houseId, string userId)
      {
         var house = await _housesService.GetAsync(houseId);

         if (house == null)
         {
            return NotFound(new { Message = $"House with ID {houseId} not found." });
         }

         await _housesService.AddUserInHouseAsync(houseId, userId);

         return Ok(new { Message = $"User with ID {userId} added to house with ID {houseId}." });
      }
   }
}

