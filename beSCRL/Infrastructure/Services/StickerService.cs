using Application.Abstractions.Persistence;
using Application.Services;
using Domain.Entities;

namespace Infrastructure.Services
{
    public class StickerService : IStickerService
    {
        private readonly IStickerRepository _stickerRepository;

        public StickerService(IStickerRepository stickerRepository)
        {
            _stickerRepository = stickerRepository;
        }

        public async Task<IEnumerable<Sticker>> GetAllActiveAsync(string? category = null)
        {
            return await _stickerRepository.GetAllActiveAsync(category);
        }

        public async Task<List<string>> GetCategoriesAsync()
        {
            return await _stickerRepository.GetAllCategoriesAsync();
        }
    }
}
