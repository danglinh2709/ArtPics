import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerClearAndSelectActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "clearLayers" | "selectLayer"
  >
> = (set) => ({
  clearLayers: () => set({ layers: [], selectedLayerId: null }),

  selectLayer: (id) => set({ selectedLayerId: id }),
});
