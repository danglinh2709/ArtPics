namespace Infrastructure.Persistence.Seeders
{
    public class DatabaseSeeder
    {
        private readonly TemplateCategorySeeder _templateCategorySeeder;
        private readonly TemplateSeeder _templateSeeder;

        public DatabaseSeeder(
            TemplateCategorySeeder templateCategorySeeder,
            TemplateSeeder templateSeeder)
        {
            _templateCategorySeeder = templateCategorySeeder;
            _templateSeeder = templateSeeder;
        }

        public async Task SeedAllAsync()
        {
            await _templateCategorySeeder.SeedAsync();
            await _templateSeeder.SeedAsync();
        }
    }
}
