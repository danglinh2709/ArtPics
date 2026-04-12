import { ProjectSliceCreator } from "../../types/project.store.types";

export const createProjectDataSlice: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "projects"
    | "currentProjectId"
    | "currentProjectName"
    | "currentProjectVersion"
    | "layers"
  >
> = () => ({
  projects: [],
  currentProjectId: null,
  currentProjectName: "Untitled Project",
  currentProjectVersion: 1,
  layers: [],
});
