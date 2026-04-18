import { folderService } from "../../../services/folder.service";
import { FolderSliceCreator } from "../../types/folder.store.types";

export const createFolderApiSlice: FolderSliceCreator<
  Pick<
    import("../../types/folder.store.types").FolderState,
    | "fetchFolders"
    | "createFolder"
    | "updateFolder"
    | "deleteFolder"
    | "addProjectToFolder"
    | "removeProjectFromFolder"
  >
> = (set, get) => ({
  fetchFolders: async () => {
    set({ isLoading: true, error: null });
    try {
      const folders = await folderService.getAllFolders();
      set({ folders });
    } catch (e: any) {
      set({ error: e.message || "Failed to fetch folders" });
    } finally {
      set({ isLoading: false });
    }
  },

  createFolder: async (name) => {
    try {
      const newFolder = await folderService.createFolder(name);
      set((state) => ({ folders: [newFolder, ...state.folders] }));
    } catch (e: any) {
      console.error("Failed to create folder", e);
    }
  },

  updateFolder: async (id, name) => {
    try {
      const updatedFolder = await folderService.updateFolder(id, name);
      set((state) => ({
        folders: state.folders.map((f) =>
          f.id === id ? updatedFolder : f
        ),
      }));
    } catch (e: any) {
      console.error("Failed to update folder", e);
    }
  },

  deleteFolder: async (id) => {
    try {
      await folderService.deleteFolder(id);
      set((state) => ({
        folders: state.folders.filter((f) => f.id !== id),
        activeFolderId:
          state.activeFolderId === id ? null : state.activeFolderId,
      }));
    } catch (e: any) {
      console.error("Failed to delete folder", e);
    }
  },

  addProjectToFolder: async (folderId, projectId) => {
    try {
      const updatedFolder = await folderService.addProjectsToFolder(folderId, [
        projectId,
      ]);
      set((state) => ({
        folders: state.folders.map((folder) =>
          folder.id === folderId ? updatedFolder : folder,
        ),
      }));
    } catch (e: any) {
      console.error("Failed to add project to folder", e);
    }
  },

  removeProjectFromFolder: async (folderId, projectId) => {
    try {
      const updatedFolder = await folderService.removeProjectFromFolder(
        folderId,
        projectId,
      );
      set((state) => ({
        folders: state.folders.map((folder) =>
          folder.id === folderId ? updatedFolder : folder,
        ),
      }));
    } catch (e: any) {
      console.error("Failed to remove project from folder", e);
    }
  },
});
