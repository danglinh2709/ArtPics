using Application.DTOs.AssetDto;
using Microsoft.AspNetCore.Http;


namespace Application.Services
{
    public interface IAssetService
    {
        Task<AssetDetailDto> UploadAssetAsync(string userId, string? projectId, IFormFile file, AssetType type);
        Task<AssetDetailDto?> GetByIdAsync(string id);
        Task<IEnumerable<AssetDetailDto>> GetAssetsByProjectAsync(string projectId);
        Task<bool> DeleteAssetAsync(string id, string userId);
    }
}
