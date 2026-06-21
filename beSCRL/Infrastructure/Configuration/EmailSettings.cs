namespace Infrastructure.Configuration
{
    public class EmailSettings
    {
        public const string SectionName = "EmailSettings";

        public string ApiBaseUrl { get; set; } = "https://api.brevo.com/v3";
        public string ApiKey { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
        public int TimeoutSeconds { get; set; } = 15;
    }
}
