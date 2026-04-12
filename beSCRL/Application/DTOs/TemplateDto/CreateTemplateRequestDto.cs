using System.Text.Json;
using MongoDB.Bson;

namespace Application.DTOs.TemplateDto
{
    public class CreateTemplateRequestDto
    {
        public string Name { get; set; } = default!;
        public string? Category { get; set; }
        public string? Description { get; set; }
        public string? PreviewImageUrl { get; set; }
        public string? ThumbnailUrl { get; set; }
        public JsonElement TemplateData { get; set; } = new();
        public List<string> Tags { get; set; } = new();
        public int SortOrder { get; set; } = 0;
        public bool IsDefault { get; set; } = false;
    }
}
