using Domain.Enums;
using System.ComponentModel.DataAnnotations;


namespace Application.DTOs.ProjectDto
{
    public class UpdateProjectMetadataRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = default!;

        public string? TemplateId { get; set; }

        public ProjectStatus Status { get; set; } = ProjectStatus.Draft;

        public string? ThumbnailAssetId { get; set; }

        public bool IsStarred { get; set; }
    }
}
