import { create } from "zustand";
import { FolderState } from "./types/folder.store.types";

import { createFolderDataSlice } from "./slices/folder/folder-data.slice";
import { createFolderUiSlice } from "./slices/folder/folder-ui.slice";
import { createFolderApiSlice } from "./slices/folder/folder-api.slice";

export const useFolderStore = create<FolderState>((...args) => ({
  ...createFolderDataSlice(...args),
  ...createFolderUiSlice(...args),
  ...createFolderApiSlice(...args),
}));

export type { FolderState } from "./types/folder.store.types";
