import { create } from "zustand";
import { createProjectApiSlice } from "./slices/project/project-api.slice";
import { createProjectDataSlice } from "./slices/project/project-data.slice";
import { createProjectLayerSlice } from "./slices/project/project-layer.slice";
import { createProjectUiSlice } from "./slices/project/project-ui.slice";
import { ProjectState } from "./types/project.store.types";

export const useProjectStore = create<ProjectState>((...args) => ({
  ...createProjectDataSlice(...args),
  ...createProjectUiSlice(...args),
  ...createProjectLayerSlice(...args),
  ...createProjectApiSlice(...args),
}));

export { resolveAssetUri } from "./project.store.helpers";
export type { ProjectState } from "./types/project.store.types";
