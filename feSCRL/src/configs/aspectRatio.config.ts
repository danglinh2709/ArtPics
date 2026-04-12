import { TAspectRatio } from "../types/project.type";

export const SUPPORTED_ASPECT_RATIOS: TAspectRatio[] = [
  {
    id: "4:5",
    label: "Chân dung",
    ratio: 4 / 5,
    width: 1080,
    height: 1350,
  },
  {
    id: "9:16",
    label: "Câu chuyện",
    ratio: 9 / 16,
    width: 1080,
    height: 1920,
  },
  {
    id: "1:1",
    label: "Vuông",
    ratio: 1,
    width: 1080,
    height: 1080,
  },
  {
    id: "1.91:1",
    label: "Phong cảnh",
    ratio: 1.91 / 1,
    width: 1080,
    height: 566,
  },
];
