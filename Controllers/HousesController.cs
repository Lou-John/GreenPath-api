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

        [HttpGet("house/{userId}")]
        public async Task<ActionResult<List<House>>> GetByUserIds(string userId)
        {
            var house = await _housesService.GetByUserIdAsync(userId);

            if (house is null || house.Count == 0)
            {
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
    }
}

