/**
 * Bộ lọc tỷ lệ hiển thị (nhãn tiếng Việt). Giá trị `aspectKey` khớp API `aspectKey`.
 */
export const TEMPLATE_ASPECT_FILTERS = [
  { aspectKey: "portrait", labelVi: "Chân dung" },
  { aspectKey: "story", labelVi: "Câu chuyện" },
  { aspectKey: "square", labelVi: "Vuông" },
  { aspectKey: "landscape", labelVi: "Phong cảnh" },
] as const;

export type TemplateAspectFilterKey =
  (typeof TEMPLATE_ASPECT_FILTERS)[number]["aspectKey"];
