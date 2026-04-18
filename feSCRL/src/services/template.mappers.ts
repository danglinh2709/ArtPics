import {
  TemplateAspectKey,
  TemplateDetail,
  TemplateListItem,
} from "../types/template.types";

function trimUrl(u?: string | null): string | undefined {
  if (u == null) return undefined;
  const t = String(u).trim();
  return t.length ? t : undefined;
}

function num(raw: unknown, alt: unknown): number {
  const v = raw ?? alt;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function inferAspectKey(w: number, h: number): TemplateAspectKey {
  if (w <= 0 || h <= 0) return "square";
  const ratio = w / h;
  if (ratio >= 0.52 && ratio <= 0.62) return "story";
  if (ratio < 0.9) return "portrait";
  if (ratio > 1.12) return "landscape";
  return "square";
}

function normalizeAspectKey(
  raw: unknown,
  width: number,
  height: number,
): TemplateAspectKey {
  const s = String(raw ?? "")
    .trim()
    .toLowerCase();
  if (["portrait", "story", "square", "landscape"].includes(s))
    return s as TemplateAspectKey;
  return inferAspectKey(width, height);
}

/** Chuẩn hoá phản hồi API (camelCase / PascalCase, URL bị whitespace). */
export function normalizeTemplateListItem(raw: Record<string, unknown>): TemplateListItem {
  const id = raw.id ?? raw.Id;
  const tagsRaw = raw.tags ?? raw.Tags;
  const tags = Array.isArray(tagsRaw)
    ? (tagsRaw as unknown[]).map((x) => String(x))
    : [];

  const width = num(raw.width, raw.Width);
  const height = num(raw.height, raw.Height);
  const pageCount = num(raw.pageCount, raw.PageCount);
  const imageLayerCount = num(raw.imageLayerCount, raw.ImageLayerCount);

  return {
    id: String(id ?? ""),
    code: String(raw.code ?? raw.Code ?? ""),
    name: String(raw.name ?? raw.Name ?? ""),
    categoryCode: (raw.categoryCode ?? raw.CategoryCode ?? raw.category ?? raw.Category ?? "") as string,
    format: (raw.format ?? raw.Format ?? "") as string,
    description: (raw.description ?? raw.Description) as string | undefined,
    previewImageUrl: trimUrl(
      (raw.previewImageUrl ?? raw.PreviewImageUrl) as string | undefined,
    ),
    thumbnailUrl: trimUrl(
      (raw.thumbnailUrl ?? raw.ThumbnailUrl) as string | undefined,
    ),
    tags,
    sortOrder: Number(raw.sortOrder ?? raw.SortOrder ?? 0),
    width: width || 0,
    height: height || 0,
    pageCount: pageCount || 0,
    imageLayerCount: imageLayerCount || 0,
    aspectKey: normalizeAspectKey(
      raw.aspectKey ?? raw.AspectKey,
      width,
      height,
    ),
  };
}

export function normalizeTemplateDetail(raw: Record<string, unknown>): TemplateDetail {
  const base = normalizeTemplateListItem(raw);
  return {
    ...base,
    isDefault: Boolean(raw.isDefault ?? raw.IsDefault ?? false),
    isActive: Boolean(raw.isActive ?? raw.IsActive ?? true),
    templateData: (raw.templateData ?? raw.TemplateData) as TemplateDetail["templateData"],
  };
}
