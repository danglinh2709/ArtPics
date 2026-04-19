import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerClearAndSelectActions: ProjectSliceCreator<
  Pick<import("../../types/project.store.types").ProjectState, "selectLayer">
> = (set) => ({
  selectLayer: (id) => set({ selectedLayerId: id }),
});
