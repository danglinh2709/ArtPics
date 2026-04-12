import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerCropActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    "updateLayerCrop" | "resetLayerCrop" | "setLayerFrameRatio"
  >
> = (set) => ({
  updateLayerCrop: (id, updates) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, crop: { ...l.crop, ...updates } } : l,
      ),
    })),

  resetLayerCrop: (id) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id
          ? {
              ...l,
              crop: {
                scale: 1,
                translateX: 0,
                translateY: 0,
                rotation: 0,
                aspectRatio: null,
              },
            }
          : l,
      ),
    })),

  setLayerFrameRatio: (id, ratio) =>
    set((state) => ({
      layers: state.layers.map((l) => {
        if (l.id !== id) return l;

        const currentW = l.transform.width;

        return {
          ...l,
          transform: {
            ...l.transform,
            height: currentW / ratio,
          },
          crop: {
            ...l.crop,
            aspectRatio: ratio,
          },
        };
      }),
    })),
});
