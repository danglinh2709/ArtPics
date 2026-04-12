import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerStyleActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "updateLayerStyle" | "updateLayerOpacity" | "updateLayerAdjustments"
  >
> = (set) => ({
  updateLayerStyle: (id, updates) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, style: { ...l.style, ...updates } } : l,
      ),
    })),

  updateLayerOpacity: (id, opacity) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, style: { ...l.style, opacity } } : l,
      ),
    })),

  updateLayerAdjustments: (id, updates) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id
          ? { ...l, adjustments: { ...l.adjustments, ...updates } }
          : l,
      ),
    })),
});
