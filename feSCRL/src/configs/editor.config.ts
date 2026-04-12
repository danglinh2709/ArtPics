export const LAYER_MENU_ITEMS_ACTION_TYPE = {
  GALLERY: "gallery",
  TEXT: "text",
} as const;

export const LAYER_MENU_ITEMS = [
  {
    name: "Ảnh",
    icon: "image-outline" as const,
    actionType: LAYER_MENU_ITEMS_ACTION_TYPE.GALLERY,
  },
  { name: "Video", icon: "play-outline" as const, hasCrown: true },
  {
    name: "Văn bản",
    icon: "text-outline" as const,
    actionType: LAYER_MENU_ITEMS_ACTION_TYPE.TEXT,
  },
  { name: "Nhãn dán", icon: "sparkles-outline" as const },
  { name: "Khung", icon: "albums-outline" as const },
  { name: "Lưới", icon: "grid-outline" as const },
  { name: "Vẽ", icon: "brush-outline" as const, hasCrown: true },
  { name: "Widget", icon: "chatbubble-ellipses-outline" as const },
  { name: "Hình dạng", icon: "shapes-outline" as const, isNew: true },
];
