using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface IAssetRepository : IBaseRepository<Asset>
    {
        Task<IEnumerable<Asset>> GetByProjectIdAsync(string projectId);
    }
}
