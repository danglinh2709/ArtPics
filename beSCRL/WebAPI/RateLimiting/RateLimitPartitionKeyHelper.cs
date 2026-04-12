namespace WebAPI.RateLimiting
{
    public static class RateLimitPartitionKeyHelper
    {

        // create key rate limit theo ip BuildPerIpKey
        public static string BuildPerIpKey(HttpContext context, string prefix)
        {
            var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown-ip";

            var key = $"{prefix}:ip:{ip}"; // format 

            return key;
        }

        // user or ip
        public static string BuildPerUserOrIpKey(HttpContext context, string prefix)
        {
            if (context.User.Identity?.IsAuthenticated == true)
            {
                var userName = context.User.Identity?.Name ?? "authenticated-user";
                return $"{prefix}:user:{userName}";
            }

            var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown-ip";
            return $"{prefix}:ip:{ip}";
        }
    }
}