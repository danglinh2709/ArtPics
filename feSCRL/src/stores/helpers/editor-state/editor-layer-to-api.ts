import { ILayer } from "@/src/types/editor.types";
import { extractAssetIdFromUri, isMediaLayerType } from "./editor-layer-asset";

export function mapEditorLayerToApi(
  layer: ILayer,
): Record<string, unknown> | null {
  if (!isMediaLayerType(layer.type)) {
    return { ...(layer as object) } as Record<string, unknown>;
  }

  const assetId = layer.assetId || extractAssetIdFromUri(layer.uri);

  if (!assetId) {
    return null;
  }

  return {
    ...(layer as unknown as Record<string, unknown>),
    content: {
      assetId,
      fit: "cover",
    },
  };
}

export function mapLayersToApi(layers: ILayer[]): Record<string, unknown>[] {
  return layers
    .map((layer) => mapEditorLayerToApi(layer))
    .filter((layer): layer is Record<string, unknown> => layer !== null);
}
