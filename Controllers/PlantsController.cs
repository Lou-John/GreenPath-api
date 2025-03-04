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



        [HttpGet("external/{externalId}")]
        public async Task<ActionResult<Plant>> GetByExternalId(string externalId)
        {
            var plant = await _plantsService.GetByExternalIdAsync(externalId);

            if (plant is null)
            {
                return NotFound();
            }

            return plant;
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
    }
}

