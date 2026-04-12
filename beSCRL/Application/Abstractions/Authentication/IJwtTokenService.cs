

using Domain.Enums;

namespace Application.Abstractions.Authentication
{
    public interface IJwtTokenService
    {
        string GenerateAccessToken(string userId, string email, UserRole role);
        string GenerateRefreshToken();
    }
}
