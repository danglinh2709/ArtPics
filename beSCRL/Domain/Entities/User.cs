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
    public sealed class User : AuditableEntity
    {
        [BsonElement("email")]
        public string Email { get; set; } = default!;

        [BsonElement("displayName")]
        public string? DisplayName { get; set; }

        [BsonRepresentation(BsonType.String)]
        [BsonElement("role")]
        public UserRole Role { get; set; } = UserRole.User;

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("avatarUrl")]
        public string? AvatarUrl { get; set; }

        [BsonElement("lastLoginAt")]
        public DateTime? LastLoginAt { get; set; }
    }
}