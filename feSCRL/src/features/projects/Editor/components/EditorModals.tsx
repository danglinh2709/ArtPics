import React from "react";

import { ExportModal } from "../modals/ExportModal";
import { PreviewModal } from "../modals/PreviewModal";
import { TextEditModal } from "../modals/TextEditModal";

import { ILayer, TPageBackground, TTextLayer } from "@/src/types/editor.types";
import { AddLayerModal } from "../../AddLayerModal";
import { StickerModal } from "../../StickerModal";

interface EditorModalsProps {
  isLayerModalVisible: boolean;
  isExportModalVisible: boolean;
  isPreviewModalVisible: boolean;
  isTextEditModalVisible: boolean;
  isStickerModalVisible: boolean;

  setIsLayerModalVisible: (value: boolean) => void;
  setIsExportModalVisible: (value: boolean) => void;
  setIsPreviewModalVisible: (value: boolean) => void;
  setIsTextEditModalVisible: (value: boolean) => void;
  setIsStickerModalVisible: (value: boolean) => void;

  layers: ILayer[];
  pageBackground?: TPageBackground | null;
  canvasWidth: number;
  canvasHeight: number;
  activeLayer?: ILayer;

  onSelectImage: (uri: string, width: number, height: number) => Promise<void>;
  onAddText: (textLayer: TTextLayer) => Promise<void>;
  onSaveImage: () => Promise<void>;
  onSaveText: (text: string) => void;
  onOpenPreview: () => void;
  onSelectSticker: (imageUrl: string) => void;
}

export function EditorModals({
  isLayerModalVisible,
  isExportModalVisible,
  isPreviewModalVisible,
  isTextEditModalVisible,
  isStickerModalVisible,
  setIsLayerModalVisible,
  setIsExportModalVisible,
  setIsPreviewModalVisible,
  setIsTextEditModalVisible,
  setIsStickerModalVisible,
  layers,
  pageBackground,
  canvasWidth,
  canvasHeight,
  activeLayer,
  onSelectImage,
  onAddText,
  onSaveImage,
  onSaveText,
  onOpenPreview,
  onSelectSticker,
}: EditorModalsProps) {
  return (
    <>
      <AddLayerModal
        visible={isLayerModalVisible}
        onClose={() => setIsLayerModalVisible(false)}
        onSelectImage={onSelectImage}
        onAddText={onAddText}
        onOpenStickerModal={() => setIsStickerModalVisible(true)}
      />

      <StickerModal
        visible={isStickerModalVisible}
        onClose={() => setIsStickerModalVisible(false)}
        onSelectSticker={onSelectSticker}
      />

      <ExportModal
        visible={isExportModalVisible}
        onClose={() => setIsExportModalVisible(false)}
        layers={layers}
        pageBackground={pageBackground}
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
        pageBackground={pageBackground}
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
