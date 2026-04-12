using Microsoft.AspNetCore.Http;

namespace Application.Services
{
    public interface IStorageService
    {
        // Trả về tuple chứa Url của file, định danh lưu trữ (PublicId) và kích thước (Size)
        Task<(string Url, string StorageKey, long SizeBytes)> UploadFileAsync(IFormFile file, string folderName);
        Task<bool> DeleteFileAsync(string storageKey);
    }
}
