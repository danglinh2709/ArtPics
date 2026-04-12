using Domain.Enums;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ProjectDto
{
    public class ProjectDetailDto
    {
        public string Id { get; set; } = default!;
        public string UserId { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string? TemplateId { get; set; }
        public ProjectStatus Status { get; set; }
        public int CurrentVersion { get; set; }

        public object? EditorState { get; set; }
        public string? ThumbnailAssetId { get; set; }
        public DateTime? LastOpenedAt { get; set; }
        public bool IsStarred { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
