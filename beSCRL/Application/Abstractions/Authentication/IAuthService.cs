using Application.DTOs.AuthDto;
using Application.DTOs.UserDto;


namespace Application.Abstractions.Authentication
{
    public interface IAuthService
    {
        Task RequestOtpAsync(RequestOtpDto request);
        Task<AuthResponseDto> LoginAsync(LoginDto request);
        Task<AuthResponseDto> RefreshAsync(RefreshTokenDto request);
        Task LogoutAsync(LogoutDto request);

        Task<UserProfileDto?> GetProfileAsync(string userId);
    }
}
