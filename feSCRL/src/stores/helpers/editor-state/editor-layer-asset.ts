import { ILayer } from "@/src/types/editor.types";

export function extractAssetIdFromUri(
  uri: string | undefined | null,
): string | null {
  if (uri == null || typeof uri !== "string") return null;

  const u = uri.trim();
  if (!u) return null;

  // Trường hợp URL dạng /Asset/download/{id}
  const download = u.match(/\/Asset\/download\/([^/?#]+)/i);
  if (download?.[1]) {
    try {
      return decodeURIComponent(download[1]);
    } catch {
      return download[1];
    }
  }

  // Trường hợp uri là id thuần
  if (
    !u.includes("://") &&
    !u.includes("/") &&
    !u.startsWith("data:") &&
    !u.startsWith("content:")
  ) {
    return u;
  }

  // Lấy segment cuối cùng của URL/path
  const segments = u.split("/");
  const last = segments[segments.length - 1]?.split("?")[0]?.split("#")[0];

  // Nếu segment cuối là ObjectId hoặc UUID thì coi như assetId
  if (last) {
    const cleanLast = last.trim();

    const isObjectId = /^[a-f0-9]{24}$/i.test(cleanLast);
    const isUuid =
      /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
        cleanLast,
      );

    if (isObjectId || isUuid) {
      return cleanLast;
    }
  }

  return null;
}

export function isMediaLayerType(type: ILayer["type"]): boolean {
  return (
    type === "image" || type === "video"
    //  ||
    // type === "sticker" ||
    // type === "frameFill"
  );
}
