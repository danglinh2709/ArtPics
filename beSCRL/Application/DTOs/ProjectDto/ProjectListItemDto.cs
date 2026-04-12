using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ProjectDto
{
    public class ProjectListItemDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public ProjectStatus Status { get; set; }
        public int CurrentVersion { get; set; }
        public string? ThumbnailAssetId { get; set; }
        public DateTime? LastOpenedAt { get; set; }
        public bool IsStarred { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int? DocumentWidth { get; set; }
        public int? DocumentHeight { get; set; }
        public object? EditorState { get; set; }
    }
}
