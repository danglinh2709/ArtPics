namespace Application.DTOs.TemplateDto
{
    public class TemplateListItemDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string? Category { get; set; }
        public string? CategoryCode { get; set; }
        public string? Format { get; set; }
        public string? Description { get; set; }
        public string? ThumbnailUrl { get; set; }
        public List<string> Tags { get; set; } = new();
        public int SortOrder { get; set; }
    }
}
