using Domain.Common;
using Domain.Enums;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{

    // ExportJob: job xu?t ?nh/video n?n
    public sealed class ExportJob : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("projectId")]
        public string ProjectId { get; set; } = default!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string UserId { get; set; } = default!;

        [BsonRepresentation(BsonType.String)]
        [BsonElement("status")]
        public ExportJobStatus Status { get; set; } = ExportJobStatus.Pending;

        [BsonElement("options")]
        public BsonDocument Options { get; set; } = new BsonDocument();

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("resultAssetId")]
        public string? ResultAssetId { get; set; }

        [BsonElement("errorMessage")]
        public string? ErrorMessage { get; set; }

        [BsonElement("startedAt")]
        public DateTime? StartedAt { get; set; }

        [BsonElement("completedAt")]
        public DateTime? CompletedAt { get; set; }
    }
}