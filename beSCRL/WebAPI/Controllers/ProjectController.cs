using Application.DTOs.ProjectDto;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateProjectRequestDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var result = await _projectService.CreateAsync(userId,request);
            return Ok(result);
        }

        [HttpGet]
        public async Task <IActionResult> GetMyProjects()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var result = await _projectService.GetMyProjectAsync(userId);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var result = await _projectService.GetByIdAsync(userId, id);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var delete = await _projectService.DeleteAsync(userId, id);
            if (!delete) return NotFound();

            return NoContent();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id,[FromBody] UpdateProjectRequestDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var result = await _projectService.UpdateAsync(userId, id, request);
            if (result == null)
                return NotFound();

            return Ok(result);
        }


        [HttpPatch("{id}/editor-state")]
        public async Task<IActionResult> UpdateEditorState(
            string id,
            [FromBody] UpdateProjectEditorStateRequestDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            try
            {
                var result = await _projectService.UpdateEditorStateAsync(userId, id, request);
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPatch("{id}/metadata")]
        public async Task<IActionResult> UpdateMetadata(
            string id,
            [FromBody] UpdateProjectMetadataRequestDto request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized();

            var result = await _projectService.UpdateMetadataAsync(userId, id, request);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

    }
}
