export const PAGE_BACKGROUND_TYPES = {
  COLOR: "color",
  GRADIENT: "gradient",
  TEXTURE: "texture",
} as const;

export type TPageBackgroundType =
  (typeof PAGE_BACKGROUND_TYPES)[keyof typeof PAGE_BACKGROUND_TYPES];

export const PAGE_BACKGROUND_OPTIONS = [
  {
    key: PAGE_BACKGROUND_TYPES.COLOR,
    label: "Color",
  },
  {
    key: PAGE_BACKGROUND_TYPES.GRADIENT,
    label: "Gradient",
  },
  {
    key: PAGE_BACKGROUND_TYPES.TEXTURE,
    label: "Texture",
  },
] as const;
