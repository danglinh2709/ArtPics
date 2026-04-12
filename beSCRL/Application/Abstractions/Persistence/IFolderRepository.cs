using Domain.Entities;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Abstractions.Persistence
{
    public interface IFolderRepository : IBaseRepository<Folder>
    {
        Task<IEnumerable<Folder>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
        Task<Folder?> GetByIdAndUserIdAsync(string id, string userId, CancellationToken cancellationToken = default);
    }

}
