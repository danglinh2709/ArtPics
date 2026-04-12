using Application.Common;
using MongoDB.Bson;

namespace Application.Helpers
{
    public static class EditorStateValidator
    {
        public static void Validate(BsonDocument editorState)
        {
            if (editorState == null || editorState.ElementCount == 0)
                throw new ArgumentException("EditorState is required.");

            ValidateRoot(editorState);
            ValidateDocument(editorState["document"].AsBsonDocument);
            ValidatePages(editorState["pages"].AsBsonArray, editorState["document"].AsBsonDocument);
            ValidateOptionalSections(editorState);
        }

        private static void ValidateRoot(BsonDocument root)
        {

            RequireField(root, "schemaVersion");
            RequireField(root, "document");
            RequireField(root, "pages");

            if (!root["schemaVersion"].IsInt32 && !root["schemaVersion"].IsInt64)
                throw new ArgumentException("schemaVersion must be a number.");

            var schemaVersion = root["schemaVersion"].ToInt32();
            if (schemaVersion <= 0)
                throw new ArgumentException("schemaVersion must be greater than 0.");

            if (!root["document"].IsBsonDocument)
                throw new ArgumentException("document must be an object.");

            if (!root["pages"].IsBsonArray)
                throw new ArgumentException("pages must be an array.");
        }
        

        private static void ValidateDocument(BsonDocument document)
        {
            RequireField(document, "type");
            RequireField(document, "title");
            RequireField(document, "width");
            RequireField(document, "height");
            RequireField(document, "pageCount");

            var type = document["type"].AsString;
            var allowedTypes = new[]
            {
                EditorConstants.TypePost,
                EditorConstants.TypeStory,
                EditorConstants.TypeCarousel
            };

            if (!allowedTypes.Contains(type))
                throw new ArgumentException("document.type is invalid.");

            var width = document["width"].ToInt32();
            var height = document["height"].ToInt32();
            var pageCount = document["pageCount"].ToInt32();

            if (width <= 0)
                throw new ArgumentException("document.width must be greater than 0.");

            if (height <= 0)
                throw new ArgumentException("document.height must be greater than 0.");

            if (pageCount <= 0)
                throw new ArgumentException("document.pageCount must be greater than 0.");
        }

        private static void ValidatePages(BsonArray pages, BsonDocument document)
        {
            if (pages.Count == 0)
                throw new ArgumentException("pages must not be empty.");

            var expectedPageCount = document["pageCount"].ToInt32();

            if (pages.Count != expectedPageCount)
                throw new ArgumentException("document.pageCount does not match pages length.");

            var pageIds = new HashSet<string>();

            for (int i = 0; i < pages.Count; i++)
            {
                if (!pages[i].IsBsonDocument)
                    throw new ArgumentException($"pages[{i}] must be an object.");

                var page = pages[i].AsBsonDocument;

                RequireField(page, "id");
                RequireField(page, "name");
                RequireField(page, "index");
                RequireField(page, "background");
                RequireField(page, "layout");
                RequireField(page, "layers");

                var pageId = page["id"].AsString;
                if (string.IsNullOrWhiteSpace(pageId))
                    throw new ArgumentException($"pages[{i}].id is required.");

                if (!pageIds.Add(pageId))
                    throw new ArgumentException($"Duplicate page id: {pageId}");

                if (page["index"].ToInt32() < 0)
                    throw new ArgumentException($"pages[{i}].index must be >= 0.");

                if (!page["background"].IsBsonDocument)
                    throw new ArgumentException($"pages[{i}].background must be an object.");

                if (!page["layout"].IsBsonDocument)
                    throw new ArgumentException($"pages[{i}].layout must be an object.");

                if (!page["layers"].IsBsonArray)
                    throw new ArgumentException($"pages[{i}].layers must be an array.");

                ValidateBackground(page["background"].AsBsonDocument, i);
                ValidateLayout(page["layout"].AsBsonDocument, i);
                ValidateLayers(page["layers"].AsBsonArray, i);
            }
        }

        private static void ValidateBackground(BsonDocument background, int pageIndex)
        {
            RequireField(background, "type");

            var type = background["type"].AsString;
            var allowed = new[] { "color", "image", "gradient", "video", "transparent" };

            if (!allowed.Contains(type))
                throw new ArgumentException($"pages[{pageIndex}].background.type is invalid.");

            if (type == "color")
            {
                RequireField(background, "color");
            }

            if (type == "image" || type == "video")
            {
                RequireField(background, "assetId");
            }
        }

        private static void ValidateLayout(BsonDocument layout, int pageIndex)
        {
            RequireField(layout, "layoutType");
            RequireField(layout, "frames");

            if (!layout["frames"].IsBsonArray)
                throw new ArgumentException($"pages[{pageIndex}].layout.frames must be an array.");

            var frames = layout["frames"].AsBsonArray;
            var frameIds = new HashSet<string>();

            for (int i = 0; i < frames.Count; i++)
            {
                if (!frames[i].IsBsonDocument)
                    throw new ArgumentException($"pages[{pageIndex}].layout.frames[{i}] must be an object.");

                var frame = frames[i].AsBsonDocument;

                RequireField(frame, "id");
                RequireField(frame, "x");
                RequireField(frame, "y");
                RequireField(frame, "width");
                RequireField(frame, "height");

                var frameId = frame["id"].AsString;
                if (!frameIds.Add(frameId))
                    throw new ArgumentException($"Duplicate frame id: {frameId}");

                if (frame["width"].ToDouble() < 0 || frame["height"].ToDouble() < 0)
                    throw new ArgumentException($"pages[{pageIndex}].layout.frames[{i}] width/height must be >= 0.");
            }
        }

        private static void ValidateLayers(BsonArray layers, int pageIndex)
        {
            var layerIds = new HashSet<string>();

            for (int i = 0; i < layers.Count; i++)
            {
                if (!layers[i].IsBsonDocument)
                    throw new ArgumentException($"pages[{pageIndex}].layers[{i}] must be an object.");

                var layer = layers[i].AsBsonDocument;

                RequireField(layer, "id");
                RequireField(layer, "type");
                RequireField(layer, "transform");

                var layerId = layer["id"].AsString;
                if (string.IsNullOrWhiteSpace(layerId))
                    throw new ArgumentException($"pages[{pageIndex}].layers[{i}].id is required.");

                if (!layerIds.Add(layerId))
                    throw new ArgumentException($"Duplicate layer id: {layerId}");

                if (!layer["transform"].IsBsonDocument)
                    throw new ArgumentException($"pages[{pageIndex}].layers[{i}].transform must be an object.");

                ValidateTransform(layer["transform"].AsBsonDocument, pageIndex, i);
                ValidateLayerByType(layer, pageIndex, i);
            }
        }

        private static void ValidateTransform(BsonDocument transform, int pageIndex, int layerIndex)
        {
            RequireField(transform, "x");
            RequireField(transform, "y");
            RequireField(transform, "width");
            RequireField(transform, "height");

            if (transform["width"].ToDouble() < 0)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].transform.width must be >= 0.");

            if (transform["height"].ToDouble() < 0)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].transform.height must be >= 0.");
        }

        private static void ValidateLayerByType(BsonDocument layer, int pageIndex, int layerIndex)
        {
            var type = layer["type"].AsString;

            switch (type)
            {
                case "text":
                    ValidateTextLayer(layer, pageIndex, layerIndex);
                    break;

                case "image":
                case "video":
                case "sticker":
                case "frameFill":
                    ValidateAssetLayer(layer, pageIndex, layerIndex);
                    break;

                case "shape":
                    ValidateShapeLayer(layer, pageIndex, layerIndex);
                    break;

                case "group":
                    ValidateGroupLayer(layer, pageIndex, layerIndex);
                    break;

                default:
                    throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].type is invalid.");
            }
        }

        private static void ValidateTextLayer(BsonDocument layer, int pageIndex, int layerIndex)
        {
            RequireField(layer, "content");

            if (!layer["content"].IsBsonDocument)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content must be an object.");

            var content = layer["content"].AsBsonDocument;
            RequireField(content, "text");

            if (string.IsNullOrWhiteSpace(content["text"].AsString))
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content.text is required.");
        }

        private static void ValidateAssetLayer(BsonDocument layer, int pageIndex, int layerIndex)
        {
            RequireField(layer, "content");

            if (!layer["content"].IsBsonDocument)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content must be an object.");

            var content = layer["content"].AsBsonDocument;
            RequireField(content, "assetId");

            if (string.IsNullOrWhiteSpace(content["assetId"].AsString))
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content.assetId is required.");
        }

        private static void ValidateShapeLayer(BsonDocument layer, int pageIndex, int layerIndex)
        {
            RequireField(layer, "content");

            if (!layer["content"].IsBsonDocument)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content must be an object.");

            var content = layer["content"].AsBsonDocument;
            RequireField(content, "shapeType");
        }

        private static void ValidateGroupLayer(BsonDocument layer, int pageIndex, int layerIndex)
        {
            RequireField(layer, "content");

            if (!layer["content"].IsBsonDocument)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content must be an object.");

            var content = layer["content"].AsBsonDocument;
            RequireField(content, "children");

            if (!content["children"].IsBsonArray)
                throw new ArgumentException($"pages[{pageIndex}].layers[{layerIndex}].content.children must be an array.");
        }

        private static void ValidateOptionalSections(BsonDocument root)
        {
            if (root.Contains("assets") && !root["assets"].IsBsonArray)
                throw new ArgumentException("assets must be an array.");

            if (root.Contains("selection") && !root["selection"].IsBsonDocument)
                throw new ArgumentException("selection must be an object.");

            if (root.Contains("viewport") && !root["viewport"].IsBsonDocument)
                throw new ArgumentException("viewport must be an object.");

            if (root.Contains("preferences") && !root["preferences"].IsBsonDocument)
                throw new ArgumentException("preferences must be an object.");

            if (root.Contains("timeline") && !root["timeline"].IsBsonDocument)
                throw new ArgumentException("timeline must be an object.");

            if (root.Contains("meta") && !root["meta"].IsBsonDocument)
                throw new ArgumentException("meta must be an object.");
        }

        private static void RequireField(BsonDocument document, string fieldName)
        {
            if (!document.Contains(fieldName))
                throw new ArgumentException($"Missing required field: {fieldName}");
        }
    }
}