using Application.Abstractions.Authentication;
using Application.Abstractions.Persistence;
using Application.DTOs.AuthDto;
using Application.DTOs.UserDto;
using Domain.Entities;
using Domain.Enums;
using System.Security.Cryptography;
using System.Text;

namespace Infrastructure.Authentication
{
    public class AuthService : IAuthService
    {

        private readonly IOtpCodeRepository _otpRepo;
        private readonly IUserRepository _userRepo;
        private readonly IEmailService _emailService;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        public AuthService(
            IOtpCodeRepository otpRepo,
            IUserRepository userRepo,
            IEmailService emailService,
            IJwtTokenService jwtService,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _otpRepo = otpRepo;
            _userRepo = userRepo;
            _emailService = emailService;
            _jwtTokenService = jwtService;
            _refreshTokenRepository = refreshTokenRepository;
        }

        // REQUEST OTP
        public async Task RequestOtpAsync(RequestOtpDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email))
                throw new Exception("Email is required");

            var purpose = string.IsNullOrWhiteSpace(request.Purpose)
                ? "login"
                : request.Purpose.Trim().ToLower();

            // 1. Generate OTP
            var otp = new Random().Next(100000, 999999).ToString();

            // 2. Hash OTP
            var codeHash = BCrypt.Net.BCrypt.HashPassword(otp);

            // 3. Invalidate (vo hieu hoa) OTP cũ
            await _otpRepo.InvalidateAllByEmailAsync(request.Email, purpose);

            // 4. Tạo entity
            var entity = new OtpCode
            {
                Email = request.Email,
                CodeHash = codeHash,
                ExpiredAt = DateTime.UtcNow.AddMinutes(5),
                IsRevoked = false,
                UsedAt = null,
                AttemptCount = 0,
                Purpose = purpose
            };

            // 5. Save DB
            await _otpRepo.CreateAsync(entity);

            // 6. Send Email
            await _emailService.SendOtpAsync(request.Email, otp);

            //   // 6. Send Email (Fire and forget, do not wait for SMTP to respond)
            // _ = Task.Run(() => _emailService.SendOtpAsync(request.Email, otp));
        }


        // LOGIN (VERIFY OTP): user nhập email + OTP, hệ thống kiểm tra OTP đúng hay không, rồi đăng nhập bằng cách cấp access token và refresh token.
        public async Task<AuthResponseDto> LoginAsync(LoginDto request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.OtpCode))
                throw new Exception("Invalid input");

            var purpose = string.IsNullOrWhiteSpace(request.Purpose)
                ? "login"
                : request.Purpose.Trim().ToLower();

            // 1. Lấy OTP hợp lệ
            var otpRecord = await _otpRepo.GetValidOtpAsync(request.Email , purpose);

            if (otpRecord == null)
                throw new Exception("OTP not found or expired");

            // 2. Verify OTP
            var isValid = BCrypt.Net.BCrypt.Verify(request.OtpCode, otpRecord.CodeHash);

            if (!isValid)
                throw new Exception("Invalid OTP");

            // 3. Mark used
            await _otpRepo.MarkAsUsedAsync(otpRecord.Id);

            // 4. Get or create user
            var user = await _userRepo.GetByEmailAsync(request.Email);

            if (user == null)
            {
                user = new User
                {
                    Email = request.Email,
                    Role = UserRole.User,
                    IsActive = true
                };

                await _userRepo.CreateAsync(user);
            }

            // 5. Cấp Generate JWT
            var accessToken = _jwtTokenService.GenerateAccessToken(user.Id, user.Email, user.Role);
            
            // 6. Cấp generate new raw refresh token trả cho client
            var rawRefreshToken = _jwtTokenService.GenerateRefreshToken();
            // after, hash raw refresh token để lưu DB
            var refreshTokenHash = ComputeSha256(rawRefreshToken);

            // create entity refresh token => đang lưu session login in db 
            var refreshTokenEntity = new RefreshToken
            {
                UserId = user.Id,
                TokenHash = refreshTokenHash,
                DeviceId = request.DeviceId,
                DeviceName = request.DeviceName,
                IpAddress = request.IpAddress,
                ExpiredAt = DateTime.UtcNow.AddDays(7),
                RevokedAt = null,
                RevokeReason = null
            };

            // save refresh token vao db
            await _refreshTokenRepository.CreateAsync(refreshTokenEntity);

            // return result về cho client 
            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = rawRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };
        }

        // refresh token để xin access token mới và đồng thời cấp luôn refresh token mới. 
        public async Task<AuthResponseDto> RefreshAsync(RefreshTokenDto request)
        {
            if (string.IsNullOrWhiteSpace(request.RefreshToken))
                throw new Exception("Refresh token is required");

            var tokenHash = ComputeSha256(request.RefreshToken);
            
            // find refresh token con active
            var storedToken = await _refreshTokenRepository.GetActiveByTokenHashAsync(tokenHash);
            if (storedToken == null)
                throw new Exception("Invalid or expired refresh token");

            // get user theo UserId in refresh token
            var user = await _userRepo.GetByIdAsync(storedToken.UserId);
            if (user == null || !user.IsActive)
                throw new Exception("User not found or inactive");

            // revoke token cũ để rotate refresh token
            await _refreshTokenRepository.RevokeAsync(storedToken.Id, "Rotated");

            // create new access token
            var newAccessToken = _jwtTokenService.GenerateAccessToken(user.Id, user.Email, user.Role);
            // create new refresh token
            var newRawRefreshToken = _jwtTokenService.GenerateRefreshToken();
            // hash refresh token 
            var newRefreshTokenHash = ComputeSha256(newRawRefreshToken);

            // create entity new refresh token to save db
            var newRefreshTokenEntity = new RefreshToken
            {
                UserId = user.Id,
                TokenHash = newRefreshTokenHash,
                DeviceId = storedToken.DeviceId,
                DeviceName = storedToken.DeviceName,
                IpAddress = storedToken.IpAddress,
                ExpiredAt = DateTime.UtcNow.AddDays(7),
                RevokedAt = null,
                RevokeReason = null
            };

            // save new refresh token => ghi new refresh token in db
            await _refreshTokenRepository.CreateAsync(newRefreshTokenEntity);


            // return result for client
            return new AuthResponseDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRawRefreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60)
            };
        }

        // logout 
        public async Task LogoutAsync(LogoutDto request)
        {
            if (string.IsNullOrWhiteSpace(request.RefreshToken))
                throw new Exception("Refresh token is required");

            var tokenHash = ComputeSha256(request.RefreshToken);

            var storedToken = await _refreshTokenRepository.GetActiveByTokenHashAsync(tokenHash);

            if (storedToken == null)
                return;

            await _refreshTokenRepository.RevokeAsync(storedToken.Id, "User logout");
        }


        private static string ComputeSha256(string input)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(input);
            var hashBytes = sha256.ComputeHash(bytes);
            return Convert.ToHexString(hashBytes);
        }

        public async Task<UserProfileDto?> GetProfileAsync(string userId)
        {
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null || !user.IsActive) return null;

            return new UserProfileDto
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Role = user.Role.ToString(),
               
            };
        }
    }
}
