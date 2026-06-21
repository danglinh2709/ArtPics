using Domain.Entities;

namespace Application.Services
{
    public interface IStickerService
    {
        Task<IEnumerable<Sticker>> GetAllActiveAsync(string? category = null);
        Task<List<string>> GetCategoriesAsync();
    }
}
