import { useState } from "react";
import { TToolbarTab } from "@/src/types/editor.types";

export function useEditorUiState() {
  const [activeTab, setActiveTab] = useState<TToolbarTab | null>(null);

  const [isLayerModalVisible, setIsLayerModalVisible] = useState(false);
  const [isSavingBeforeLeave, setIsSavingBeforeLeave] = useState(false);

  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [isTextEditModalVisible, setIsTextEditModalVisible] = useState(false);

  return {
    activeTab,
    setActiveTab,

    isLayerModalVisible,
    setIsLayerModalVisible,

    isSavingBeforeLeave,
    setIsSavingBeforeLeave,

    isExportModalVisible,
    setIsExportModalVisible,

    isPreviewModalVisible,
    setIsPreviewModalVisible,

    isTextEditModalVisible,
    setIsTextEditModalVisible,
  };
}
