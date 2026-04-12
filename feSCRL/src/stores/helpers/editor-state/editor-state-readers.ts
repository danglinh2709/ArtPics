import { normalizeToArray } from "./editor-state-array";

type TObject = Record<string, unknown>;

function isObject(value: unknown): value is TObject {
  return value !== null && typeof value === "object";
}

export function getEditorStatePages(editorState: unknown): unknown[] {
  if (!isObject(editorState)) return [];

  const pages = editorState.pages ?? editorState.Pages;
  return normalizeToArray(pages);
}

export function getPageLayers(page: unknown): unknown[] {
  if (!isObject(page)) return [];

  const layers = page.layers ?? page.Layers;
  return normalizeToArray(layers);
}

export function pickBestPageRawLayers(editorState: unknown): unknown[] {
  const pages = getEditorStatePages(editorState);
  if (pages.length === 0) return [];

  let bestLayers: unknown[] = [];

  for (const page of pages) {
    const layers = getPageLayers(page);
    if (layers.length > bestLayers.length) {
      bestLayers = layers;
    }
  }

  return bestLayers;
}

export function getEditorDocument(editorState: unknown): {
  width: number;
  height: number;
} {
  const fallback = { width: 1080, height: 1080 };

  if (!isObject(editorState)) {
    return fallback;
  }

  const doc = editorState.document ?? editorState.Document;

  if (!isObject(doc)) {
    return fallback;
  }

  return {
    width: Number(doc.width ?? doc.Width) || 1080,
    height: Number(doc.height ?? doc.Height) || 1080,
  };
}
