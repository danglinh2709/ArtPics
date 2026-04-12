

namespace Application.DTOs.AuthDto
{
    public class LoginDto
    {
        public string Email { get; set; } = default!;
        public string OtpCode { get; set; } = default!;
        public string Purpose { get; set; } = "login";
        public string? DeviceId { get; set; }
        public string? DeviceName { get; set; }
        public string? IpAddress { get; set; }
    }
}
