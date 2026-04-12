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
    public sealed class OtpCode : AuditableEntity
    {
        [BsonElement("email")]
        public string Email { get; set; } = default!;


        [BsonElement("codeHash")]
        public string CodeHash { get; set; } = default!;

        [BsonElement("expiredAt")]
        public DateTime ExpiredAt { get; set; }

        [BsonElement("usedAt")]
        public DateTime? UsedAt { get; set; }

        [BsonElement("attemptCount")]
        public int AttemptCount { get; set; } = 0;

        [BsonElement("isRevoked")]
        public bool IsRevoked { get; set; } = false;

        [BsonElement("purpose")]
        public string Purpose { get; set; } = "login";
    }
}