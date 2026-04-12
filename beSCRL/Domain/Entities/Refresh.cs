using Domain.Common;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace Domain.Entities
{
    public sealed class RefreshToken : AuditableEntity
    {
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("userId")]
        public string UserId { get; set; } = default!;

        [BsonElement("tokenHash")]
        public string TokenHash { get; set; } = default!;

        [BsonElement("deviceId")]
        public string? DeviceId { get; set; }

        [BsonElement("deviceName")]
        public string? DeviceName { get; set; }

        [BsonElement("ipAddress")]
        public string? IpAddress { get; set; }

        [BsonElement("expiredAt")]
        public DateTime ExpiredAt { get; set; }

        [BsonElement("revokedAt")]
        public DateTime? RevokedAt { get; set; }

        [BsonElement("revokeReason")]
        public string? RevokeReason { get; set; }
    }
}