import { ProjectSliceCreator } from "../../types/project.store.types";

export const createProjectDataSlice: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "projects"
    | "currentProjectId"
    | "currentProjectName"
    | "currentProjectVersion"
    | "layers"
    | "pageBackground"
    | "updatePageBackground"
  >
> = (set) => ({
  projects: [],
  currentProjectId: null,
  currentProjectName: "Untitled Project",
  currentProjectVersion: 1,
  layers: [],
  pageBackground: { type: "color", color: "#ffffff" },

  updatePageBackground: (bg) => set({ pageBackground: bg }),
});
