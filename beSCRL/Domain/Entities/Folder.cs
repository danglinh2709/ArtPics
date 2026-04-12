using Domain.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Domain.Entities
{
    public sealed class Folder : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string UserId { get; set; } = default!;

        [BsonElement("name")]
        public string Name { get; set; } = default!;

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("projectIds")]
        public List<string> ProjectIds { get; set; } = new List<string>();
    }
}
