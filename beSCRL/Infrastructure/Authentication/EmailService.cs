using System.Net.Http.Json;
using Application.Abstractions.Authentication;
using Infrastructure.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace Infrastructure.Authentication
{
    public class EmailService : IEmailService
    {
        private static readonly HttpClient HttpClient = new()
        {
            Timeout = Timeout.InfiniteTimeSpan
        };

        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(
            IOptions<EmailSettings> emailOptions,
            ILogger<EmailService> logger)
        {
            _emailSettings = emailOptions.Value;
            _logger = logger;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(toEmail);
            ArgumentException.ThrowIfNullOrWhiteSpace(subject);
            ArgumentException.ThrowIfNullOrWhiteSpace(body);

            if (string.IsNullOrWhiteSpace(_emailSettings.ApiKey) ||
                _emailSettings.ApiKey.StartsWith("REPLACE_ME", StringComparison.OrdinalIgnoreCase))
            {
                throw new EmailDeliveryException(
                    "Email API key is not configured. Set EmailSettings__ApiKey.");
            }

            if (string.IsNullOrWhiteSpace(_emailSettings.SenderEmail))
            {
                throw new EmailDeliveryException(
                    "Email sender is not configured. Set EmailSettings__SenderEmail.");
            }

            var apiBaseUrl = _emailSettings.ApiBaseUrl.TrimEnd('/');
            if (!Uri.TryCreate($"{apiBaseUrl}/smtp/email", UriKind.Absolute, out var endpoint))
            {
                throw new EmailDeliveryException("Email API URL is invalid.");
            }

            var timeoutSeconds = _emailSettings.TimeoutSeconds > 0
                ? _emailSettings.TimeoutSeconds
                : 15;
            using var timeoutCts = new CancellationTokenSource(
                TimeSpan.FromSeconds(timeoutSeconds));

            var payload = new
            {
                sender = new
                {
                    name = _emailSettings.SenderName,
                    email = _emailSettings.SenderEmail
                },
                to = new[]
                {
                    new { email = toEmail }
                },
                subject,
                htmlContent = body
            };

            using var request = new HttpRequestMessage(HttpMethod.Post, endpoint);
            request.Headers.Add("api-key", _emailSettings.ApiKey);
            request.Content = JsonContent.Create(payload);

            try
            {
                _logger.LogInformation("Sending OTP email through Brevo HTTPS API");
                using var response = await HttpClient.SendAsync(
                    request,
                    HttpCompletionOption.ResponseHeadersRead,
                    timeoutCts.Token);

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError(
                        "Brevo email API rejected the request with HTTP status {StatusCode}",
                        (int)response.StatusCode);
                    throw new EmailDeliveryException(
                        $"Email provider rejected the request with HTTP status {(int)response.StatusCode}.");
                }

                _logger.LogInformation("OTP email accepted by Brevo HTTPS API");
            }
            catch (OperationCanceledException ex) when (timeoutCts.IsCancellationRequested)
            {
                _logger.LogWarning(
                    ex,
                    "Email API request timed out after {TimeoutSeconds} seconds",
                    timeoutSeconds);
                throw new TimeoutException(
                    "Email service timed out. Please try again.",
                    ex);
            }
            catch (EmailDeliveryException)
            {
                throw;
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Failed to call Brevo email API");
                throw new EmailDeliveryException(
                    "Unable to reach the email provider.",
                    ex);
            }
        }

        public async Task SendOtpAsync(string toEmail, string otp)
        {
            var subject = "Your OTP Code";

            var body = $@"
                <div style='font-family: Arial, sans-serif; line-height: 1.6;'>
                    <h2>OTP Verification</h2>
                    <p>Your OTP code is:</p>
                    <h1 style='letter-spacing: 4px; color: #2563eb;'>{otp}</h1>
                    <p>This code will expire in a few minutes.</p>
                    <p>If you did not request this code, please ignore this email.</p>
                </div>";

            await SendEmailAsync(toEmail, subject, body);
        }
    }
}
