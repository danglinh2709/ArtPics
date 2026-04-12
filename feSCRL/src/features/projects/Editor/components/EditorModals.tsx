import React from "react";

import { ExportModal } from "../modals/ExportModal";
import { PreviewModal } from "../modals/PreviewModal";
import { TextEditModal } from "../modals/TextEditModal";

import { ILayer, TTextLayer } from "@/src/types/editor.types";
import { AddLayerModal } from "../../AddLayerModal";

interface EditorModalsProps {
  isLayerModalVisible: boolean;
  isExportModalVisible: boolean;
  isPreviewModalVisible: boolean;
  isTextEditModalVisible: boolean;

  setIsLayerModalVisible: (value: boolean) => void;
  setIsExportModalVisible: (value: boolean) => void;
  setIsPreviewModalVisible: (value: boolean) => void;
  setIsTextEditModalVisible: (value: boolean) => void;

  layers: ILayer[];
  canvasWidth: number;
  canvasHeight: number;
  activeLayer?: ILayer;

  onSelectImage: (uri: string, width: number, height: number) => Promise<void>;
  onAddText: (textLayer: TTextLayer) => Promise<void>;
  onSaveImage: () => Promise<void>;
  onSaveText: (text: string) => void;
  onOpenPreview: () => void;
}

export function EditorModals({
  isLayerModalVisible,
  isExportModalVisible,
  isPreviewModalVisible,
  isTextEditModalVisible,
  setIsLayerModalVisible,
  setIsExportModalVisible,
  setIsPreviewModalVisible,
  setIsTextEditModalVisible,
  layers,
  canvasWidth,
  canvasHeight,
  activeLayer,
  onSelectImage,
  onAddText,
  onSaveImage,
  onSaveText,
  onOpenPreview,
}: EditorModalsProps) {
  return (
    <>
      <AddLayerModal
        visible={isLayerModalVisible}
        onClose={() => setIsLayerModalVisible(false)}
        onSelectImage={onSelectImage}
        onAddText={onAddText}
      />

      <ExportModal
        visible={isExportModalVisible}
        onClose={() => setIsExportModalVisible(false)}
        layers={layers}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        onExpand={onOpenPreview}
        onSaveImage={onSaveImage}
      />

      <PreviewModal
        visible={isPreviewModalVisible}
        onClose={() => {
          setIsPreviewModalVisible(false);
          setTimeout(() => {
            setIsExportModalVisible(true);
          }, 150);
        }}
        layers={layers}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
      />

      <TextEditModal
        visible={isTextEditModalVisible}
        value={activeLayer?.type === "text" ? activeLayer.uri : ""}
        onClose={() => setIsTextEditModalVisible(false)}
        onSave={onSaveText}
      />
    </>
  );
}
