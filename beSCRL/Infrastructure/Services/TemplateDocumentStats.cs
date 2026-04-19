using Domain.Entities;
using MongoDB.Bson;

namespace Infrastructure.Services;

// Đọc kích thước / số trang / số layer ảnh từ TemplateData BSON 
internal static class TemplateDocumentStats
{
    public sealed record Stats(
        int Width,
        int Height,
        int PageCount,
        int ImageLayerCount,
        string AspectKey);

    public static Stats FromTemplate(Template t)
    {
        var fromDoc = TryParseDocument(t.TemplateData);
        var width = fromDoc.Width;
        var height = fromDoc.Height;
        var pageCount = fromDoc.PageCount;
        var imageCount = CountImageLayers(t.TemplateData);
        if (imageCount <= 0)
            imageCount = fromDoc.FallbackImageCount;

        var aspectKey = ResolveAspectKey(null, width, height);
        return new Stats(width, height, pageCount, imageCount, aspectKey);
    }

    private static (int Width, int Height, int PageCount, int FallbackImageCount) TryParseDocument(BsonDocument? root)
    {
        if (root == null || !root.Contains("document"))
            return (0, 0, 0, 0);

        var doc = root["document"].AsBsonDocument;
        var w = ReadPositiveInt(doc, "width");
        var h = ReadPositiveInt(doc, "height");
        var pc = doc.TryGetValue("pageCount", out var pEl) && pEl.IsInt32 ? pEl.AsInt32 : 0;
        if (pc <= 0 && root.Contains("pages") && root["pages"].IsBsonArray)
            pc = root["pages"].AsBsonArray.Count;

        return (w, h, pc, 0);
    }

    private static int ReadPositiveInt(BsonDocument doc, string name)
    {
        if (!doc.TryGetValue(name, out var el)) return 0;
        if (el.IsInt32) return el.AsInt32;
        if (el.IsInt64) return (int)el.AsInt64;
        if (el.IsDouble) return (int)el.AsDouble;
        return 0;
    }

    private static int CountImageLayers(BsonDocument? root)
    {
        if (root == null || !root.Contains("pages") || !root["pages"].IsBsonArray)
            return 0;

        var n = 0;
        foreach (var page in root["pages"].AsBsonArray)
        {
            if (!page.IsBsonDocument || !page.AsBsonDocument.Contains("layers"))
                continue;
            var layers = page.AsBsonDocument["layers"];
            if (!layers.IsBsonArray) continue;
            foreach (var layer in layers.AsBsonArray)
            {
                if (!layer.IsBsonDocument) continue;
                var ld = layer.AsBsonDocument;
                if (!ld.TryGetValue("type", out var typeEl) || !typeEl.IsString)
                    continue;
                if (typeEl.AsString.Equals("image", StringComparison.OrdinalIgnoreCase))
                    n++;
            }
        }

        return n;
    }

    private static string ResolveAspectKey(string? entityAspect, int w, int h)
    {
        if (!string.IsNullOrWhiteSpace(entityAspect))
        {
            var a = entityAspect.Trim().ToLowerInvariant();
            if (a is "portrait" or "story" or "square" or "landscape")
                return a;
        }

        if (w <= 0 || h <= 0)
            return "square";

        var ratio = w / (double)h;
        // 9:16 ≈ 0.5625
        if (ratio is >= 0.52 and <= 0.62)
            return "story";
        if (ratio < 0.9)
            return "portrait";
        if (ratio > 1.12)
            return "landscape";
        return "square";
    }
}
