namespace Application.DTOs.TemplateDto
{
    public class TemplateCategoryDto
    {
        public string Id { get; set; } = default!;
        public string Code { get; set; } = default!;
        public string Name { get; set; } = default!;
        public int SortOrder { get; set; }
        public string CoverImageUrl { get; set; } = default!;
    }
}