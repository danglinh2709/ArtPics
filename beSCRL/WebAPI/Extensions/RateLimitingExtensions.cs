using System.Globalization;
using System.Threading.RateLimiting;
using WebAPI.RateLimiting;

namespace WebAPI.Extensions
{
    public static class RateLimitingExtensions
    {
        public static IServiceCollection AddAuthRateLimiting(this IServiceCollection services)
        {
            services.AddRateLimiter(options =>
            {
                options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

                options.OnRejected = async (context, token) =>
                {
                    var path = context.HttpContext.Request.Path.Value?.ToLower() ?? "";
                    string message = "Too many requests. Please try again later.";

                    Console.WriteLine($"RATE LIMITED: {path}");

                    if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
                    {
                        context.HttpContext.Response.Headers.RetryAfter =
                            ((int)retryAfter.TotalSeconds).ToString(NumberFormatInfo.InvariantInfo);
                    }

                    if (path.Contains("/auth/request-otp"))
                    {
                        message = "Bạn đã yêu cầu gửi mã OTP quá số lần cho phép. Vui lòng thử lại sau 1 phút.";
                    }
                    else if (path.Contains("/auth/login"))
                    {
                        message = "Bạn đã đăng nhập quá số lần cho phép. Vui lòng thử lại sau 1 phút.";
                    }
                    else if (path.Contains("/auth/refresh-token"))
                    {
                        message = "Bạn đã yêu cầu làm mới phiên đăng nhập quá nhiều lần. Vui lòng thử lại sau.";
                    }

                    context.HttpContext.Response.ContentType = "application/json";

                    await context.HttpContext.Response.WriteAsJsonAsync(new
                    {
                        message
                    }, cancellationToken: token);
                };

                // policy OTP: spam mail
                options.AddPolicy(AuthRateLimitPolicies.RequestOtp, httpContext =>
                {
                    // create partition key
                    var key = RateLimitPartitionKeyHelper.BuildPerIpKey(httpContext, "request-otp");
                    Console.WriteLine($"OTP partition key: {key}");

                    // thuat toan sliding window: chia window 1 phut thanh 6 segments, moi segment 10s, cho phep 3 request trong 1 window
                    return RateLimitPartition.GetSlidingWindowLimiter(
                        partitionKey: key,
                        factory: _ => new SlidingWindowRateLimiterOptions
                        {
                            PermitLimit = 3,
                            Window = TimeSpan.FromMinutes(1),
                            SegmentsPerWindow = 6,
                            QueueLimit = 0,
                            QueueProcessingOrder = QueueProcessingOrder.OldestFirst
                        });
                });

                // Login: chống brute force
                options.AddPolicy(AuthRateLimitPolicies.Login, httpContext =>
                {
                    var key = RateLimitPartitionKeyHelper.BuildPerIpKey(httpContext, "login");

                    return RateLimitPartition.GetSlidingWindowLimiter(
                        partitionKey: key,
                        factory: _ => new SlidingWindowRateLimiterOptions
                        {
                            PermitLimit = 5,
                            Window = TimeSpan.FromMinutes(1),
                            SegmentsPerWindow = 6,
                            QueueLimit = 0,
                            QueueProcessingOrder = QueueProcessingOrder.OldestFirst
                        });
                });

                // Refresh
                options.AddPolicy(AuthRateLimitPolicies.Refresh, httpContext =>
                {
                    var key = RateLimitPartitionKeyHelper.BuildPerUserOrIpKey(httpContext, "refresh");

                    return RateLimitPartition.GetSlidingWindowLimiter(
                        partitionKey: key,
                        factory: _ => new SlidingWindowRateLimiterOptions
                        {
                            PermitLimit = 10,
                            Window = TimeSpan.FromMinutes(1),
                            SegmentsPerWindow = 6,
                            QueueLimit = 0,
                            QueueProcessingOrder = QueueProcessingOrder.OldestFirst
                        });
                });
            });

            return services;
        }
    }
}