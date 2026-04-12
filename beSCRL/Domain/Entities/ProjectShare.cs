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
    public sealed class ProjectShare : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("projectId")]
        public string ProjectId { get; set; } = default!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("ownerUserId")]
        public string OwnerUserId { get; set; } = default!;

        [BsonElement("sharedEmail")]
        public string SharedEmail { get; set; } = default!;

        [BsonElement("permission")]
        public string Permission { get; set; } = "view";

        [BsonElement("shareToken")]
        public string? ShareToken { get; set; }

        [BsonElement("expiredAt")]
        public DateTime? ExpiredAt { get; set; }
    }
}