using Application.Abstractions.Authentication;
using Application.Abstractions.Persistence;
using Application.Services;
using Infrastructure.Authentication;
using Infrastructure.Configuration;
using Infrastructure.Configuration.Infrastructure.Configuration;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;
using Infrastructure.Persistence.Seeders;
using Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // MongoDB config
            services.Configure<MongoDbSettings>(configuration.GetSection(MongoDbSettings.SectionName));
            services.AddSingleton<MongoDbContext>();

            services.AddSingleton<IMongoDatabase>(sp =>
            {
                var context = sp.GetRequiredService<MongoDbContext>();
                return context.Database;
            });

            // Jwt config
            services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
            services.AddScoped<IJwtTokenService, JwtTokenService>();

            // Email config
            services.Configure<EmailSettings>(configuration.GetSection(EmailSettings.SectionName));
            services.AddScoped<IEmailService, EmailService>();

            // Auth
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<IFolderService, FolderService>();
            services.AddScoped<ITemplateService, TemplateService>();
            services.AddScoped<ITemplateCategoryService, TemplateCategoryService>();
            services.AddScoped<IStickerService, StickerService>();

            services.AddScoped<TemplateSeeder>();
            services.AddScoped<TemplateCategorySeeder>();
            services.AddScoped<StickerSeeder>();
            services.AddScoped<DatabaseSeeder>();

            // Cloudinary
            services.Configure<CloudinarySettings>(configuration.GetSection(CloudinarySettings.SectionName));
            services.AddScoped<IStorageService, CloudinaryStorageService>();
            services.AddScoped<IAssetService, AssetService>();
;
            // Repositories
            services.AddScoped<IOtpCodeRepository, OtpCodeRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<IProjectRepository, ProjectRepository>();
            services.AddScoped<IAssetRepository, AssetRepository>();
            services.AddScoped<IFolderRepository, FolderRepository>();
            services.AddScoped<ITemplateRepository, TemplateRepository>();
            services.AddScoped<ITemplateCategoryRepository, TemplateCategoryRepository>();
            services.AddScoped<IStickerRepository, StickerRepository>();

            return services;
        }
    }
}