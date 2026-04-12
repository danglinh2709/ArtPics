using MongoDB.Bson;
using System.Text.RegularExpressions;

namespace Application.Helpers
{
   
    public static class EditorStateIncomingNormalizer
    {
        public static void EnsureImageLayersHaveAssetId(BsonDocument editorStateRoot)
        {
            if (editorStateRoot is null || !editorStateRoot.Contains("pages"))
                return;
            if (!editorStateRoot["pages"].IsBsonArray)
                return;

            foreach (var pageEl in editorStateRoot["pages"].AsBsonArray)
            {
                if (!pageEl.IsBsonDocument)
                    continue;
                var page = pageEl.AsBsonDocument;
                if (!page.Contains("layers") || !page["layers"].IsBsonArray)
                    continue;

                foreach (var layerEl in page["layers"].AsBsonArray)
                {
                    if (!layerEl.IsBsonDocument)
                        continue;
                    var layer = layerEl.AsBsonDocument;
                    if (!layer.Contains("type") || !layer["type"].IsString)
                        continue;
                    var type = layer["type"].AsString;
                    if (type is not ("image" or "video" or "sticker" or "frameFill"))
                        continue;

                    var existing = TryGetContentAssetId(layer);
                    if (!string.IsNullOrWhiteSpace(existing))
                        continue;

                    string? uri = null;
                    if (layer.Contains("uri") && layer["uri"].IsString)
                        uri = layer["uri"].AsString;
                    else if (layer.Contains("Uri") && layer["Uri"].IsString)
                        uri = layer["Uri"].AsString;

                    var assetId = TryExtractAssetIdFromUri(uri);
                    if (string.IsNullOrWhiteSpace(assetId))
                        continue;

                    if (!layer.Contains("content") || !layer["content"].IsBsonDocument)
                        layer["content"] = new BsonDocument();

                    var content = layer["content"].AsBsonDocument;
                    content["assetId"] = assetId.Trim();
                    if (!content.Contains("fit"))
                        content["fit"] = "cover";
                }
                
            }
        }

        private static string? TryGetContentAssetId(BsonDocument layer)
        {
            if (!layer.Contains("content") || !layer["content"].IsBsonDocument)
                return null;
            var c = layer["content"].AsBsonDocument;
            if (!c.Contains("assetId"))
                return null;
            var v = c["assetId"];
            if (v.BsonType == BsonType.String)
                return v.AsString;
            if (v.BsonType == BsonType.ObjectId)
                return v.AsObjectId.ToString();
            return v.ToString()?.Trim();
        }

        private static string? TryExtractAssetIdFromUri(string? uri)
        {
            if (string.IsNullOrWhiteSpace(uri))
                return null;
            uri = uri.Trim();

            if (Guid.TryParse(uri, out _))
                return uri;

            if (IsLikelyMongoObjectId(uri))
                return uri;

            var m = Regex.Match(uri, @"/Asset/download/([^/?#]+)", RegexOptions.IgnoreCase);
            if (m.Success)
                return Uri.UnescapeDataString(m.Groups[1].Value.Trim());

            var seg = uri.Split('/')[^1];
            seg = seg.Split('?')[0].Split('#')[0].Trim();
            if (Guid.TryParse(seg, out _))
                return seg;
            if (IsLikelyMongoObjectId(seg))
                return seg;

            if (!uri.Contains("://", StringComparison.Ordinal)
                && !uri.StartsWith("file:", StringComparison.OrdinalIgnoreCase)
                && !uri.StartsWith("content:", StringComparison.OrdinalIgnoreCase)
                && !uri.StartsWith("data:", StringComparison.OrdinalIgnoreCase))
                return uri;

            return null;
        }

        private static bool IsLikelyMongoObjectId(string s) =>
            s.Length == 24 && Regex.IsMatch(s, @"^[a-f0-9]{24}$", RegexOptions.IgnoreCase);
    }
}
