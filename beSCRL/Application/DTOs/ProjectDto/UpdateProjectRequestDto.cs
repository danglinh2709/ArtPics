using Domain.Enums;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Application.DTOs.ProjectDto
{
    public class UpdateProjectRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = default!;

        public string? TemplateId { get; set; }

        public ProjectStatus Status { get; set; } = ProjectStatus.Draft;

        public JsonElement? EditorState { get; set; }
        public string? ThumbnailAssetId { get; set; }

        public bool IsStarred { get; set; }
    }
}
