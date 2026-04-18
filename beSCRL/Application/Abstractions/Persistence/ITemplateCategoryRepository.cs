using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Abstractions.Persistence
{
    public interface ITemplateCategoryRepository : IBaseRepository<TemplateCategory>
    {
        Task<IEnumerable<TemplateCategory>> GetActiveCategoriesAsync();
    }
}