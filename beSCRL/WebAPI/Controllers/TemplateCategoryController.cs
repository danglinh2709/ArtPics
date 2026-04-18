using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateCategoryController : ControllerBase
    {
        private readonly ITemplateCategoryService _categoryService;

        public TemplateCategoryController(ITemplateCategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllActive()
        {
            var result = await _categoryService.GetActiveCategoriesAsync();
            return Ok(result);
        }
    }
}