using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common
{
    public abstract class AuditableEntity
    {
        // đánh dấu trường Id là khóa chính
        [BsonId]
        //chỉ định kiểu bson dùng để lưu 
        [BsonRepresentation(BsonType.ObjectId)] 
        public string Id { get; set; } = default!;

        // đổi tên field khi lưu xg mongodb
        [BsonElement("createdAt")] 
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
