using Application.DTOs.UserDto;


namespace Application.DTOs.AuthDto
{
    public class AuthResponseDto
    {
        public string AccessToken { get; set; } = default!;
        public string RefreshToken { get; set; } = default!;
        public DateTime ExpiresAt { get; set; }

        public UserProfileDto User { get; set; } = default!;
    }
}
