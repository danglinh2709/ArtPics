import { ProjectSliceCreator } from "../../types/project.store.types";

export const createProjectUiSlice: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "isCreateModalVisible"
    | "selectedRatio"
    | "selectedLayerId"
    | "isLoading"
    | "isUploadingAsset"
    | "error"
    | "isProjectMenuVisible"
    | "activeProjectMenuId"
    | "openCreateModal"
    | "closeCreateModal"
    | "openProjectMenu"
    | "closeProjectMenu"
  >
> = (set) => ({
  isCreateModalVisible: false,
  selectedRatio: null,
  selectedLayerId: null,
  isLoading: false,
  isUploadingAsset: false,
  error: null,
  isProjectMenuVisible: false,
  activeProjectMenuId: null,

  openCreateModal: () => set({ isCreateModalVisible: true }),

  closeCreateModal: () => set({ isCreateModalVisible: false }),

  openProjectMenu: (id) =>
    set({ isProjectMenuVisible: true, activeProjectMenuId: id }),

  closeProjectMenu: () =>
    set({ isProjectMenuVisible: false, activeProjectMenuId: null }),
});
