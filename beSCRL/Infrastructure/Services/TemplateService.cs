using Application.Abstractions.Persistence;
using Application.DTOs.TemplateDto;
using Application.Services;
using Domain.Entities;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using System.Text.Json;

namespace Infrastructure.Services
{
    public class TemplateService : ITemplateService
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateService(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        private static object? MapTemplateDataForApi(BsonDocument templateData)
        {
            if (templateData == null || templateData.ElementCount == 0)
                return null;

            try
            {
                var json = templateData.ToJson(new JsonWriterSettings
                {
                    OutputMode = JsonOutputMode.RelaxedExtendedJson
                });
                return JsonSerializer.Deserialize<object>(json);
            }
            catch
            {
                return BsonTypeMapper.MapToDotNetValue(templateData);
            }
        }

        public async Task<List<TemplateListItemDto>> GetAllActiveAsync(string? categoryCode = null, string? format = null)
        {
            var templates = await _templateRepository.GetAllActiveAsync(categoryCode, format);
            
            return templates.Select(t => new TemplateListItemDto
            {
                Id = t.Id!,
                Name = t.Name,
                Category = t.Category,
                CategoryCode = t.CategoryCode,
                Format = t.Format,
                Description = t.Description,
                ThumbnailUrl = t.ThumbnailUrl,
                Tags = t.Tags,
                SortOrder = t.SortOrder
            }).ToList();
        }

        public async Task<TemplateDetailDto?> GetByIdAsync(string id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            
            if (template == null || !template.IsActive)
                return null;

            return new TemplateDetailDto
            {
                Id = template.Id!,
                Name = template.Name,
                Category = template.Category,
                CategoryCode = template.CategoryCode,
                Format = template.Format,
                Description = template.Description,
                PreviewImageUrl = template.PreviewImageUrl,
                ThumbnailUrl = template.ThumbnailUrl,
                TemplateData = MapTemplateDataForApi(template.TemplateData),
                Tags = template.Tags
            };
        }

        public async Task<List<string>> GetCategoriesAsync()
        {
            return await _templateRepository.GetAllCategoriesAsync();
        }

        public async Task<List<string>> GetFormatsAsync(string categoryCode)
        {
            return await _templateRepository.GetFormatsAsync(categoryCode);
        }

        public async Task<TemplateDetailDto> CreateAsync(CreateTemplateRequestDto request)
        {
            BsonDocument templateDataBson = new();
            if (request.TemplateData.ValueKind != JsonValueKind.Undefined && request.TemplateData.ValueKind != JsonValueKind.Null)
            {
                templateDataBson = BsonDocument.Parse(request.TemplateData.GetRawText());
            }

            var template = new Template
            {
                Name = request.Name,
                Category = request.Category,
                Description = request.Description,
                PreviewImageUrl = request.PreviewImageUrl,
                ThumbnailUrl = request.ThumbnailUrl,
                TemplateData = templateDataBson,
                Tags = request.Tags,
                SortOrder = request.SortOrder,
                IsDefault = request.IsDefault,
                IsActive = true
            };

            await _templateRepository.CreateAsync(template);

            return new TemplateDetailDto
            {
                Id = template.Id!,
                Name = template.Name,
                Category = template.Category,
                CategoryCode = template.CategoryCode,
                Format = template.Format,
                Description = template.Description,
                PreviewImageUrl = template.PreviewImageUrl,
                ThumbnailUrl = template.ThumbnailUrl,
                TemplateData = MapTemplateDataForApi(template.TemplateData),
                Tags = template.Tags
            };
        }

        public async Task<TemplateDetailDto?> UpdateAsync(string id, UpdateTemplateRequestDto request)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null) return null;

            if (request.Name != null) template.Name = request.Name;
            if (request.Category != null) template.Category = request.Category;
            if (request.Description != null) template.Description = request.Description;
            if (request.PreviewImageUrl != null) template.PreviewImageUrl = request.PreviewImageUrl;
            if (request.ThumbnailUrl != null) template.ThumbnailUrl = request.ThumbnailUrl;
            
            if (request.TemplateData.HasValue)
            {
               template.TemplateData = BsonDocument.Parse(request.TemplateData.Value.GetRawText());
            }

            if (request.Tags != null) template.Tags = request.Tags;
            if (request.IsActive.HasValue) template.IsActive = request.IsActive.Value;
            if (request.SortOrder.HasValue) template.SortOrder = request.SortOrder.Value;
            if (request.IsDefault.HasValue) template.IsDefault = request.IsDefault.Value;

            await _templateRepository.UpdateAsync(id, template);

            return new TemplateDetailDto
            {
                Id = template.Id!,
                Name = template.Name,
                Category = template.Category,
                CategoryCode = template.CategoryCode,
                Format = template.Format,
                Description = template.Description,
                PreviewImageUrl = template.PreviewImageUrl,
                ThumbnailUrl = template.ThumbnailUrl,
                TemplateData = MapTemplateDataForApi(template.TemplateData),
                Tags = template.Tags
            };
        }

        public async Task<bool> DeleteAsync(string id)
        {
            var template = await _templateRepository.GetByIdAsync(id);
            if (template == null) return false;

            await _templateRepository.DeleteAsync(id);
            return true;
        }
    }
}
