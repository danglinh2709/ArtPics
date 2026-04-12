import { useCallback } from "react";
import { EAssetType } from "@/src/enums/layer.enum";
import { useProjectStore } from "@/src/stores/project.store";
import { ILayer, TTextLayer, TToolbarTab } from "@/src/types/editor.types";

interface UseEditorLayerActionsProps {
  currentProjectId?: string | null;
  canvasWidth: number;
  canvasHeight: number;
  layers: ILayer[];
  selectedLayerId: string | null;
  selectLayer: (id: string | null) => void;
  setActiveTab: React.Dispatch<React.SetStateAction<TToolbarTab | null>>;
  setIsLayerModalVisible: (value: boolean) => void;
  updateLayerText: (id: string, text: string) => void;
}

export function useEditorLayerActions({
  currentProjectId,
  canvasWidth,
  canvasHeight,
  layers,
  selectedLayerId,
  selectLayer,
  setActiveTab,
  setIsLayerModalVisible,
  updateLayerText,
}: UseEditorLayerActionsProps) {
  const { addLayer, addTextLayer, uploadAsset } = useProjectStore();

  const handleSelectImage = useCallback(
    async (uri: string, width: number, height: number) => {
      if (!currentProjectId) return;

      const safeHeight = height || 1;
      const aspectRatio = width / safeHeight;

      const initialWidth = 200;
      const initialHeight = initialWidth / aspectRatio;
      const layerId = Date.now().toString();

      const newLayer: ILayer = {
        id: layerId,
        type: "image",
        uri,
        transform: {
          x: (canvasWidth - initialWidth) / 2,
          y: (canvasHeight - initialHeight) / 2,
          width: initialWidth,
          height: initialHeight,
          rotation: 0,
          flipX: false,
          flipY: false,
          zIndex: layers.length + 1,
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

      addLayer(newLayer);

      try {
        const result = await uploadAsset(
          currentProjectId,
          EAssetType.Image,
          uri,
        );

        if (result) {
          useProjectStore.getState().updateLayer(layerId, {
            uri: result.uri,
            assetId: result.id,
          });
        }
      } catch (error) {
        console.warn("[Editor] Upload image failed:", error);
      }
    },
    [
      currentProjectId,
      canvasWidth,
      canvasHeight,
      layers,
      addLayer,
      uploadAsset,
    ],
  );

  const handleAddText = useCallback(
    async (textLayer: TTextLayer) => {
      addTextLayer(textLayer);
    },
    [addTextLayer],
  );

  const handleSaveText = useCallback(
    (text: string) => {
      if (!selectedLayerId) return;
      updateLayerText(selectedLayerId, text);
    },
    [selectedLayerId, updateLayerText],
  );

  const handleCanvasPress = useCallback(() => {
    if (selectedLayerId) {
      selectLayer(null);
      setActiveTab(null);
      return;
    }

    if (layers.length === 0) {
      setIsLayerModalVisible(true);
    }
  }, [
    selectedLayerId,
    selectLayer,
    setActiveTab,
    layers.length,
    setIsLayerModalVisible,
  ]);

  return {
    handleSelectImage,
    handleAddText,
    handleSaveText,
    handleCanvasPress,
  };
}
