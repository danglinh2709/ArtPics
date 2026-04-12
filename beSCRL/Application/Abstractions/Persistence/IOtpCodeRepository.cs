using Domain.Entities;

namespace Application.Abstractions.Persistence
{
    public interface IOtpCodeRepository : IBaseRepository<OtpCode>
    {
        Task<OtpCode?> GetValidOtpAsync(string email, string purpose);
        Task InvalidateAllByEmailAsync(string email, string purpose);
        Task MarkAsUsedAsync(string otpId);
    }
}
