using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface ITemplateRepository : IBaseRepository<Template>
    {
        Task<IEnumerable<Template>> GetAllActiveAsync(string? category = null);
        Task<List<string>> GetAllCategoriesAsync();
    }
}
