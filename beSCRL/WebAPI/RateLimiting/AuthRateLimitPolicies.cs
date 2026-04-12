namespace WebAPI.RateLimiting
{
    public static class AuthRateLimitPolicies
    {
        public const string RequestOtp = "auth-request-otp-sliding";
        public const string Login = "auth-login-sliding";
        public const string Refresh = "auth-refresh-sliding";
    }
}