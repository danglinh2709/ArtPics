using Application.Abstractions.Persistence;
using Application.DTOs.TemplateDto;
using Application.Services;
using Domain.Entities;

namespace Infrastructure.Services
{
    public class TemplateCategoryService : ITemplateCategoryService
    {
        private readonly ITemplateCategoryRepository _repository;

        public TemplateCategoryService(ITemplateCategoryRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<TemplateCategoryDto>> GetActiveCategoriesAsync()
        {
            var categories = await _repository.GetActiveCategoriesAsync();
            
            return categories.Select(c => new TemplateCategoryDto {
                Id = c.Id,
                Code = c.Code,
                Name = c.Name,
                SortOrder = c.SortOrder,
                CoverImageUrl = c.CoverImageUrl
            }).ToList();
        }
    }
}