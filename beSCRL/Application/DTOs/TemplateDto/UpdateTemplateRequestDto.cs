using System.Text.Json;

namespace Application.DTOs.TemplateDto
{
    public class UpdateTemplateRequestDto
    {
        public string? Name { get; set; }
        public string? Category { get; set; }
        public string? Description { get; set; }
        public string? PreviewImageUrl { get; set; }
        public string? ThumbnailUrl { get; set; }
        public JsonElement? TemplateData { get; set; }
        public List<string>? Tags { get; set; }
        public bool? IsActive { get; set; }
        public int? SortOrder { get; set; }
        public bool? IsDefault { get; set; }
    }
}
