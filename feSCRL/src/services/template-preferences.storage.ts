import * as SecureStore from "expo-secure-store";

const KEY_RECENT = "scrl_template_recent_ids";
const KEY_FAVORITES = "scrl_template_favorite_ids";
const MAX_RECENT = 40;

async function readJsonArray(key: string): Promise<string[]> {
  try {
    const raw = await SecureStore.getItemAsync(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.map((x) => String(x));
  } catch {
    return [];
  }
}

async function writeJsonArray(key: string, ids: string[]): Promise<void> {
  await SecureStore.setItemAsync(key, JSON.stringify(ids));
}

export async function getRecentTemplateIds(): Promise<string[]> {
  return readJsonArray(KEY_RECENT);
}

export async function touchRecentTemplateId(id: string): Promise<void> {
  const cur = await getRecentTemplateIds();
  const next = [id, ...cur.filter((x) => x !== id)].slice(0, MAX_RECENT);
  await writeJsonArray(KEY_RECENT, next);
}

export async function getFavoriteTemplateIds(): Promise<string[]> {
  return readJsonArray(KEY_FAVORITES);
}

export async function isFavoriteTemplateId(id: string): Promise<boolean> {
  const ids = await getFavoriteTemplateIds();
  return ids.includes(id);
}

export async function toggleFavoriteTemplateId(id: string): Promise<boolean> {
  const cur = await getFavoriteTemplateIds();
  const has = cur.includes(id);
  const next = has ? cur.filter((x) => x !== id) : [...cur, id];
  await writeJsonArray(KEY_FAVORITES, next);
  return !has;
}
