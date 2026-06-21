namespace Infrastructure.Configuration
{
    public class EmailSettings
    {
        public const string SectionName = "EmailSettings";

        public string SmtpHost { get; set; } = string.Empty;
        public int SmtpPort { get; set; }
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int TimeoutSeconds { get; set; } = 15;
    }
}
