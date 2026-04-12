using Application.DTOs.Folder;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services
{
    public interface IFolderService
    {
        Task<IEnumerable<FolderDto>> GetUserFoldersAsync(string userId, CancellationToken cancellationToken = default);
        Task<FolderDto> CreateFolderAsync(string userId, CreateFolderRequest request, CancellationToken cancellationToken = default);
        Task<FolderDto> UpdateFolderAsync(string id, string userId, UpdateFolderRequest request, CancellationToken cancellationToken = default);
        Task DeleteFolderAsync(string id, string userId, CancellationToken cancellationToken = default);
        Task<FolderDto> AddProjectsToFolderAsync(string id, string userId, AddProjectsRequest request, CancellationToken cancellationToken = default);
        Task<FolderDto> RemoveProjectFromFolderAsync(string id, string userId, string projectId, CancellationToken cancellationToken = default);
    }
}
