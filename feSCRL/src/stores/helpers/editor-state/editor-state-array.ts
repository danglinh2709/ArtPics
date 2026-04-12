export function normalizeToArray<T = unknown>(value: unknown): T[] {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value as T[];
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);

    if (keys.length === 0) return [];

    const isNumericObject = keys.every((key) => /^\d+$/.test(key));

    if (isNumericObject) {
      return keys
        .sort((a, b) => Number(a) - Number(b))
        .map((key) => obj[key] as T);
    }
  }

  return [];
}
