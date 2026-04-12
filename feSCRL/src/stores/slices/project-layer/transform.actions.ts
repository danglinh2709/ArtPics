import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerTransformActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "updateLayerTransform" | "moveLayer" | "rotateLayer"
  >
> = (set) => ({
  updateLayerTransform: (id, updates) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, transform: { ...l.transform, ...updates } } : l,
      ),
    })),

  moveLayer: (id, dx, dy) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id
          ? {
              ...l,
              transform: {
                ...l.transform,
                x: l.transform.x + dx,
                y: l.transform.y + dy,
              },
            }
          : l,
      ),
    })),

  rotateLayer: (id, rotation) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, transform: { ...l.transform, rotation } } : l,
      ),
    })),
});
