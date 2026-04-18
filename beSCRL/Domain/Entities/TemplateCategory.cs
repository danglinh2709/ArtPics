using Domain.Common;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities
{
    public class TemplateCategory : AuditableEntity
    {
        [BsonElement("code")]
        public string Code { get; set; } = default!;

        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("sortOrder")]
        public int SortOrder { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("coverImageUrl")]
        public string? CoverImageUrl { get; set; }

        [BsonElement("isFeatured")]
        public bool IsFeatured { get; set; }
    }
}