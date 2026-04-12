
namespace Application.DTOs.AuthDto
{
    public class RequestOtpDto
    {
        public string Email { get; set; } = default!;
        public string Purpose { get; set; } = "login";
    }
}
