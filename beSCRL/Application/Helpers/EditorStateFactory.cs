using Application.Common;
using MongoDB.Bson;

namespace Application.Helpers
{
    // factory class dùng để khởi tạo editor state mặc định cho trình chỉnh sửa thiết kế/nội dung
    /*
     có nhiệm vụ tạo ra một cấu trúc dữ liệu ban đầu hoàn chỉnh cho editor, like: 
            tạo bài post rỗng
            tạo story rỗng
            tạo carousel rỗng
            tạo state mới dựa trên template có sẵn
     */
    public static class EditorStateFactory
    {
        public static BsonDocument CreateEmptyPost(
            string title = "Untitled Post",
            int? documentWidth = null,
            int? documentHeight = null)
        {
            var width = documentWidth is > 0 ? documentWidth.Value : EditorConstants.InstagramPostWidth;
            var height = documentHeight is > 0 ? documentHeight.Value : EditorConstants.InstagramPostHeight;

            return CreateDocument(
                documentType: EditorConstants.TypePost,
                title: title,
                preset: EditorConstants.PresetInstagramPostPortrait,
                width: width,
                height: height,
                pageCount: 1);
        }

        public static BsonDocument CreateEmptyStory(string title = "Untitled Story")
        {
            return CreateDocument(
                documentType: EditorConstants.TypeStory,
                title: title,
                preset: EditorConstants.PresetInstagramStory,
                width: EditorConstants.InstagramStoryWidth,
                height: EditorConstants.InstagramStoryHeight,
                pageCount: 1);
        }

        public static BsonDocument CreateEmptyCarousel(int pageCount = 2, string title = "Untitled Carousel")
        {
            if (pageCount <= 0)
                pageCount = 1;

            return CreateDocument(
                documentType: EditorConstants.TypeCarousel,
                title: title,
                preset: EditorConstants.PresetInstagramCarouselPortrait,
                width: EditorConstants.InstagramCarouselWidth,
                height: EditorConstants.InstagramCarouselHeight,
                pageCount: pageCount);
        }

        private static BsonDocument CreateDocument(
            string documentType,
            string title,
            string preset,
            int width,
            int height,
            int pageCount)
        {
            var pages = new BsonArray();

            for (int i = 0; i < pageCount; i++)
            {
                pages.Add(CreateEmptyPage(i, width, height));
            }

            return new BsonDocument
            {
                { "schemaVersion", EditorConstants.SchemaVersion },
                {
                    "document", new BsonDocument
                    {
                        { "type", documentType },
                        { "title", title },
                        { "platform", EditorConstants.PlatformInstagram },
                        { "preset", preset },
                        { "width", width },
                        { "height", height },
                        { "unit", "px" },
                        { "dpi", 72 },
                        { "pageCount", pageCount },
                        {
                            "safeArea", new BsonDocument
                            {
                                { "top", 0 },
                                { "right", 0 },
                                { "bottom", 0 },
                                { "left", 0 }
                            }
                        }
                    }
                },
                { "pages", pages },
                { "assets", new BsonArray() },
                {
                    "presets", new BsonDocument
                    {
                        { "documentPreset", preset },
                        { "filterPresetId", BsonNull.Value },
                        { "effectPresetIds", new BsonArray() },
                        { "templatePresetId", BsonNull.Value }
                    }
                },
                {
                    "selection", new BsonDocument
                    {
                        { "currentPageId", "page_1" },
                        { "selectedLayerIds", new BsonArray() }
                    }
                },
                {
                    "viewport", new BsonDocument
                    {
                        { "zoom", 1 },
                        { "panX", 0 },
                        { "panY", 0 }
                    }
                },
                {
                    "preferences", new BsonDocument
                    {
                        { "showGrid", true },
                        { "snapToGrid", true },
                        { "showRulers", false },
                        { "showSafeArea", true },
                        { "lockGuides", false }
                    }
                },
                {
                    "timeline", new BsonDocument
                    {
                        { "enabled", false },
                        { "durationMs", 0 },
                        { "fps", 30 }
                    }
                },
                {
                    "meta", new BsonDocument
                    {
                        { "createdFrom", "blank" },
                        { "templateId", BsonNull.Value },
                        { "lastSavedAt", DateTime.UtcNow },
                        { "autosaveRevision", 0 }
                    }
                }
            };
        }

        private static BsonDocument CreateEmptyPage(int index, int width, int height)
        {
            return new BsonDocument
            {
                { "id", $"page_{index + 1}" },
                { "name", $"Page {index + 1}" },
                { "index", index },
                { "durationMs", 0 },
                {
                    "background", new BsonDocument
                    {
                        { "type", "color" },
                        { "color", "#FFFFFF" },
                        { "opacity", 1 }
                    }
                },
                {
                    "layout", new BsonDocument
                    {
                        { "templateId", BsonNull.Value },
                        { "layoutType", "free" },
                        { "frames", new BsonArray() }
                    }
                },
                { "layers", new BsonArray() }
            };
        }

        public static BsonDocument CreateFromTemplate(
            BsonDocument templateData,
            string? templateId = null,
            string createdFrom = "template")
        {
            var clone = templateData.DeepClone().AsBsonDocument;

            if (!clone.Contains("meta"))
            {
                clone["meta"] = new BsonDocument();
            }

            var meta = clone["meta"].AsBsonDocument;
            meta["createdFrom"] = createdFrom;
            meta["templateId"] = templateId is null ? BsonNull.Value : templateId;
            meta["lastSavedAt"] = DateTime.UtcNow;
            meta["autosaveRevision"] = 0;

            return clone;
        }
    }
}