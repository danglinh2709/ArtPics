using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AssetController : ControllerBase
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Upload(
            IFormFile file,
            [FromQuery] string? projectId,
            [FromQuery] AssetType type)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            if (file == null || file.Length == 0)
                return BadRequest("File không hợp lệ hoặc trống.");
            var result = await _assetService.UploadAssetAsync(userId, projectId, file, type);
            return Ok(result);
        }


        [HttpGet("download/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Download(string id)
        {
            var asset = await _assetService.GetByIdAsync(id);
            if (asset == null) return NotFound();
            return Redirect(asset.Url);
        }


        [HttpGet("project/{projectId}")]

        public async Task<IActionResult> GetByProject(string projectId)
        {
            var result = await _assetService.GetAssetsByProjectAsync(projectId);
            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();
            var deleted = await _assetService.DeleteAssetAsync(id, userId);
            if (!deleted) return NotFound();
            return NoContent();
        }


    }
}
