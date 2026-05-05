import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerTransformActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "updateLayerTransform" | "moveLayer" | "rotateLayer"
  >
> = (set, get) => ({
  updateLayerTransform: (id, updates, saveHistory = true) =>
    set((state) => {
      if (saveHistory) get().pushHistory();
      return {
        layers: state.layers.map((l) =>
          l.id === id ? { ...l, transform: { ...l.transform, ...updates } } : l,
        ),
      };
    }),

  moveLayer: (id, dx, dy) =>
    set((state) => {
      get().pushHistory();
      return {
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
      };
    }),

  rotateLayer: (id, rotation, saveHistory = true) =>
    set((state) => {
      if (saveHistory) get().pushHistory();
      return {
        layers: state.layers.map((l) =>
          l.id === id ? { ...l, transform: { ...l.transform, rotation } } : l,
        ),
      };
    }),
});
