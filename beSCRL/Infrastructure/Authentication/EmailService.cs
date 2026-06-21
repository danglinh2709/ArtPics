using Application.Abstractions.Authentication;
using Infrastructure.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Infrastructure.Authentication
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(
            IOptions<EmailSettings> emailOptions,
            ILogger<EmailService> logger)
        {
            _emailSettings = emailOptions.Value;
            _logger = logger;
        }

        //SendEmailAsync : gui cho ai, tieu de la gi, noi dung la gi
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            // 1. validate input
            if (string.IsNullOrEmpty(toEmail))
            {
                throw new ArgumentNullException("Recipient email cannot be empty", nameof(toEmail));
            }

            if (string.IsNullOrEmpty(subject))
            {
                throw new ArgumentNullException("Subject cannot be empty", nameof(subject));
            }

            if (string.IsNullOrEmpty(body))
            {
                throw new ArgumentNullException("Body cannot be empty", nameof(body));
            }

            // 2. create mimeMessage: 1 object email hoan chinh
            var message = new MimeMessage();

            // 3. add + set From, To, Subject, Body
            message.From.Add(new MailboxAddress(
                _emailSettings.SenderName,
                _emailSettings.SenderEmail));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;
            message.Body = new TextPart("html")
            {
                Text = body
            };

            // create SmtpClient : may chu dung de gui email
            using var smtp = new SmtpClient();
            var timeoutSeconds = _emailSettings.TimeoutSeconds > 0
                ? _emailSettings.TimeoutSeconds
                : 15;
            using var timeoutCts = new CancellationTokenSource(
                TimeSpan.FromSeconds(timeoutSeconds));

            smtp.Timeout = checked(timeoutSeconds * 1000);

            try
            {
                _logger.LogInformation(
                    "Connecting to SMTP server {SmtpHost}:{SmtpPort}",
                    _emailSettings.SmtpHost,
                    _emailSettings.SmtpPort);

                // connect smtp
                await smtp.ConnectAsync(
                    _emailSettings.SmtpHost,
                    _emailSettings.SmtpPort,
                    SecureSocketOptions.StartTls,
                    timeoutCts.Token);

                _logger.LogInformation("Authenticating with SMTP server");
                await smtp.AuthenticateAsync(
                    _emailSettings.Username,
                    _emailSettings.Password,
                    timeoutCts.Token);

                _logger.LogInformation("Sending OTP email through SMTP server");
                await smtp.SendAsync(message, timeoutCts.Token);

                await smtp.DisconnectAsync(true, timeoutCts.Token);
                _logger.LogInformation("OTP email sent successfully");
            }
            catch (OperationCanceledException ex) when (timeoutCts.IsCancellationRequested)
            {
                _logger.LogWarning(
                    ex,
                    "SMTP operation timed out after {TimeoutSeconds} seconds",
                    timeoutSeconds);
                throw new TimeoutException(
                    "Email service timed out. Please try again.",
                    ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send OTP email through SMTP server");
                throw;
            }
        }

        // SendOtpAsync: ham cbi noi dung otp va dung lai SendEmailAsync de gyu
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
