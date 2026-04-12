import { RefObject, useCallback } from "react";
import * as MediaLibrary from "expo-media-library";
import ViewShot from "react-native-view-shot";

interface UseEditorExportProps {
  viewShotRef: RefObject<ViewShot | null>;
  selectLayer: (id: string | null) => void;
  setIsExportModalVisible: (value: boolean) => void;
}

export function useEditorExport({
  viewShotRef,
  selectLayer,
  setIsExportModalVisible,
}: UseEditorExportProps) {
  const handleSaveImage = useCallback(async () => {
    try {
      selectLayer(null);

      await new Promise((resolve) => setTimeout(resolve, 100));

      if (!viewShotRef.current?.capture) {
        throw new Error("ViewShot ref is not ready.");
      }

      const uri = await viewShotRef.current.capture();

      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(uri);
        alert("Thành công! Ảnh đã được lưu vào thư viện.");
        setIsExportModalVisible(false);
        return;
      }

      alert("Cần quyền truy cập thư viện ảnh để lưu!");
    } catch (err) {
      console.error("Export failed:", err);
      alert("Xuất ảnh thất bại!");
    }
  }, [viewShotRef, selectLayer, setIsExportModalVisible]);

  return {
    handleSaveImage,
  };
}
