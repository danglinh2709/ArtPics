using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Seeders
{
    public class TemplateSeeder
    {
        private readonly ITemplateRepository _templateRepository;

        public TemplateSeeder(ITemplateRepository templateRepository)
        {
            _templateRepository = templateRepository;
        }

        public async Task SeedAsync()
        {
            var existingTemplates = await _templateRepository.GetAllAsync();
            if (existingTemplates.Any()) return;

            var templates = new List<Template>
            {
                new Template
                {
                    Name = "Modern Story Scrl",
                    Category = "Instagram Story",
                    Description = "A modern 3-page continuous scroll design for Instagram Stories.",
                    ThumbnailUrl = "https://res.cloudinary.com/demo/image/upload/v1631234567/sample_story_thumb.jpg",
                    PreviewImageUrl = "https://res.cloudinary.com/demo/image/upload/v1631234567/sample_story_preview.jpg",
                    Tags = new List<string> { "modern", "story", "minimal" },
                    SortOrder = 1,
                    IsDefault = true,
                    TemplateData = BsonDocument.Parse(@"{
                        ""schemaVersion"": 1,
                        ""document"": {
                            ""type"": ""post"",
                            ""title"": ""Modern Story Scrl"",
                            ""width"": 1080,
                            ""height"": 1920,
                            ""pageCount"": 3
                        },
                        ""pages"": [
                            {
                                ""id"": ""page-1"",
                                ""name"": ""Page 1"",
                                ""index"": 0,
                                ""background"": { ""type"": ""color"", ""color"": ""#f8fafc"" },
                                ""layers"": [
                                    {
                                        ""id"": ""layer-bg-1"",
                                        ""type"": ""image"",
                                        ""name"": ""Background Decoration"",
                                        ""x"": 0, ""y"": 0, ""width"": 1080, ""height"": 600,
                                        ""rotation"": 0, ""opacity"": 0.1, ""visible"": true, ""locked"": true,
                                        ""assetId"": ""dummy-asset-1"",
                                        ""url"": ""https://res.cloudinary.com/demo/image/upload/v1631234567/sample.jpg""
                                    },
                                    {
                                        ""id"": ""layer-text-1"",
                                        ""type"": ""text"",
                                        ""name"": ""Title"",
                                        ""x"": 100, ""y"": 300, ""width"": 880, ""height"": 200,
                                        ""rotation"": 0, ""opacity"": 1, ""visible"": true, ""locked"": false,
                                        ""text"": ""NEW ARRIVAL"",
                                        ""fontSize"": 80, ""fontWeight"": ""bold"", ""fontFamily"": ""Outfit"", ""color"": ""#0f172a"", ""textAlign"": ""center""
                                    }
                                ]
                            },
                            {
                                ""id"": ""page-2"",
                                ""name"": ""Page 2"",
                                ""index"": 1,
                                ""background"": { ""type"": ""color"", ""color"": ""#f1f5f9"" },
                                ""layers"": []
                            },
                            {
                                ""id"": ""page-3"",
                                ""name"": ""Page 3"",
                                ""index"": 2,
                                ""background"": { ""type"": ""color"", ""color"": ""#e2e8f0"" },
                                ""layers"": []
                            }
                        ]
                    }")
                },
                new Template
                {
                    Name = "Business Carousel",
                    Category = "Facebook Post",
                    Description = "Professional carousel for business announcements.",
                    ThumbnailUrl = "https://res.cloudinary.com/demo/image/upload/v1631234567/sample_carousel_thumb.jpg",
                    PreviewImageUrl = "https://res.cloudinary.com/demo/image/upload/v1631234567/sample_carousel_preview.jpg",
                    Tags = new List<string> { "business", "pro", "clean" },
                    SortOrder = 2,
                    IsDefault = false,
                    TemplateData = BsonDocument.Parse(@"{
                        ""schemaVersion"": 1,
                        ""document"": {
                            ""type"": ""post"",
                            ""title"": ""Business Carousel"",
                            ""width"": 1080,
                            ""height"": 1080,
                            ""pageCount"": 2
                        },
                        ""pages"": [
                            {
                                ""id"": ""page-1"",
                                ""name"": ""Main"",
                                ""index"": 0,
                                ""background"": { ""type"": ""color"", ""color"": ""#2563eb"" },
                                ""layers"": []
                            },
                            {
                                ""id"": ""page-2"",
                                ""name"": ""Details"",
                                ""index"": 1,
                                ""background"": { ""type"": ""color"", ""color"": ""#ffffff"" },
                                ""layers"": []
                            }
                        ]
                    }")
                }
            };

            foreach (var template in templates)
            {
                await _templateRepository.CreateAsync(template);
            }
        }
    }
}
