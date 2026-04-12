using Application.Abstractions.Persistence;
using Application.DTOs.AssetDto;
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http;


namespace Infrastructure.Services
{
    public class AssetService : IAssetService
    {
        private readonly IAssetRepository _assetRepository;
        private readonly IStorageService _storageService;

        public AssetService(IAssetRepository assetRepository, IStorageService storageService)
        {
            _assetRepository = assetRepository;
            _storageService = storageService;
        }

        public async Task<bool> DeleteAssetAsync(string id, string userId)
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null || asset.UserId != userId) return false;
            // Xoá trên Cloudinary bằng StorageKey (PublicId)
            await _storageService.DeleteFileAsync(asset.StorageKey);
            
            // Xoá trong MongoDB
            await _assetRepository.DeleteAsync(id);
            return true;
        }

        public async Task<IEnumerable<AssetDetailDto>> GetAssetsByProjectAsync(string projectId)
        {
            var assets = await _assetRepository.GetByProjectIdAsync(projectId);
            return assets.Select(MapToDetailDto);
        }

        public async Task<AssetDetailDto?> GetByIdAsync(string id)
        {
            var asset = await _assetRepository.GetByIdAsync(id);
            if (asset == null) return null;
            return MapToDetailDto(asset);
        }

        public async Task<AssetDetailDto> UploadAssetAsync(string userId, string? projectId, IFormFile file, AssetType type)
        {
            var folderName = $"bescrl/users/{userId}/assets";

            //  đẩy file lên Cloudinary
            var (url, storageKey, size) = await _storageService.UploadFileAsync(file, folderName);
            var asset = new Asset
            {
                UserId = userId,
                ProjectId = projectId,
                Type = type,
                FileName = file.FileName,
                OriginalFileName = file.FileName,
                ContentType = file.ContentType,
                Extension = Path.GetExtension(file.FileName),
                SizeBytes = size,
                StorageKey = storageKey, // Public_Id dùng để truy vết xóa trong Cloudinary
                Url = url,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            await _assetRepository.CreateAsync(asset);
            return MapToDetailDto(asset);
        }

        private static AssetDetailDto MapToDetailDto(Asset asset)
        {
            return new AssetDetailDto
            {
                Id = asset.Id,
                UserId = asset.UserId,
                ProjectId = asset.ProjectId,
                Type = asset.Type,
                FileName = asset.FileName,
                OriginalFileName = asset.OriginalFileName,
                ContentType = asset.ContentType,
                Extension = asset.Extension,
                SizeBytes = asset.SizeBytes,
                Url = asset.Url,
                CreatedAt = asset.CreatedAt
            };
        }
    }
}
