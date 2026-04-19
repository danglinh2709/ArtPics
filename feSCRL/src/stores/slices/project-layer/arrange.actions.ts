import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerArrangeActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "bringToFront" | "sendToBack"
  >
> = (set) => ({
  bringToFront: (id) =>
    set((state) => {
      const layers = [...state.layers];
      const i = layers.findIndex((l) => l.id === id);
      if (i === -1) return state;

      const maxZIndex = layers.reduce(
        (max, l) => Math.max(max, l.transform.zIndex || 0),
        0,
      );

      layers[i] = {
        ...layers[i],
        transform: {
          ...layers[i].transform,
          zIndex: maxZIndex + 1,
        },
      };

      // Sort layers by zIndex to maintain array order consistency
      layers.sort((a, b) => (a.transform.zIndex || 0) - (b.transform.zIndex || 0));

      return { layers };
    }),

  sendToBack: (id) =>
    set((state) => {
      const layers = [...state.layers];
      const i = layers.findIndex((l) => l.id === id);
      if (i === -1) return state;

      const minZIndex = layers.reduce(
        (min, l) => Math.min(min, l.transform.zIndex || 0),
        0,
      );

      layers[i] = {
        ...layers[i],
        transform: {
          ...layers[i].transform,
          zIndex: minZIndex - 1,
        },
      };

      // Sort layers by zIndex to maintain array order consistency
      layers.sort((a, b) => (a.transform.zIndex || 0) - (b.transform.zIndex || 0));

      return { layers };
    }),
});
