import { usePreventRemove } from "@react-navigation/native";
import { RefObject, useRef, useState } from "react";
import ViewShot from "react-native-view-shot";

interface UseEditorLeaveGuardProps {
  navigation: any;
  isUploadingAsset: boolean;
  saveCurrentProject: (thumbnailUri?: string) => Promise<void>;
  viewShotRef: RefObject<ViewShot | null>;
}

export function useEditorLeaveGuard({
  navigation,
  isUploadingAsset,
  saveCurrentProject,
  viewShotRef,
}: UseEditorLeaveGuardProps) {
  const isProcessingRef = useRef(false);
  const allowNextRemoveRef = useRef(false);
  const [isSavingBeforeLeave, setIsSavingBeforeLeave] = useState(false);

  usePreventRemove(true, ({ data }) => {
    // Nếu đã cho phép remove rồi thì bỏ qua guard
    if (allowNextRemoveRef.current) {
      allowNextRemoveRef.current = false;
      return;
    }

    // Tránh chạy nhiều lần
    if (isProcessingRef.current) return;

    // Đang upload thì không cho rời
    if (isUploadingAsset) {
      console.warn("[Editor] Still uploading. Block leaving.");
      return;
    }

    isProcessingRef.current = true;
    setIsSavingBeforeLeave(true);

    void (async () => {
      try {
        console.log("[Editor] Auto-saving before leave...");

        let thumbnailUri: string | undefined;

        try {
          if (viewShotRef.current?.capture) {
            thumbnailUri = await viewShotRef.current.capture();
          }
        } catch (captureErr) {
          console.warn("[Editor] Thumbnail capture failed", captureErr);
        }

        await saveCurrentProject(thumbnailUri);

        // Cho phép lần remove tiếp theo đi qua
        allowNextRemoveRef.current = true;

        requestAnimationFrame(() => {
          try {
            navigation.dispatch(data.action);
          } catch (e) {
            console.warn("[Editor] dispatch failed:", e);
          } finally {
            isProcessingRef.current = false;
            setIsSavingBeforeLeave(false);
          }
        });
      } catch (err) {
        console.warn("[Editor] Save on leave failed:", err);
        isProcessingRef.current = false;
        setIsSavingBeforeLeave(false);
      }
    })();
  });

  return { isSavingBeforeLeave };
}
