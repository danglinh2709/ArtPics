using Application.Services;
using Application.DTOs.TemplateDto;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateService _templateService;

        public TemplateController(ITemplateService templateService)
        {
            _templateService = templateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? categoryCode = null, [FromQuery] string? format = null)
        {
            var result = await _templateService.GetAllActiveAsync(categoryCode, format);
            return Ok(result);
        }

        [HttpGet("formats")]
        public async Task<IActionResult> GetFormats([FromQuery] string categoryCode)
        {
            if (string.IsNullOrWhiteSpace(categoryCode))
                return BadRequest("CategoryCode is required to get formats.");

            var result = await _templateService.GetFormatsAsync(categoryCode);
            return Ok(result);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _templateService.GetCategoriesAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var result = await _templateService.GetByIdAsync(id);
            if (result == null)
                return NotFound();
            
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTemplateRequestDto request)
        {
            var result = await _templateService.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] UpdateTemplateRequestDto request)
        {
            var result = await _templateService.UpdateAsync(id, request);
            if (result == null)
                return NotFound();
            
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var result = await _templateService.DeleteAsync(id);
            if (!result)
                return NotFound();
            
            return NoContent();
        }
    }
}
