import { ILayer } from "@/src/types/editor.types";
import { getApiBaseUrl } from "../api.utils";
import { normalizeToArray } from "./editor-state-array";

const defaultCrop = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  rotation: 0,
  aspectRatio: null as number | null,
};

const defaultStyle = {
  opacity: 1,
  borderRadius: 0,
  individualCorners: null as ILayer["style"]["individualCorners"],
  border: null as ILayer["style"]["border"],
};

const defaultAdjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  sharpen: 0,
};

function num(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function mapEditorLayerFromApi(raw: any): ILayer {
  const transform = raw?.transform ?? raw?.Transform ?? {};

  const mappedTransform = {
    x: num(transform.x, 0),
    y: num(transform.y, 0),
    width: num(transform.width, 100),
    height: num(transform.height, 100),
    rotation: num(transform.rotation, 0),
    flipX: Boolean(transform.flipX),
    flipY: Boolean(transform.flipY),
    zIndex: num(transform.zIndex, 0),
  };

  const type = ((raw?.type ?? raw?.Type) as ILayer["type"]) || "image";

  const content = raw?.content ?? raw?.Content;
  const assetIdFromContent =
    content &&
    typeof content === "object" &&
    (content.assetId ?? content.AssetId);

  const apiBaseUrl = getApiBaseUrl();

  const uriRaw =
    typeof raw?.uri === "string"
      ? raw.uri
      : assetIdFromContent != null
        ? String(assetIdFromContent)
        : "";

  let finalUri = uriRaw;
  const finalAssetId = assetIdFromContent ? String(assetIdFromContent) : null;

  const isTextLayer = type === "text";
  const isAbsoluteUri =
    finalUri.startsWith("http") ||
    finalUri.startsWith("file") ||
    finalUri.startsWith("data") ||
    finalUri.startsWith("content");

  if (!isTextLayer && finalAssetId && !isAbsoluteUri) {
    finalUri = `${apiBaseUrl}/Asset/download/${finalAssetId}`;
  }

  const crop = raw?.crop ? { ...defaultCrop, ...raw.crop } : { ...defaultCrop };

  const style = raw?.style
    ? { ...defaultStyle, ...raw.style }
    : { ...defaultStyle };

  const adjustments = raw?.adjustments
    ? { ...defaultAdjustments, ...raw.adjustments }
    : { ...defaultAdjustments };

  return {
    id: String(raw?.id ?? ""),
    type,
    uri: finalUri,
    assetId: finalAssetId,
    transform: mappedTransform,
    crop,
    style,
    adjustments,
    isLocked: Boolean(raw?.isLocked),
    isVisible: raw?.isVisible !== false,
  };
}

export function mapLayersFromApi(rawLayers: unknown): ILayer[] {
  const arr = normalizeToArray(rawLayers);
  return arr.map((raw) => mapEditorLayerFromApi(raw));
}
