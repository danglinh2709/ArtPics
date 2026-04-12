using Application.DTOs.Folder;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FoldersController : ControllerBase
    {
        private readonly IFolderService _folderService;

        public FoldersController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        private string GetUserId()
        {
            return User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;
        }

        [HttpGet]
        public async Task<IActionResult> GetFolders(CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            var folders = await _folderService.GetUserFoldersAsync(userId, cancellationToken);
            return Ok(folders);
        }

        [HttpPost]
        public async Task<IActionResult> CreateFolder([FromBody] CreateFolderRequest request, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            var folder = await _folderService.CreateFolderAsync(userId, request, cancellationToken);
            return CreatedAtAction(nameof(GetFolders), new { id = folder.Id }, folder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFolder(string id, [FromBody] UpdateFolderRequest request, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            var folder = await _folderService.UpdateFolderAsync(id, userId, request, cancellationToken);
            return Ok(folder);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFolder(string id, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            await _folderService.DeleteFolderAsync(id, userId, cancellationToken);
            return NoContent();
        }

        [HttpPost("{id}/projects")]
        public async Task<IActionResult> AddProjectsToFolder(string id, [FromBody] AddProjectsRequest request, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            var folder = await _folderService.AddProjectsToFolderAsync(id, userId, request, cancellationToken);
            return Ok(folder);
        }

        [HttpDelete("{id}/projects/{projectId}")]
        public async Task<IActionResult> RemoveProjectFromFolder(string id, string projectId, CancellationToken cancellationToken)
        {
            var userId = GetUserId();
            var folder = await _folderService.RemoveProjectFromFolderAsync(id, userId, projectId, cancellationToken);
            return Ok(folder);
        }
    }
}
