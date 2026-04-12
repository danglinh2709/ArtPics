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
    public sealed class Effect : AuditableEntity
    {
        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonElement("category")]
        public string? Category { get; set; }

        [BsonElement("previewImageUrl")]
        public string? PreviewImageUrl { get; set; }

        [BsonElement("config")]
        public BsonDocument Config { get; set; } = new BsonDocument();

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("sortOrder")]
        public int SortOrder { get; set; } = 0;
    }
}