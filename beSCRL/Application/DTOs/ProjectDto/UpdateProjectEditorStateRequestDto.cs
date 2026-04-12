using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Application.DTOs.ProjectDto
{
    public class UpdateProjectEditorStateRequestDto
    {
        [Required]
        public JsonElement EditorState { get; set; } = new();

        [Required]
        [Range(1, int.MaxValue)]
        public int CurrentVersion { get; set; }
    }
}
