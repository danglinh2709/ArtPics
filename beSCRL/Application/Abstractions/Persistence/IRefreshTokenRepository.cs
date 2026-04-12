using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface IRefreshTokenRepository : IBaseRepository<RefreshToken>
    {
        Task<RefreshToken?> GetByTokenHashAsync(string tokenHash);
        Task<RefreshToken?> GetActiveByTokenHashAsync(string tokenHash);
        Task<IEnumerable<RefreshToken>> GetActiveByUserIdAsync(string userId);
        Task<RefreshToken?> GetActiveByUserIdAndDeviceIdAsync(string userId, string deviceId);
        Task RevokeAsync(string tokenId, string? reason = null);
        Task RevokeAllByUserIdAsync(string userId, string? reason = null);
    }
}