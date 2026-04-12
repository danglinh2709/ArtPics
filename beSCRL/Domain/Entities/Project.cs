using Domain.Common;
using Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Domain.Entities
{
    public sealed class Project : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string UserId { get; set; } = default!;

        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("templateId")]
        public string? TemplateId { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("status")]
        public ProjectStatus Status { get; set; } = ProjectStatus.Draft;

        [BsonElement("currentVersion")]
        public int CurrentVersion { get; set; } = 1;

        [BsonElement("editorState")]
        public BsonDocument EditorState { get; set; } = new();

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("thumbnailAssetId")]
        public string? ThumbnailAssetId { get; set; }

        [BsonElement("lastOpenedAt")]
        public DateTime? LastOpenedAt { get; set; }

        [BsonElement("isStarred")]
        public bool IsStarred { get; set; } = false;

        [BsonElement("type")]
        public string Type { get; set; } = "post";
    }
}