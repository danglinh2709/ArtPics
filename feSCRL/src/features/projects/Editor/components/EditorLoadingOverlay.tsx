import React from "react";
import { StyleSheet, View } from "react-native";
import { Loading } from "../../../../components/Loading";

interface EditorLoadingOverlayProps {
  isUploadingAsset: boolean;
  isSavingBeforeLeave: boolean;
}

export function EditorLoadingOverlay({
  isUploadingAsset,
  isSavingBeforeLeave,
}: EditorLoadingOverlayProps) {
  if (!isUploadingAsset && !isSavingBeforeLeave) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.loadingBox}>
        <Loading inline size={120} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  loadingBox: {
    //backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
