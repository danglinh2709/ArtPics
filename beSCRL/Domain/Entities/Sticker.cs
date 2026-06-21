using Domain.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities
{
    [BsonIgnoreExtraElements]
    public sealed class Sticker : AuditableEntity
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("imageUrl")]
        public string ImageUrl { get; set; } = default!;

        [BsonElement("tags")]
        public List<string> Tags { get; set; } = new();

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("sortOrder")]
        public int SortOrder { get; set; } = 0;
    }
}
