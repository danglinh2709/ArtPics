import { ILayer, Project } from "../../types/editor.types";
import { resolveAspectRatioFromDocument } from "./aspect-ratio.utils";
import { mapLayersFromApi, pickBestPageRawLayers } from "./editor-state";
import { getApiBaseUrl, resolveAssetUri } from "./api.utils";

export { getApiBaseUrl, resolveAssetUri };

export const mapApiProjectToProject = (
  p: any,
  currentProjects: Project[] = [],
): Project => {
  // check project đã tồn tại trong store chưa
  const existing = currentProjects.find((ep) => ep.id === p.id);

  // tính ratio từ documentWidth và documentHeight
  const fromApi =
    p.documentWidth != null &&
    p.documentHeight != null &&
    p.documentWidth > 0 &&
    p.documentHeight > 0
      ? resolveAspectRatioFromDocument(p.documentWidth, p.documentHeight)
      : null;

  // lấy ratio từ project hiện tại hoặc từ api
  const ratio = existing?.ratio ?? fromApi;

  // lấy editorState từ project hiện tại hoặc từ api
  const editorState = p.editorState ?? p.EditorState;

  // lấy layers từ project hiện tại hoặc từ api
  let layers = (existing?.layers || []) as ILayer[];
  let pageBackground = existing?.pageBackground || null;

  // nếu có editorState thì map layers từ editorState
  if (editorState) {
    const firstPage = editorState.pages?.[0];
    if (firstPage?.background) {
      pageBackground = firstPage.background;
    }
    const rawLayers = pickBestPageRawLayers(editorState);
    if (rawLayers && rawLayers.length > 0) {
      layers = mapLayersFromApi(rawLayers);
    }
  }

  return {
    id: p.id,
    name: p.name,
    templateId: p.templateId ?? null,
    status: p.status ?? "Draft",
    thumbnailAssetId: p.thumbnailAssetId,
    updatedAt: new Date(p.updatedAt).getTime(),
    ratio: ratio ?? null,
    isStarred: p.isStarred ?? false,
    pageBackground,
    layers,
  };
};
