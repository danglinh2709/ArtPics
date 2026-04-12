import { FolderSliceCreator } from "../../types/folder.store.types";

export const createFolderUiSlice: FolderSliceCreator<
  Pick<
    import("../../types/folder.store.types").FolderState,
    | "isCreateFolderModalOpen"
    | "isAddProjectModalOpen"
    | "isLoading"
    | "error"
    | "openCreateFolderModal"
    | "closeCreateFolderModal"
    | "openAddProjectModal"
    | "closeAddProjectModal"
    | "setFolderLoading"
    | "setFolderError"
  >
> = (set) => ({
  isCreateFolderModalOpen: false,
  isAddProjectModalOpen: false,
  isLoading: false,
  error: null,

  setFolderLoading: (isLoading) => set({ isLoading }),
  setFolderError: (error) => set({ error }),

  openCreateFolderModal: () => set({ isCreateFolderModalOpen: true }),
  closeCreateFolderModal: () => set({ isCreateFolderModalOpen: false }),

  openAddProjectModal: () => set({ isAddProjectModalOpen: true }),
  closeAddProjectModal: () => set({ isAddProjectModalOpen: false }),
});
