import { useState } from "react";
import { TToolbarTab } from "@/src/types/editor.types";

export function useEditorUiState() {
  const [activeTab, setActiveTab] = useState<TToolbarTab | null>(null);

  const [isLayerModalVisible, setIsLayerModalVisible] = useState<boolean>(false);

  const [isExportModalVisible, setIsExportModalVisible] = useState<boolean>(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState<boolean>(false);
  const [isTextEditModalVisible, setIsTextEditModalVisible] = useState<boolean>(false);
  const [isStickerModalVisible, setIsStickerModalVisible] = useState<boolean>(false);

  return {
    activeTab,
    setActiveTab,

    isLayerModalVisible,
    setIsLayerModalVisible,

    isExportModalVisible,
    setIsExportModalVisible,

    isPreviewModalVisible,
    setIsPreviewModalVisible,

    isTextEditModalVisible,
    setIsTextEditModalVisible,

    isStickerModalVisible,
    setIsStickerModalVisible,
  };
}
