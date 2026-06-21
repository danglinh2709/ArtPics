import React, { useMemo } from "react";
import { useWindowDimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ViewShot from "react-native-view-shot";
import { useNavigation, useRouter } from "expo-router";

import { useProjectStore } from "@/src/stores/project.store";
import { SelectionSyncProvider } from "@/src/context/SelectionSyncContext";
import { EDITOR_UI_CONSTANTS } from "@/src/constants/editor.constant";
import { useEditorViewport } from "@/src/hooks/useEditorViewport";
import { TToolbarTab } from "@/src/types/editor.types";

import { EditorTopBar } from "./sections/EditorTopBar";
import { EditorCanvas } from "./sections/EditorCanvas";
import { EditorPanels } from "./sections/EditorPanels";
import { EditorBottomBar } from "./sections/EditorBottomBar";

import { useEditorUiState } from "./hooks/useEditorUiState";
import { useEditorLeaveGuard } from "./hooks/useEditorLeaveGuard";
import { useEditorExport } from "./hooks/useEditorExport";
import { useEditorLayerActions } from "./hooks/useEditorLayerActions";

import { EditorModals } from "./components/EditorModals";
import { EditorLoadingOverlay } from "./components/EditorLoadingOverlay";

export default function Editor() {
  const router = useRouter();
  const navigation = useNavigation();
  const { width: windowWidth } = useWindowDimensions();
  // Override SCREEN_WIDTH with dynamic width for responsiveness
  const canvasWidth = windowWidth * EDITOR_UI_CONSTANTS.CANVAS_WIDTH_RATIO;

  const {
    selectedRatio,
    layers,
    selectedLayerId,
    selectLayer,
    currentProjectId,
    isUploadingAsset,
    updateLayerText,
    pageBackground,
    saveCurrentProject,
  } = useProjectStore();

  const {
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
  } = useEditorUiState();

  const viewShotRef = React.useRef<ViewShot>(null);

  const activeLayer = useMemo(
    () => layers.find((layer) => layer.id === selectedLayerId),
    [layers, selectedLayerId],
  );

  const { composedGesture, animatedStyle } = useEditorViewport();

  const ratio = selectedRatio?.ratio || 1;
  const canvasHeight = canvasWidth / ratio;

  const { isSavingBeforeLeave } = useEditorLeaveGuard({
    navigation,
    isUploadingAsset,
    saveCurrentProject,
    viewShotRef,
  });

  const { handleSaveImage } = useEditorExport({
    viewShotRef,
    selectLayer,
    setIsExportModalVisible,
  });

  const {
    handleSelectImage,
    handleAddText,
    handleSaveText,
    handleCanvasPress,
  } = useEditorLayerActions({
    currentProjectId,
    canvasWidth,
    canvasHeight,
    layers,
    selectedLayerId,
    selectLayer,
    setActiveTab,
    setIsLayerModalVisible,
    updateLayerText,
  });

  const handleOpenPreview = () => {
    setIsExportModalVisible(false);
    setTimeout(() => {
      setIsPreviewModalVisible(true);
    }, 300);
  };

  const handleBack = () => {
    router.back();
  };

  const handleToolbarClose = () => {
    selectLayer(null);
    setActiveTab(null);
  };

  const handleTabPress = (tab: TToolbarTab) => {
    if (tab === "text" && activeLayer?.type === "text") {
      setIsTextEditModalVisible(true);
      return;
    }

    setActiveTab((prev) => (prev === tab ? null : tab));
  };

  const handleSelectSticker = (imageUrl: string) => {
    handleSelectImage(imageUrl, 200, 200);
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SelectionSyncProvider>
        <SafeAreaView style={styles.container}>
          <EditorTopBar
            onBack={handleBack}
            onExport={() => setIsExportModalVisible(true)}
          />

          <EditorCanvas
            ref={viewShotRef}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            layers={layers}
            selectedLayerId={selectedLayerId}
            isCropping={activeTab === "crop"}
            pageBackground={pageBackground}
            onCanvasPress={handleCanvasPress}
            gesture={composedGesture}
            animatedStyle={animatedStyle}
          />

          <EditorPanels
            activeTab={activeTab}
            onClose={() => setActiveTab(null)}
          />

          <EditorBottomBar
            activeLayer={activeLayer}
            activeTab={activeTab}
            ratioLabel={selectedRatio?.id}
            onOpenLayerModal={() => setIsLayerModalVisible(true)}
            onTabPress={handleTabPress}
            onCloseToolbar={handleToolbarClose}
          />

          <EditorModals
            isLayerModalVisible={isLayerModalVisible}
            isExportModalVisible={isExportModalVisible}
            isPreviewModalVisible={isPreviewModalVisible}
            isTextEditModalVisible={isTextEditModalVisible}
            isStickerModalVisible={isStickerModalVisible}
            setIsLayerModalVisible={setIsLayerModalVisible}
            setIsExportModalVisible={setIsExportModalVisible}
            setIsPreviewModalVisible={setIsPreviewModalVisible}
            setIsTextEditModalVisible={setIsTextEditModalVisible}
            setIsStickerModalVisible={setIsStickerModalVisible}
            layers={layers}
            pageBackground={pageBackground}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            activeLayer={activeLayer}
            onSelectImage={handleSelectImage}
            onAddText={handleAddText}
            onSaveImage={handleSaveImage}
            onSaveText={handleSaveText}
            onOpenPreview={handleOpenPreview}
            onSelectSticker={handleSelectSticker}
          />

          <EditorLoadingOverlay
            isUploadingAsset={isUploadingAsset}
            isSavingBeforeLeave={isSavingBeforeLeave}
          />
        </SafeAreaView>
      </SelectionSyncProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
