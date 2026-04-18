using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface ITemplateRepository : IBaseRepository<Template>
    {
        Task<IEnumerable<Template>> GetAllActiveAsync(string? categoryCode = null, string? format = null);
        Task<List<string>> GetAllCategoriesAsync();
        Task<List<string>> GetFormatsAsync(string categoryCode);
    }
}
