namespace Infrastructure.Persistence.Seeders
{
    public class DatabaseSeeder
    {
        private readonly TemplateCategorySeeder _templateCategorySeeder;
        private readonly TemplateSeeder _templateSeeder;
        private readonly StickerSeeder _stickerSeeder;

        public DatabaseSeeder(
            TemplateCategorySeeder templateCategorySeeder,
            TemplateSeeder templateSeeder,
            StickerSeeder stickerSeeder)
        {
            _templateCategorySeeder = templateCategorySeeder;
            _templateSeeder = templateSeeder;
            _stickerSeeder = stickerSeeder;
        }

        public async Task SeedAllAsync()
        {
            await _templateCategorySeeder.SeedAsync();
            await _templateSeeder.SeedAsync();
            await _stickerSeeder.SeedAsync();
        }
    }
}
