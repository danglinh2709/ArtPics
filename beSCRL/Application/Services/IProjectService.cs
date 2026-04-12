using Application.DTOs.ProjectDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IProjectService
    {
        // create new project
        Task<ProjectDetailDto> CreateAsync(string userId, CreateProjectRequestDto request);

        // get list project of this user
        Task<IEnumerable<ProjectListItemDto?>> GetMyProjectAsync(string userId);

        // get 1 chi tiet 1 project follow id(projectId - project can xem), required: userId
        Task<ProjectDetailDto?> GetByIdAsync(string userId, string projectId);

        // userId: ai dang sua, projectId: project nao, request: du lieu can cap nhap
        Task<ProjectDetailDto?> UpdateAsync(string userId, string projectId, UpdateProjectRequestDto request);

        Task<bool> DeleteAsync(string userId, string projectId);

        //
        Task<ProjectDetailDto?> UpdateMetadataAsync(string userId, string projectId, UpdateProjectMetadataRequestDto request);
        Task<ProjectDetailDto?> UpdateEditorStateAsync(string userId, string projectId, UpdateProjectEditorStateRequestDto request);




    }
}
