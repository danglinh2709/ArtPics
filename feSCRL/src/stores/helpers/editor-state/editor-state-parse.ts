import { TEditorState } from "@/src/types/project.type";

export function parseEditorState(input: unknown): TEditorState | null {
  if (!input) return null;

  if (typeof input === "string") {
    try {
      return JSON.parse(input) as TEditorState;
    } catch {
      return null;
    }
  }

  if (typeof input === "object") {
    return input as TEditorState;
  }

  return null;
}
