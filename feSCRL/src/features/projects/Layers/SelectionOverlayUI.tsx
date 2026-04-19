import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import { useProjectStore } from "@/src/stores/project.store";
import {
  PILL_LENGTH,
  PILL_THICKNESS,
} from "@/src/constants/selectionOverlay.constants";
import { useSelectionOverlayGestures } from "@/src/hooks/useSelectionOverlayGestures";
import { ILayerTransformValues } from "@/src/types/layer.type";
import { ILayer } from "@/src/types/editor.types";

interface ISelectionOverlayUIProps {
  layer: ILayer;
  transformValues: ILayerTransformValues;
  commitTransform: () => void;
}

export function SelectionOverlayUI({
  layer,
  transformValues,
  commitTransform,
}: ISelectionOverlayUIProps) {
  const { deleteLayer, duplicateLayer, lockLayer } = useProjectStore();

  const { tx, ty, rotation, width, height } = transformValues;

  const {
    contentGesture,
    rotateHandleGesture,
    topLeftGesture,
    topMiddleGesture,
    topRightGesture,
    rightMiddleGesture,
    bottomRightGesture,
    bottomMiddleGesture,
    bottomLeftGesture,
    leftMiddleGesture,
  } = useSelectionOverlayGestures({
    layerLocked: layer.isLocked,
    tx,
    ty,
    rotation,
    width,
    height,
    commitTransform,
  });

  if (layer.isLocked) {
    return (
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View
          style={[styles.selectionBorder, styles.lockedBorder]}
          pointerEvents="none"
        />

        <View style={styles.actionMenu}>
          <TouchableOpacity
            onPress={() => lockLayer(layer.id, false)}
            style={styles.menuBtn}
          >
            <Ionicons name="lock-closed" size={20} color="#EECB68" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View pointerEvents="box-none" style={styles.overlayRoot}>
      <GestureDetector gesture={contentGesture}>
        <View style={styles.gestureSurface} />
      </GestureDetector>

      <View style={styles.selectionBorder} pointerEvents="none" />

      <GestureDetector gesture={topLeftGesture}>
        <View style={[styles.handle, styles.topLeft]} />
      </GestureDetector>

      <GestureDetector gesture={topRightGesture}>
        <View style={[styles.handle, styles.topRight]} />
      </GestureDetector>

      <GestureDetector gesture={bottomLeftGesture}>
        <View style={[styles.handle, styles.bottomLeft]} />
      </GestureDetector>

      <GestureDetector gesture={bottomRightGesture}>
        <View style={[styles.handle, styles.bottomRight]} />
      </GestureDetector>

      <GestureDetector gesture={topMiddleGesture}>
        <View style={[styles.pillHandle, styles.topMiddle]} />
      </GestureDetector>

      <GestureDetector gesture={bottomMiddleGesture}>
        <View style={[styles.pillHandle, styles.bottomMiddle]} />
      </GestureDetector>

      <GestureDetector gesture={leftMiddleGesture}>
        <View style={[styles.pillHandle, styles.leftMiddle]} />
      </GestureDetector>

      <GestureDetector gesture={rightMiddleGesture}>
        <View style={[styles.pillHandle, styles.rightMiddle]} />
      </GestureDetector>

      <View style={styles.actionMenu} pointerEvents="box-none">
        <TouchableOpacity
          onPress={() => deleteLayer(layer.id)}
          style={styles.menuBtn}
        >
          <Ionicons name="trash-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => duplicateLayer(layer.id)}
          style={styles.menuBtn}
        >
          <Ionicons name="add-circle-outline" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => lockLayer(layer.id, true)}
          style={styles.menuBtn}
        >
          <Ionicons name="lock-open-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={rotateHandleGesture}>
        <View style={styles.rotateHandleContainer}>
          <View style={styles.rotateCircle}>
            <Ionicons name="reload" size={20} color="#000" />
          </View>
        </View>
      </GestureDetector>
    </View>
  );
}
const styles = StyleSheet.create({
  overlayRoot: {
    ...StyleSheet.absoluteFillObject,
    overflow: "visible",
    zIndex: 999,
    elevation: 999,
  },
  gestureSurface: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },

  selectionBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: "#fff",
  },

  lockedBorder: {
    borderColor: "rgba(255,255,255,0.35)",
    borderStyle: "dashed",
  },

  handle: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },

  pillHandle: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  topLeft: {
    top: -12,
    left: -12,
  },

  topRight: {
    top: -12,
    right: -12,
  },

  bottomLeft: {
    bottom: -12,
    left: -12,
  },

  bottomRight: {
    bottom: -12,
    right: -12,
  },

  topMiddle: {
    top: -PILL_THICKNESS / 2,
    left: "50%",
    marginLeft: -PILL_LENGTH / 2,
    width: PILL_LENGTH,
    height: PILL_THICKNESS,
  },

  bottomMiddle: {
    bottom: -PILL_THICKNESS / 2,
    left: "50%",
    marginLeft: -PILL_LENGTH / 2,
    width: PILL_LENGTH,
    height: PILL_THICKNESS,
  },

  leftMiddle: {
    left: -PILL_THICKNESS / 2,
    top: "50%",
    marginTop: -PILL_LENGTH / 2,
    width: PILL_THICKNESS,
    height: PILL_LENGTH,
  },

  rightMiddle: {
    right: -PILL_THICKNESS / 2,
    top: "50%",
    marginTop: -PILL_LENGTH / 2,
    width: PILL_THICKNESS,
    height: PILL_LENGTH,
  },

  actionMenu: {
    position: "absolute",
    bottom: -55,
    left: "50%",
    transform: [{ translateX: -60 }],
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 8,
  },

  menuBtn: {
    padding: 8,
    marginHorizontal: 4,
  },

  rotateHandleContainer: {
    position: "absolute",
    bottom: -100,
    left: "48%",
    alignItems: "center",
  },

  rotateCircle: {
    width: 32,
    height: 32,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 8,
  },
});
