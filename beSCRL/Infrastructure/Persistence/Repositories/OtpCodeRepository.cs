using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class OtpCodeRepository : BaseRepository<OtpCode>, IOtpCodeRepository
    {
        public OtpCodeRepository(IMongoDatabase db) : base(db, CollectionNames.OtpCodes) 
        {
            
        }

        // lấy OTP hợp lệ theo Email + purpose
        public async Task<OtpCode?> GetValidOtpAsync(string email,  string purpose)
        {
            var now = DateTime.UtcNow;

            var filter = Builders<OtpCode>.Filter.And(
                Builders<OtpCode>.Filter.Eq(x => x.Email, email),
                Builders<OtpCode>.Filter.Eq(x => x.Purpose, purpose),
                Builders<OtpCode>.Filter.Gt(x => x.ExpiredAt, now),
                Builders<OtpCode>.Filter.Eq(x => x.UsedAt, null),
                Builders<OtpCode>.Filter.Eq(x => x.IsRevoked, false)
            );

            return await _collection
                .Find(filter)
                .SortByDescending(x => x.CreatedAt)
                .FirstOrDefaultAsync();
        }


        // vô hiệu hóa OTP chưa dùng hoặc chưa hết hạn => Update thành IsRevoked = true
        public async Task InvalidateAllByEmailAsync(string email, string purpose)
        {
            var filter = Builders<OtpCode>.Filter.And(
                Builders<OtpCode>.Filter.Eq(x => x.Email, email),
                Builders<OtpCode>.Filter.Eq(x => x.Purpose, purpose),
                Builders<OtpCode>.Filter.Eq(x => x.UsedAt, null),
                Builders<OtpCode>.Filter.Eq(x => x.IsRevoked, false)
            );

            var update = Builders<OtpCode>.Update
                .Set(x => x.IsRevoked, true)
                .Set(x => x.UpdatedAt, DateTime.UtcNow);

            await _collection.UpdateManyAsync(filter, update);
        }

        // đánh dấu OTP đã được dùng, có thể set UsedAt = DateTime.UtcNow
        public async Task MarkAsUsedAsync(string otpId)
        {
            var filter = Builders<OtpCode>.Filter.Eq(x => x.Id, otpId);

            var update = Builders<OtpCode>.Update
                .Set(x => x.UsedAt, DateTime.UtcNow)
                .Set(x => x.IsRevoked, true);

            await _collection.UpdateOneAsync(filter, update);
        }

    }
}
