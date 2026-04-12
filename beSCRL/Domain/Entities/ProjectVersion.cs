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
    /* ProjectVersion: b?n snapshot/version c?a project
       vd:  version 1: layout g?c
            version 2: thêm text
            version 3: ??i ?nh n?n
     */
    public sealed class ProjectVersion : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("projectId")]
        public string ProjectId { get; set; } = default!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string UserId { get; set; } = default!;

        [BsonElement("versionNumber")]
        public int VersionNumber { get; set; }

        [BsonElement("editorState")]
        public BsonDocument EditorState { get; set; } = new BsonDocument();

        [BsonElement("note")]
        public string? Note { get; set; }
    }
}