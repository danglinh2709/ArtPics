using Application.Abstractions.Authentication;
using Application.DTOs.AuthDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // request-otp
        [HttpPost("request-otp")]
        [AllowAnonymous]
        [EnableRateLimiting(AuthRateLimitPolicies.RequestOtp)]
        public async Task<IActionResult> RequestOtp([FromBody] RequestOtpDto request)
        {

            await _authService.RequestOtpAsync(request);

            return Ok(new
            {
                message = "OTP sent successfully"
            });
        }

        // login 
        [HttpPost("login")]
        [AllowAnonymous]
        [EnableRateLimiting(AuthRateLimitPolicies.Login)]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var result = await _authService.LoginAsync(request);
            return Ok(result);
        }


        // refresh token 
        [HttpPost("refresh")]
        [AllowAnonymous]
        [EnableRateLimiting(AuthRateLimitPolicies.Refresh)]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto request)
        {
            var result = await _authService.RefreshAsync(request);
            return Ok(result);
        }

        // logout 
        [HttpPost("logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout([FromBody] LogoutDto request)
        {
            await _authService.LogoutAsync(request);

            return Ok(new
            {
                message = "Logged out successfully"
            });
        }




    }
}
