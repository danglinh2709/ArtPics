import { usePreventRemove } from "@react-navigation/native";

interface UseEditorLeaveGuardProps {
  navigation: any;
  isSavingBeforeLeave: boolean;
  setIsSavingBeforeLeave: (value: boolean) => void;
  isUploadingAsset: boolean;
  saveCurrentProject: () => Promise<void>;
}

export function useEditorLeaveGuard({
  navigation,
  isSavingBeforeLeave,
  setIsSavingBeforeLeave,
  isUploadingAsset,
  saveCurrentProject,
}: UseEditorLeaveGuardProps) {
  usePreventRemove(!isSavingBeforeLeave, ({ data }) => {
    if (isSavingBeforeLeave) return;

    if (isUploadingAsset) {
      console.warn("[Editor] Still uploading. Waiting...");
      return;
    }

    setIsSavingBeforeLeave(true);

    void (async () => {
      try {
        console.log("[Editor] Auto-saving before leave...");
        await saveCurrentProject();
      } catch (err) {
        console.warn("[Editor] Save on leave failed:", err);
      } finally {
        setIsSavingBeforeLeave(false);
        // Ensure navigation happens AFTER the saving state is cleared and UI is ready
        requestAnimationFrame(() => {
          navigation.dispatch(data.action);
        });
      }
    })();
  });
}
