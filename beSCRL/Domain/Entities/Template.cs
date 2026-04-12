using Domain.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public sealed class Template : AuditableEntity
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; }

        [BsonElement("previewImageUrl")]
        public string? PreviewImageUrl { get; set; }

        [BsonElement("thumbnailUrl")]
        public string? ThumbnailUrl { get; set; }

        [BsonElement("templateData")]
        public BsonDocument TemplateData { get; set; } = new BsonDocument();

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("sortOrder")]
        public int SortOrder { get; set; } = 0;

        [BsonElement("tags")]
        public List<string> Tags { get; set; } = new();
        
        [BsonElement("isDefault")]
        public bool IsDefault { get; set; } = false;
    }
}