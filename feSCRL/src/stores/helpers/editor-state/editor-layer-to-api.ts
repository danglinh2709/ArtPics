import { ILayer } from "@/src/types/editor.types";
import { extractAssetIdFromUri, isMediaLayerType } from "./editor-layer-asset";

export function mapEditorLayerToApi(
  layer: ILayer,
): Record<string, unknown> | null {
  if (!isMediaLayerType(layer.type)) {
    return { ...(layer as object) } as Record<string, unknown>;
  }

  const assetId = layer.assetId || extractAssetIdFromUri(layer.uri);

  // If we have an assetId, wrap in content object for backend
  if (assetId) {
    return {
      ...(layer as unknown as Record<string, unknown>),
      content: {
        assetId,
        fit: "cover",
      },
    };
  }

  // Support legacy 'url' field from templates
  const anyLayer = layer as any;
  const legacyUrl = anyLayer.url || anyLayer.Url;

  // Preserve external URLs (templates)
  if (layer.uri || legacyUrl) {
    return {
      ...(layer as unknown as Record<string, unknown>),
      url: layer.uri || legacyUrl,
    };
  }

  // Default to spread for other types
  return { ...(layer as object) } as Record<string, unknown>;
}

export function mapLayersToApi(layers: ILayer[]): Record<string, unknown>[] {
  return layers
    .map((layer) => mapEditorLayerToApi(layer))
    .filter((layer): layer is Record<string, unknown> => layer !== null);
}
