import { SUPPORTED_ASPECT_RATIOS } from "../../configs/aspectRatio.config";
import { RATIO_MATCH_EPS } from "../../constants/aspectRatio.constant";
import { TAspectRatio } from "../../types/project.type";

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

// xác định tỉ lệ khung hình (aspect ratio) từ width và height của document.
export function resolveAspectRatioFromDocument(
  width: number,
  height: number,
): TAspectRatio {
  const safeH = height > 0 ? height : 1;
  const r = width / safeH;

  const bySize = SUPPORTED_ASPECT_RATIOS.find(
    (preset) =>
      Math.abs(preset.width - width) <= 2 &&
      Math.abs(preset.height - height) <= 2,
  );
  if (bySize) {
    return { ...bySize };
  }

  const byRatio = SUPPORTED_ASPECT_RATIOS.find(
    (preset) => Math.abs(preset.ratio - r) <= RATIO_MATCH_EPS,
  );
  if (byRatio) {
    return { ...byRatio };
  }

  const g = gcd(width, height);
  const rw = Math.round(width / g);
  const rh = Math.round(height / g);
  const id = `${rw}:${rh}`;

  return {
    id,
    label: "Tùy chỉnh",
    ratio: r,
    width: Math.round(width),
    height: Math.round(height),
  };
}
