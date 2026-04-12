import { FolderSliceCreator } from "../../types/folder.store.types";

export const createFolderDataSlice: FolderSliceCreator<
  Pick<
    import("../../types/folder.store.types").FolderState,
    "folders" | "activeFolderId" | "setActiveFolderId"
  >
> = (set) => ({
  folders: [],
  activeFolderId: null,

  setActiveFolderId: (id) => set({ activeFolderId: id }),
});
