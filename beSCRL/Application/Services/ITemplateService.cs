using Application.DTOs.TemplateDto;

namespace Application.Services
{
    public interface ITemplateService
    {
        Task<List<TemplateListItemDto>> GetAllActiveAsync(string? categoryCode = null, string? format = null);
        Task<TemplateDetailDto?> GetByIdAsync(string id);
        Task<List<string>> GetCategoriesAsync();
        Task<List<string>> GetFormatsAsync(string categoryCode);
        Task<TemplateDetailDto> CreateAsync(CreateTemplateRequestDto request);
        Task<TemplateDetailDto?> UpdateAsync(string id, UpdateTemplateRequestDto request);
        Task<bool> DeleteAsync(string id);
    }
}
