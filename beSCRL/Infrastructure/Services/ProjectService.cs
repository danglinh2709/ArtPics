using Application.Abstractions.Persistence;
using Application.Common;
using Application.DTOs.ProjectDto;
using Application.Helpers;
using Application.Services;
using Domain.Entities;
using Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using System.Text.Json;


namespace Infrastructure.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectService (IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        public async Task<ProjectDetailDto> CreateAsync(string userId, CreateProjectRequestDto request)
        {
            var now = DateTime.UtcNow;

            var projectType = request.Type?.Trim().ToLowerInvariant() ?? EditorConstants.TypePost;

            int? docW = request.DocumentWidth is > 0 ? request.DocumentWidth : null;
            int? docH = request.DocumentHeight is > 0 ? request.DocumentHeight : null;
            if (docW == null || docH == null)
            {
                docW = null;
                docH = null;
            }

            BsonDocument editorState = projectType switch
            {
                EditorConstants.TypeStory => EditorStateFactory.CreateEmptyStory(request.Name),
                EditorConstants.TypeCarousel => EditorStateFactory.CreateEmptyCarousel(2, request.Name),
                _ => EditorStateFactory.CreateEmptyPost(request.Name, docW, docH)
            };

            var project = new Project
            {
                UserId = userId,
                Name = request.Name.Trim(),
                TemplateId = request.TemplateId,
                Status = ProjectStatus.Draft,
                CurrentVersion = 1,
                EditorState = editorState,
                ThumbnailAssetId = null,
                LastOpenedAt = null,
                IsStarred = false,
                CreatedAt = now,
                UpdatedAt = now
            };

            await _projectRepository.CreateAsync(project);

            return MapToDetailDto(project);
        }

        public async Task<bool> DeleteAsync(string userId, string projectId)
        {
            var project = await _projectRepository.GetByIdAndUserIdAsync(projectId,userId);
            if (project == null) return false;

            await _projectRepository.DeleteAsync(projectId);
            return true;
        }

        public async Task<ProjectDetailDto?> GetByIdAsync(string userId, string projectId)
        {
            var project = await _projectRepository.GetByIdAndUserIdAsync(projectId, userId);
            if (project == null)
                return null;

            return MapToDetailDto(project);
        }

        public async Task<IEnumerable<ProjectListItemDto?>> GetMyProjectAsync(string userId)
        {
            var projects = await _projectRepository.GetByUserIdAsync(userId);

            return projects
                .OrderByDescending(x => x.IsStarred)
                .ThenByDescending(x => x.UpdatedAt)
                .Select(MapToListItemDto);
        }

        public async Task<ProjectDetailDto?> UpdateAsync(
            string userId,
            string projectId,
            UpdateProjectRequestDto request)
        {
            var project = await _projectRepository.GetByIdAndUserIdAsync(projectId, userId);
            if (project == null)
                return null;

            var trimmedName = request.Name.Trim();

            BsonDocument newEditorState;
            if (request.EditorState.HasValue)
            {
                newEditorState =
                    BsonDocument.Parse(request.EditorState.Value.GetRawText());
                EditorStateIncomingNormalizer.EnsureImageLayersHaveAssetId(
                    newEditorState);
            }
            else
            {
                newEditorState = project.EditorState;
            }

            var editorChanged = !project.EditorState.Equals(newEditorState);

            project.Name = trimmedName;
            project.TemplateId = request.TemplateId;
            project.Status = request.Status;
            project.EditorState = newEditorState;
            project.ThumbnailAssetId = request.ThumbnailAssetId;
            project.IsStarred = request.IsStarred;
            project.UpdatedAt = DateTime.UtcNow;

            if (editorChanged)
            {
                project.CurrentVersion += 1;
            }

            await _projectRepository.UpdateAsync(projectId, project);

            return MapToDetailDto(project);
        }


       
        private static object? MapEditorStateForApi(BsonDocument editorState)
        {
            if (editorState == null || editorState.ElementCount == 0)
                return null;

            try
            {
                var json = editorState.ToJson(new JsonWriterSettings
                {
                    OutputMode = JsonOutputMode.RelaxedExtendedJson
                });
                return JsonSerializer.Deserialize<object>(json);
            }
            catch
            {
                return BsonTypeMapper.MapToDotNetValue(editorState);
            }
        }

        // map Project =>  ProjectDetailDto 
        private static ProjectDetailDto MapToDetailDto(Project project)
        {
            return new ProjectDetailDto
            {
                Id = project.Id,
                UserId = project.UserId,
                Name = project.Name,
                TemplateId = project.TemplateId,
                Status = project.Status,
                CurrentVersion = project.CurrentVersion,

                EditorState = MapEditorStateForApi(project.EditorState),

                ThumbnailAssetId = project.ThumbnailAssetId,
                LastOpenedAt = project.LastOpenedAt,
                IsStarred = project.IsStarred,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            };
        }

        // map Project => ProjectListItemDto
        private static ProjectListItemDto MapToListItemDto(Project project)
        {
            int? documentWidth = null;
            int? documentHeight = null;
            try
            {
                var es = project.EditorState;
                if (es != null && es.Contains("document") && es["document"].IsBsonDocument)
                {
                    var doc = es["document"].AsBsonDocument;
                    if (doc.Contains("width"))
                        documentWidth = doc["width"].ToInt32();
                    if (doc.Contains("height"))
                        documentHeight = doc["height"].ToInt32();
                }
            }
            catch
            {
                // List must still succeed if editor state is incomplete
            }

            return new ProjectListItemDto
            {
                Id = project.Id,
                Name = project.Name,
                Status = project.Status,
                CurrentVersion = project.CurrentVersion,
                ThumbnailAssetId = project.ThumbnailAssetId,
                LastOpenedAt = project.LastOpenedAt,
                IsStarred = project.IsStarred,
                UpdatedAt = project.UpdatedAt,
                DocumentWidth = documentWidth,
                DocumentHeight = documentHeight,
                EditorState = MapEditorStateForApi(project.EditorState),
            };
        }

        public async Task<ProjectDetailDto?> UpdateMetadataAsync(
            string userId,
            string projectId,
            UpdateProjectMetadataRequestDto request)
        {
            var project = await _projectRepository.GetByIdAndUserIdAsync(projectId, userId);
            if (project == null)
                return null;

            var trimmedName = request.Name.Trim();

            var isChanged =
                project.Name != trimmedName ||
                project.TemplateId != request.TemplateId ||
                project.Status != request.Status ||
                project.ThumbnailAssetId != request.ThumbnailAssetId ||
                project.IsStarred != request.IsStarred;

            project.Name = trimmedName;
            project.TemplateId = request.TemplateId;
            project.Status = request.Status;
            project.ThumbnailAssetId = request.ThumbnailAssetId;
            project.IsStarred = request.IsStarred;
            project.UpdatedAt = DateTime.UtcNow;

            if (isChanged)
            {
                project.CurrentVersion += 1;
            }

            await _projectRepository.UpdateAsync(projectId, project);

            return MapToDetailDto(project);
        }

        public async Task<ProjectDetailDto?> UpdateEditorStateAsync(
            string userId,
            string projectId,
            UpdateProjectEditorStateRequestDto request)
        {
            var project = await _projectRepository.GetByIdAndUserIdAsync(projectId, userId);
            if (project == null)
                return null;

            if (project.CurrentVersion != request.CurrentVersion)
                throw new InvalidOperationException("Project version conflict.");

            var editorStateBson = BsonDocument.Parse(request.EditorState.GetRawText());
            EditorStateIncomingNormalizer.EnsureImageLayersHaveAssetId(editorStateBson);

            EditorStateValidator.Validate(editorStateBson);

            project.EditorState = editorStateBson;
            project.CurrentVersion += 1;
            project.LastOpenedAt = DateTime.UtcNow;
            project.UpdatedAt = DateTime.UtcNow;

            await _projectRepository.UpdateAsync(projectId, project);

            return MapToDetailDto(project);
        }
    }
}
