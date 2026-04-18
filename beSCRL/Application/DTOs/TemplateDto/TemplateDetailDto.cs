using MongoDB.Bson;

namespace Application.DTOs.TemplateDto
{
    public class TemplateDetailDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string? Category { get; set; }
        public string? CategoryCode { get; set; }
        public string? Format { get; set; }
        public string? Description { get; set; }
        public string? PreviewImageUrl { get; set; }
        public string? ThumbnailUrl { get; set; }
        public object? TemplateData { get; set; }
        public List<string> Tags { get; set; } = new();
    }
}
