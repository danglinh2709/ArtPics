using Domain.Entities;
using MongoDB.Driver;

namespace Infrastructure.Persistence.Seeders
{
    public class StickerSeeder
    {
        private readonly IMongoCollection<Sticker> _collection;

        public StickerSeeder(IMongoDatabase database)
        {
            _collection = database.GetCollection<Sticker>(CollectionNames.Stickers);
        }

        public async Task SeedAsync()
        {
            var stickers = new List<Sticker>
            {
                // --- Emoji ---
                new() { Name = "Smiley", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/grinning-face-with-big-eyes_1f603.png", Tags = ["emoji", "smile", "happy"], SortOrder = 1 },
                new() { Name = "Red Heart", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png", Tags = ["emoji", "heart", "love"], SortOrder = 2 },
                new() { Name = "Glowing Star", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/glowing-star_1f31f.png", Tags = ["emoji", "star", "sparkle"], SortOrder = 3 },
                new() { Name = "Fire", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/fire_1f525.png", Tags = ["emoji", "fire", "hot"], SortOrder = 4 },
                new() { Name = "Lightning", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png", Tags = ["emoji", "lightning", "energy"], SortOrder = 5 },
                new() { Name = "Tears of Joy", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/face-with-tears-of-joy_1f602.png", Tags = ["emoji", "laugh", "cry"], SortOrder = 6 },
                new() { Name = "Crown", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/crown_1f451.png", Tags = ["emoji", "crown", "king"], SortOrder = 7 },
                new() { Name = "Butterfly", Category = "emoji", ImageUrl = "https://em-content.zobj.net/source/apple/391/butterfly_1f98b.png", Tags = ["emoji", "butterfly", "nature"], SortOrder = 8 },

                // --- Decorative ---
                new() { Name = "Rainbow", Category = "decorative", ImageUrl = "https://em-content.zobj.net/source/apple/391/rainbow_1f308.png", Tags = ["decorative", "rainbow", "color"], SortOrder = 1 },
                new() { Name = "Cherry Blossom", Category = "decorative", ImageUrl = "https://em-content.zobj.net/source/apple/391/cherry-blossom_1f338.png", Tags = ["decorative", "flower", "sakura"], SortOrder = 2 },
                new() { Name = "Sunflower", Category = "decorative", ImageUrl = "https://em-content.zobj.net/source/apple/391/sunflower_1f33b.png", Tags = ["decorative", "flower", "sun"], SortOrder = 3 },
                new() { Name = "Maple Leaf", Category = "decorative", ImageUrl = "https://em-content.zobj.net/source/apple/391/maple-leaf_1f341.png", Tags = ["decorative", "leaf", "autumn"], SortOrder = 4 },
                new() { Name = "Snowflake", Category = "decorative", ImageUrl = "https://em-content.zobj.net/source/apple/391/snowflake_2744-fe0f.png", Tags = ["decorative", "snow", "winter"], SortOrder = 5 },
                new() { Name = "Fireworks", Category = "decorative", ImageUrl = "https://em-content.zobj.net/source/apple/391/fireworks_1f386.png", Tags = ["decorative", "fireworks", "celebration"], SortOrder = 6 },

                // --- Gesture ---
                new() { Name = "Thumbs Up", Category = "gesture", ImageUrl = "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png", Tags = ["gesture", "like", "thumbs up"], SortOrder = 1 },
                new() { Name = "Clapping", Category = "gesture", ImageUrl = "https://em-content.zobj.net/source/apple/391/clapping-hands_1f44f.png", Tags = ["gesture", "clap", "bravo"], SortOrder = 2 },
                new() { Name = "Victory", Category = "gesture", ImageUrl = "https://em-content.zobj.net/source/apple/391/victory-hand_270c-fe0f.png", Tags = ["gesture", "victory", "peace"], SortOrder = 3 },
                new() { Name = "Strong", Category = "gesture", ImageUrl = "https://em-content.zobj.net/source/apple/391/flexed-biceps_1f4aa.png", Tags = ["gesture", "strong", "muscle"], SortOrder = 4 },

                // --- Food ---
                new() { Name = "Pizza", Category = "food", ImageUrl = "https://em-content.zobj.net/source/apple/391/pizza_1f355.png", Tags = ["food", "pizza"], SortOrder = 1 },
                new() { Name = "Ice Cream", Category = "food", ImageUrl = "https://em-content.zobj.net/source/apple/391/ice-cream_1f368.png", Tags = ["food", "icecream", "dessert"], SortOrder = 2 },
                new() { Name = "Coffee", Category = "food", ImageUrl = "https://em-content.zobj.net/source/apple/391/hot-beverage_2615.png", Tags = ["food", "coffee", "drink"], SortOrder = 3 },
            };

            foreach (var sticker in stickers)
            {
                var filter = Builders<Sticker>.Filter.Eq(s => s.Name, sticker.Name);
                var update = Builders<Sticker>.Update
                    .Set(s => s.Category, sticker.Category)
                    .Set(s => s.ImageUrl, sticker.ImageUrl)
                    .Set(s => s.Tags, sticker.Tags)
                    .Set(s => s.SortOrder, sticker.SortOrder)
                    .Set(s => s.IsActive, sticker.IsActive);

                await _collection.UpdateOneAsync(filter, update, new UpdateOptions { IsUpsert = true });
            }
        }
    }
}
