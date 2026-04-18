using Application.DTOs.TemplateDto;

namespace Application.Services
{
    public interface ITemplateCategoryService
    {
        Task<List<TemplateCategoryDto>> GetActiveCategoriesAsync();
    }
}
