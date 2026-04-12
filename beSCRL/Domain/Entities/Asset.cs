using Domain.Common;
using Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities
{
    public sealed class Asset : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string UserId { get; set; } = default!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("projectId")]
        public string? ProjectId { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("type")]
        public AssetType Type { get; set; }

        [BsonElement("fileName")]
        public string FileName { get; set; } = default!;

        [BsonElement("originalFileName")]
        public string? OriginalFileName { get; set; }

        [BsonElement("contentType")]
        public string? ContentType { get; set; }

        [BsonElement("extension")]
        public string? Extension { get; set; }

        [BsonElement("sizeBytes")]
        public long SizeBytes { get; set; }

        [BsonElement("storageKey")]
        public string StorageKey { get; set; } = default!;

        [BsonElement("url")]
        public string? Url { get; set; }

        [BsonElement("thumbnailUrl")]
        public string? ThumbnailUrl { get; set; }

        [BsonElement("width")]
        public int? Width { get; set; }

        [BsonElement("height")]
        public int? Height { get; set; }

        [BsonElement("durationSeconds")]
        public double? DurationSeconds { get; set; }

        [BsonElement("isDeleted")]
        public bool IsDeleted { get; set; } = false;
    }
}