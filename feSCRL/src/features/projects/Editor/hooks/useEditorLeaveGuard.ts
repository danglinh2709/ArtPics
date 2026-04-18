import { usePreventRemove } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { RefObject, useRef } from "react";
import ViewShot from "react-native-view-shot";

interface UseEditorLeaveGuardProps {
  navigation: any;
  isSavingBeforeLeave: boolean;
  setIsSavingBeforeLeave: (value: boolean) => void;
  isUploadingAsset: boolean;
  saveCurrentProject: (thumbnailUri?: string) => Promise<void>;
  viewShotRef: RefObject<ViewShot | null>;
}

export function useEditorLeaveGuard({
  navigation,
  isSavingBeforeLeave,
  setIsSavingBeforeLeave,
  isUploadingAsset,
  saveCurrentProject,
  viewShotRef,
}: UseEditorLeaveGuardProps) {
  const router = useRouter();
  // Ref-based guard to prevent double invocation (React state is async)
  const isSavingRef = useRef(false);

  usePreventRemove(!isSavingBeforeLeave, ({ data }) => {
    if (isSavingBeforeLeave || isSavingRef.current) return;

    if (isUploadingAsset) {
      console.warn("[Editor] Still uploading. Waiting...");
      return;
    }

    isSavingRef.current = true;
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
      } catch (err) {
        console.warn("[Editor] Save on leave failed:", err);
      } finally {
        isSavingRef.current = false;
        setIsSavingBeforeLeave(false);
        // Ensure navigation happens AFTER the saving state is cleared and UI is ready
        requestAnimationFrame(() => {
          if (data.action.type === "GO_BACK" && !navigation.canGoBack()) {
            router.replace("/(tabs)/project");
          } else {
            try {
              navigation.dispatch(data.action);
            } catch (e) {
              router.replace("/(tabs)/project");
            }
          }
        });
      }
    })();
  });
}

