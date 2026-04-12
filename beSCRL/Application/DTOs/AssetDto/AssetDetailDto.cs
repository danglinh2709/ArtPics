
namespace Application.DTOs.AssetDto
{
    public class AssetDetailDto
    {
        public string Id { get; set; } = default!;
        public string UserId { get; set; } = default!;
        public string? ProjectId { get; set; }
        public AssetType Type { get; set; }
        public string FileName { get; set; } = default!;
        public string? OriginalFileName { get; set; }
        public string? ContentType { get; set; }
        public string? Extension { get; set; }
        public long SizeBytes { get; set; }
        public string? Url { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
