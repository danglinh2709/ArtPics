using Microsoft.AspNetCore.Http;


namespace Application.DTOs.AssetDto
{
    public class UploadAssetRequestDto
    {
        public IFormFile File { get; set; } = default!;

        public string? ProjectId { get; set; }

        public AssetType Type { get; set; } = AssetType.Image;
    }
}

