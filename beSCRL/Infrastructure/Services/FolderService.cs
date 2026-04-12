using Application.Abstractions.Persistence;
using Application.DTOs.Folder;
using Application.Services;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class FolderService : IFolderService
    {
        private readonly IFolderRepository _folderRepository;

        public FolderService(IFolderRepository folderRepository)
        {
            _folderRepository = folderRepository;
        }

        public async Task<IEnumerable<FolderDto>> GetUserFoldersAsync(string userId, CancellationToken cancellationToken = default)
        {
            var folders = await _folderRepository.GetByUserIdAsync(userId, cancellationToken);
            return folders.Select(MapToDto);
        }

        public async Task<FolderDto> CreateFolderAsync(string userId, CreateFolderRequest request, CancellationToken cancellationToken = default)
        {
            var folder = new Folder
            {
                UserId = userId,
                Name = request.Name,
                ProjectIds = new List<string>(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _folderRepository.CreateAsync(folder);
            return MapToDto(folder);
        }

        public async Task<FolderDto> UpdateFolderAsync(string id, string userId, UpdateFolderRequest request, CancellationToken cancellationToken = default)
        {
            var folder = await _folderRepository.GetByIdAndUserIdAsync(id, userId, cancellationToken);
            if (folder == null)
            {
                throw new Exception("Folder not found or unauthorized");
            }

            folder.Name = request.Name;
            folder.UpdatedAt = DateTime.UtcNow;

            await _folderRepository.UpdateAsync(folder.Id, folder);
            return MapToDto(folder);
        }

        public async Task DeleteFolderAsync(string id, string userId, CancellationToken cancellationToken = default)
        {
            var folder = await _folderRepository.GetByIdAndUserIdAsync(id, userId, cancellationToken);
            if (folder == null)
            {
                throw new Exception("Folder not found or unauthorized");
            }

            await _folderRepository.DeleteAsync(id);
        }

        public async Task<FolderDto> AddProjectsToFolderAsync(string id, string userId, AddProjectsRequest request, CancellationToken cancellationToken = default)
        {
            var folder = await _folderRepository.GetByIdAndUserIdAsync(id, userId, cancellationToken);
            if (folder == null)
            {
                throw new Exception("Folder not found or unauthorized");
            }

            foreach(var pid in request.ProjectIds)
            {
                if (!folder.ProjectIds.Contains(pid))
                {
                    folder.ProjectIds.Add(pid);
                }
            }
            folder.UpdatedAt = DateTime.UtcNow;

            await _folderRepository.UpdateAsync(folder.Id, folder);
            return MapToDto(folder);
        }

        public async Task<FolderDto> RemoveProjectFromFolderAsync(string id, string userId, string projectId, CancellationToken cancellationToken = default)
        {
            var folder = await _folderRepository.GetByIdAndUserIdAsync(id, userId, cancellationToken);
            if (folder == null)
            {
                throw new Exception("Folder not found or unauthorized");
            }

            folder.ProjectIds.Remove(projectId);
            folder.UpdatedAt = DateTime.UtcNow;

            await _folderRepository.UpdateAsync(folder.Id, folder);
            return MapToDto(folder);
        }

        private FolderDto MapToDto(Folder folder)
        {
            return new FolderDto
            {
                Id = folder.Id,
                Name = folder.Name,
                ProjectIds = folder.ProjectIds,
                CreatedAt = folder.CreatedAt
            };
        }
    }
}
