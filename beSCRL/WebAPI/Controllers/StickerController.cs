using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StickerController : ControllerBase
    {
        private readonly IStickerService _stickerService;

        public StickerController(IStickerService stickerService)
        {
            _stickerService = stickerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string? category = null)
        {
            var result = await _stickerService.GetAllActiveAsync(category);
            return Ok(result);
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _stickerService.GetCategoriesAsync();
            return Ok(result);
        }
    }
}
