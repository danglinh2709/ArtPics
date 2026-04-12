using Application.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Infrastructure.Configuration.Infrastructure.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Services
{
    public class CloudinaryStorageService : IStorageService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryStorageService(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
        }

        public async Task<bool> DeleteFileAsync(string storageKey)
        {
            var deletionParams = new DeletionParams(storageKey);
            var result = await _cloudinary.DestroyAsync(deletionParams);

            return result.Result == "ok";
        }

        public async Task<(string Url, string StorageKey, long SizeBytes)> UploadFileAsync(IFormFile file, string folderName)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("File is empty.");

            folderName ??= "default";

            await using var stream = file.OpenReadStream();

            var isImage = file.ContentType.StartsWith("image/");

            if (isImage)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = folderName,
                    UseFilename = true,
                    UniqueFilename = true
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                    throw new Exception($"Lỗi upload Cloudinary: {uploadResult.Error.Message}");

                return (
                    uploadResult.SecureUrl?.ToString() ?? string.Empty,
                    uploadResult.PublicId,
                    uploadResult.Bytes
                );
            }
            else
            {
                var uploadParams = new RawUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Folder = folderName,
                    UseFilename = true,
                    UniqueFilename = true
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                    throw new Exception($"Lỗi upload Cloudinary: {uploadResult.Error.Message}");

                return (
                    uploadResult.SecureUrl?.ToString() ?? string.Empty,
                    uploadResult.PublicId,
                    uploadResult.Bytes
                );
            }
        }
    }
}