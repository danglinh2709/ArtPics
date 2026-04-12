import { ILayer } from "@/src/types/editor.types";
import { ProjectSliceCreator } from "../../types/project.store.types";

export const createLayerCrudActions: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "addLayer"
    | "updateLayer"
    | "deleteLayer"
    | "duplicateLayer"
    | "lockLayer"
    | "replaceLayerAsset"
    | "addTextLayer"
    | "updateLayerText"
  >
> = (set) => ({
  addLayer: (layer) =>
    set((state) => ({
      layers: [...state.layers, layer],
      selectedLayerId: layer.id,
    })),

  updateLayer: (id, updates) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    })),

  deleteLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((l) => l.id !== id),
      selectedLayerId:
        state.selectedLayerId === id ? null : state.selectedLayerId,
    })),

  duplicateLayer: (id) =>
    set((state) => {
      const original = state.layers.find((l) => l.id === id);
      if (!original) return state;

      const copy: ILayer = {
        ...original,
        id: Date.now().toString(),
        transform: {
          ...original.transform,
          x: original.transform.x + 20,
          y: original.transform.y + 20,
        },
      };

      return {
        layers: [...state.layers, copy],
        selectedLayerId: copy.id,
      };
    }),

  lockLayer: (id, isLocked) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === id ? { ...l, isLocked } : l)),
    })),

  replaceLayerAsset: (id: string, uri: string, assetId?: string | null) =>
    set((state) => ({
      layers: state.layers.map((l) =>
        l.id === id ? { ...l, uri, assetId: assetId ?? l.assetId } : l,
      ),
    })),

  addTextLayer: (textLayer: import("@/src/types/editor.types").TTextLayer) => {
    const newLayer: ILayer = {
      id: Date.now().toString(),
      type: "text",
      uri: textLayer.text,
      transform: {
        x: textLayer.x,
        y: textLayer.y,
        width: textLayer.width,
        height: textLayer.height,
        rotation: 0,
        flipX: false,
        flipY: false,
        zIndex: 0,
      },
      crop: {
        scale: 1,
        translateX: 0,
        translateY: 0,
        rotation: 0,
        aspectRatio: null,
      },
      style: {
        opacity: 1,
        borderRadius: 0,
        individualCorners: null,
        border: null,
      },
      adjustments: {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        blur: 0,
        sharpen: 0,
      },
      isLocked: false,
      isVisible: true,
    };

    set((state) => ({
      layers: [...state.layers, newLayer],
      selectedLayerId: newLayer.id,
    }));
  },

  updateLayerText: (id, text) =>
    set((state) => ({
      layers: state.layers.map((l) => (l.id === id ? { ...l, uri: text } : l)),
    })),
});
