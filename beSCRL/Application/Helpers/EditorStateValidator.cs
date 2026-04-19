using Application.Common;
using MongoDB.Bson;

namespace Application.Helpers
{
    // Validates an editorState BsonDocument before persisting.
    // Designed to be permissive for template-sourced data while still
    // catching structural errors (wrong types, missing critical ids,...).
    public static class EditorStateValidator
    {
        public static void Validate(BsonDocument editorState)
        {
            if (editorState == null || editorState.ElementCount == 0)
                throw new ArgumentException("EditorState is required.");

            ValidateRoot(editorState);

            var document = GetField(editorState, "document")!.AsBsonDocument;
            var pages = GetField(editorState, "pages")!.AsBsonArray;

            ValidateDocument(document);
            ValidatePages(pages, document);
        }

        // Root
        private static void ValidateRoot(BsonDocument root)
        {
            RequireField(root, "schemaVersion");
            RequireField(root, "document");
            RequireField(root, "pages");

            var schemaV = GetField(root, "schemaVersion")!;
            // Accept int, long, double or numeric-string
            double schemaNum;
            if (schemaV.IsInt32) schemaNum = schemaV.AsInt32;
            else if (schemaV.IsInt64) schemaNum = schemaV.AsInt64;
            else if (schemaV.IsDouble) schemaNum = schemaV.AsDouble;
            else if (schemaV.IsString && double.TryParse(schemaV.AsString, out var parsed)) schemaNum = parsed;
            else throw new ArgumentException("schemaVersion must be a number.");

            if (schemaNum <= 0)
                throw new ArgumentException("schemaVersion must be greater than 0.");

            if (!GetField(root, "document")!.IsBsonDocument)
                throw new ArgumentException("document must be an object.");

            if (!GetField(root, "pages")!.IsBsonArray)
                throw new ArgumentException("pages must be an array.");
        }

        // Document
        private static void ValidateDocument(BsonDocument document)
        {
            RequireField(document, "type");
            RequireField(document, "width");
            RequireField(document, "height");
            RequireField(document, "pageCount");

            var type = GetField(document, "type")!.AsString;
            var allowedTypes = new[] { EditorConstants.TypePost, EditorConstants.TypeStory, EditorConstants.TypeCarousel };
            if (!allowedTypes.Contains(type))
                throw new ArgumentException($"document.type '{type}' is invalid.");

            var width = GetField(document, "width")!.ToDouble();
            var height = GetField(document, "height")!.ToDouble();
            var pageCount = GetField(document, "pageCount")!.ToInt32();

            if (width <= 0) throw new ArgumentException("document.width must be > 0.");
            if (height <= 0) throw new ArgumentException("document.height must be > 0.");
            if (pageCount <= 0) throw new ArgumentException("document.pageCount must be > 0.");
        }

        // Pages
        private static void ValidatePages(BsonArray pages, BsonDocument document)
        {
            if (pages.Count == 0)
                throw new ArgumentException("pages must not be empty.");

            var expectedPageCount = GetField(document, "pageCount")!.ToInt32();
            if (pages.Count != expectedPageCount)
                throw new ArgumentException($"document.pageCount ({expectedPageCount}) does not match pages array length ({pages.Count}).");

            var pageIds = new HashSet<string>();

            for (int i = 0; i < pages.Count; i++)
            {
                if (!pages[i].IsBsonDocument)
                    throw new ArgumentException($"pages[{i}] must be an object.");

                var page = pages[i].AsBsonDocument;

                RequireField(page, "id");
                RequireField(page, "layers");

                var pageId = GetField(page, "id")!.AsString;
                if (string.IsNullOrWhiteSpace(pageId))
                    throw new ArgumentException($"pages[{i}].id is required.");
                if (!pageIds.Add(pageId))
                    throw new ArgumentException($"Duplicate page id: {pageId}");

                // background is optional for template pages
                var bgField = GetField(page, "background");
                if (bgField != null && bgField.IsBsonDocument)
                    ValidateBackground(bgField.AsBsonDocument, i);

                // layout is optional
                var layoutField = GetField(page, "layout");
                if (layoutField != null && layoutField.IsBsonDocument)
                    ValidateLayout(layoutField.AsBsonDocument, i);

                var layersField = GetField(page, "layers")!;
                if (!layersField.IsBsonArray)
                    throw new ArgumentException($"pages[{i}].layers must be an array.");

                ValidateLayers(layersField.AsBsonArray, i);
            }
        }

        // Background
        private static void ValidateBackground(BsonDocument background, int pageIndex)
        {
            var typeField = GetField(background, "type");
            if (typeField == null || !typeField.IsString) return; // permissive

            var type = typeField.AsString;
            var allowed = new[] { "color", "image", "gradient", "video", "transparent", "texture" };
            if (!allowed.Contains(type))
                throw new ArgumentException($"pages[{pageIndex}].background.type '{type}' is invalid.");

            if (type == "texture")
            {
                var uriField = GetField(background, "textureUri");
                if (uriField == null || !uriField.IsString || string.IsNullOrWhiteSpace(uriField.AsString))
                    throw new ArgumentException($"pages[{pageIndex}].background.textureUri is required for texture type.");
            }
        }

        // Layout (optional)
        private static void ValidateLayout(BsonDocument layout, int pageIndex)
        {
            var framesField = GetField(layout, "frames");
            if (framesField == null || !framesField.IsBsonArray) return; // permissive

            var frames = framesField.AsBsonArray;
            var frameIds = new HashSet<string>();

            for (int i = 0; i < frames.Count; i++)
            {
                if (!frames[i].IsBsonDocument) continue;
                var frame = frames[i].AsBsonDocument;

                var idField = GetField(frame, "id");
                if (idField == null || !idField.IsString) continue;

                if (!frameIds.Add(idField.AsString))
                    throw new ArgumentException($"Duplicate frame id: {idField.AsString}");
            }
        }

        // Layers
        private static void ValidateLayers(BsonArray layers, int pageIndex)
        {
            var layerIds = new HashSet<string>();

            for (int i = 0; i < layers.Count; i++)
            {
                if (!layers[i].IsBsonDocument) continue;

                var layer = layers[i].AsBsonDocument;

                var idField = GetField(layer, "id");
                if (idField == null || !idField.IsString || string.IsNullOrWhiteSpace(idField.AsString))
                    throw new ArgumentException($"pages[{pageIndex}].layers[{i}].id is required.");

                var layerId = idField.AsString;
                if (!layerIds.Add(layerId))
                    throw new ArgumentException($"Duplicate layer id: {layerId}");

                var typeField = GetField(layer, "type");
                if (typeField == null || !typeField.IsString) continue;

                var type = typeField.AsString;
                ValidateLayerByType(type, layer, pageIndex, i);
            }
        }

        // Layer type dispatch
        private static void ValidateLayerByType(string type, BsonDocument layer, int pageIndex, int layerIndex)
        {
            switch (type)
            {
                case "image":
                case "video":
                case "sticker":
                case "frameFill":
                    ValidateAssetLayer(layer, pageIndex, layerIndex);
                    break;

                case "text":
                    // text layers: just need to exist — content validation is permissive
                    break;

                case "shape":
                case "group":
                case "image-text":
                    // permissive — no strict content requirements
                    break;

                // unknown types are allowed — don't throw, just skip
                default:
                    break;
            }
        }

        // Asset layer — permissive: any one of url / uri / assetId / content.assetId
        private static void ValidateAssetLayer(BsonDocument layer, int pageIndex, int layerIndex)
        {
            // 1. Has flat 'url' field
            var urlField = GetField(layer, "url");
            if (urlField != null && urlField.IsString) return;

            // 2. Has flat 'uri' field
            var uriField = GetField(layer, "uri");
            if (uriField != null && uriField.IsString && !string.IsNullOrWhiteSpace(uriField.AsString)) return;

            // 3. Has flat 'assetId' field
            var flatAssetId = GetField(layer, "assetId");
            if (flatAssetId != null && flatAssetId.IsString && !string.IsNullOrWhiteSpace(flatAssetId.AsString)) return;

            // 4. Has content.assetId
            var contentField = GetField(layer, "content");
            if (contentField != null && contentField.IsBsonDocument)
            {
                var assetIdInContent = GetField(contentField.AsBsonDocument, "assetId");
                if (assetIdInContent != null && assetIdInContent.IsString && !string.IsNullOrWhiteSpace(assetIdInContent.AsString)) return;
            }

            // 5. Everything missing — permissive: just skip without throwing
            // This handles edge cases like newly-created template frames with no image yet
        }

        // Helpers

        // Require a field to exist in the document (case-insensitive across camelCase / PascalCase / lowercase).
        private static void RequireField(BsonDocument document, string fieldName)
        {
            if (FindKey(document, fieldName) == null)
                throw new ArgumentException($"Missing required field: {fieldName}");
        }

        // Get a field value using case-insensitive lookup. Returns null if not found.
        private static BsonValue? GetField(BsonDocument document, string fieldName)
        {
            var key = FindKey(document, fieldName);
            return key != null ? document[key] : null;
        }

        // Find the actual key name in the document that matches fieldName (case-insensitive).
        // Returns null if not found.
        private static string? FindKey(BsonDocument document, string fieldName)
        {
            // Exact match first (most common)
            if (document.Contains(fieldName)) return fieldName;

            // PascalCase
            var pascal = char.ToUpperInvariant(fieldName[0]) + fieldName[1..];
            if (document.Contains(pascal)) return pascal;

            // lowercase
            var lower = fieldName.ToLowerInvariant();
            if (document.Contains(lower)) return lower;

            // Full scan (handles any other casing)
            foreach (var element in document.Elements)
            {
                if (string.Equals(element.Name, fieldName, StringComparison.OrdinalIgnoreCase))
                    return element.Name;
            }

            return null;
        }
    }
}