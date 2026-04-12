using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface IUserRepository : IBaseRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<bool> ExistsByEmailAsync(string email);
        Task UpdateLastLoginAsync(string userId, DateTime lastLoginAt);
    }
}
