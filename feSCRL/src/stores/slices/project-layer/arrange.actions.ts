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

      const [ly] = layers.splice(i, 1);
      layers.push(ly);

      return { layers };
    }),

  sendToBack: (id) =>
    set((state) => {
      const layers = [...state.layers];
      const i = layers.findIndex((l) => l.id === id);
      if (i === -1) return state;

      const [ly] = layers.splice(i, 1);
      layers.unshift(ly);

      return { layers };
    }),
});
