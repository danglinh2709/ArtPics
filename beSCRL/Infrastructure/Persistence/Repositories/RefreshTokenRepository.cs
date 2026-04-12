using Application.Abstractions.Persistence;
using Domain.Entities;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Persistence.Repositories
{
    public class RefreshTokenRepository : BaseRepository<RefreshToken>, IRefreshTokenRepository
    {
        public RefreshTokenRepository(IMongoDatabase db) : base(db, CollectionNames.RefreshTokens)
        {
        }

        // Tìm refresh token theo hash, không quan tâm còn hạn hay đã revoke chưa
        // => use when tra cứu raw record
        public async Task<RefreshToken?> GetByTokenHashAsync(string tokenHash)
        {
            var filter = Builders<RefreshToken>.Filter.Eq(x => x.TokenHash, tokenHash);

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        // Tìm refresh token còn dùng được: đúng tokenHash, ExpiredAt > now, Revoked == null
        // => use when client gửi refresh token để xin access token mới
        public async Task<RefreshToken?> GetActiveByTokenHashAsync(string tokenHash)
        {
            var now = DateTime.UtcNow;

            var filter = Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(x => x.TokenHash, tokenHash),
                Builders<RefreshToken>.Filter.Gt(x => x.ExpiredAt, now),
                Builders<RefreshToken>.Filter.Eq(x => x.RevokedAt, null)
            );

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        // Lấy tất cả refresh token còn hoạt động của 1 user
        // => use when: hiển thị danh sách device đang đăng nhập, logout all devices
        public async Task<IEnumerable<RefreshToken>> GetActiveByUserIdAsync(string userId)
        {
            var now = DateTime.UtcNow;

            var filter = Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(x => x.UserId, userId),
                Builders<RefreshToken>.Filter.Gt(x => x.ExpiredAt, now),
                Builders<RefreshToken>.Filter.Eq(x => x.RevokedAt, null)
            );

            return await _collection.Find(filter).ToListAsync();
        }

        // Lấy token active theo userId + deviceId
        // => use when: mỗi thiết bị chỉ có 1 refresh token active, login lại trên cùng thiết bị thì revoke token cũ
        public async Task<RefreshToken?> GetActiveByUserIdAndDeviceIdAsync(string userId, string deviceId)
        {
            var now = DateTime.UtcNow;

            var filter = Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(x => x.UserId, userId),
                Builders<RefreshToken>.Filter.Eq(x => x.DeviceId, deviceId),
                Builders<RefreshToken>.Filter.Gt(x => x.ExpiredAt, now),
                Builders<RefreshToken>.Filter.Eq(x => x.RevokedAt, null)
            );

            return await _collection.Find(filter).FirstOrDefaultAsync();
        }

        // Thu hồi 1 token theo tokenId
        // => use when: logout 1 thiết bị, rotate(thay phien) refresh token
        public async Task RevokeAsync(string tokenId, string? reason = null)
        {
            var filter = Builders<RefreshToken>.Filter.Eq(x => x.Id, tokenId);

            var update = Builders<RefreshToken>.Update
                .Set(x => x.RevokedAt, DateTime.UtcNow)
                .Set(x => x.RevokeReason, reason);

            await _collection.UpdateOneAsync(filter, update);
        }

        // Thu hồi toàn bộ refresh token của user
        // => logout all devices, phát hiện tài khoản bất thường
        public async Task RevokeAllByUserIdAsync(string userId, string? reason = null)
        {
            var filter = Builders<RefreshToken>.Filter.And(
                Builders<RefreshToken>.Filter.Eq(x => x.UserId, userId),
                Builders<RefreshToken>.Filter.Eq(x => x.RevokedAt, null)
            );

            var update = Builders<RefreshToken>.Update
                .Set(x => x.RevokedAt, DateTime.UtcNow)
                .Set(x => x.RevokeReason, reason);

            await _collection.UpdateManyAsync(filter, update);
        }
    }
}
