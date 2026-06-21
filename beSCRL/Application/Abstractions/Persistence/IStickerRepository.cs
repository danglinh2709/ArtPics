using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface IStickerRepository : IBaseRepository<Sticker>
    {
        Task<IEnumerable<Sticker>> GetAllActiveAsync(string? category = null);
        Task<List<string>> GetAllCategoriesAsync();
    }
}
