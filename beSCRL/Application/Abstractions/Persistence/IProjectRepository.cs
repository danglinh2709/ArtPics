using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstractions.Persistence
{
   public interface IProjectRepository : IBaseRepository<Project>
    {
        Task<IEnumerable<Project>> GetByUserIdAsync(string userId);
        Task<Project?> GetByIdAndUserIdAsync(string projectId, string userId);
    }
}
