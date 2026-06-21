import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerStyleActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "updateLayerStyle" | "updateLayerOpacity" | "updateLayerAdjustments"
  >
> = (set, get) => ({
  updateLayerStyle: (id, updates, saveHistory = true) =>
    set((state) => {
      if (saveHistory) get().pushHistory();
      return {
        layers: state.layers.map((l) =>
          l.id === id ? { ...l, style: { ...l.style, ...updates } } : l,
        ),
      };
    }),

  updateLayerOpacity: (id, opacity, saveHistory = true) =>
    set((state) => {
      if (saveHistory) get().pushHistory();
      return {
        layers: state.layers.map((l) =>
          l.id === id ? { ...l, style: { ...l.style, opacity } } : l,
        ),
      };
    }),

  updateLayerAdjustments: (id, updates, saveHistory = true) =>
    set((state) => {
      if (saveHistory) get().pushHistory();
      return {
        layers: state.layers.map((l) =>
          l.id === id
            ? { ...l, adjustments: { ...l.adjustments, ...updates } }
            : l,
        ),
      };
    }),
});
