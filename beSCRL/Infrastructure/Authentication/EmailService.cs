using Application.Abstractions.Authentication;
using Infrastructure.Configuration;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Infrastructure.Authentication
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;

        public EmailService(IOptions<EmailSettings> emailOptions)
        {
            _emailSettings = emailOptions.Value;
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

            // connect smtp
            await smtp.ConnectAsync(
               _emailSettings.SmtpHost,
               _emailSettings.SmtpPort,
               SecureSocketOptions.StartTls);

            // authentication
            await smtp.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);

            // send email
            await smtp.SendAsync(message);

            // disconnect 
            await smtp.DisconnectAsync(true);
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
