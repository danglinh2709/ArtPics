import { ITemplateListItem } from "@/src/types/template.types";

/** Ảnh đại diện cho mỗi category (ưu tiên sortOrder nhỏ). */
export function buildCategoryCoverMap(
  templates: ITemplateListItem[],
): Record<string, string | undefined> {
  const sorted = [...templates].sort(
    (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0),
  );
  const map: Record<string, string | undefined> = {};
  for (const t of sorted) {
    const c = t.categoryCode?.trim();
    if (!c) continue;
    const url = t.thumbnailUrl || t.previewImageUrl;
    if (url && map[c] === undefined) map[c] = url;
  }
  return map;
}

export function sortTemplatesByOrder(
  templates: ITemplateListItem[],
): ITemplateListItem[] {
  return [...templates].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

/** Giữ thứ tự theo danh sách id (dùng cho “đã dùng gần đây”). */
export function orderTemplatesByIds(
  templates: ITemplateListItem[],
  ids: string[],
): ITemplateListItem[] {
  const map = new Map(templates.map((t) => [t.id, t]));
  return ids.map((id) => map.get(id)).filter(Boolean) as ITemplateListItem[];
}
