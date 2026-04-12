import { StateCreator } from "zustand";
import { IProjectFolder } from "../../types/folder.types";

export interface FolderState {
  // Folder Data
  folders: IProjectFolder[];
  activeFolderId: string | null;

  // Actions Data
  setActiveFolderId: (id: string | null) => void;

  // Folder UI
  isCreateFolderModalOpen: boolean;
  isAddProjectModalOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions UI
  openCreateFolderModal: () => void;
  closeCreateFolderModal: () => void;
  openAddProjectModal: () => void;
  closeAddProjectModal: () => void;
  setFolderLoading: (isLoading: boolean) => void;
  setFolderError: (error: string | null) => void;

  // Folder API Actions
  fetchFolders: () => Promise<void>;
  createFolder: (name: string) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  addProjectToFolder: (folderId: string, projectId: string) => Promise<void>;
  removeProjectFromFolder: (
    folderId: string,
    projectId: string
  ) => Promise<void>;
}

// alias mapping creator
export type FolderSliceCreator<T> = StateCreator<FolderState, [], [], T>;
