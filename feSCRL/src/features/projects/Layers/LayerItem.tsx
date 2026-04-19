import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useProjectStore } from "@/src/stores/project.store";
import { EditableLayerContent } from "./EditableLayerContent";
import { SelectionOverlayUI } from "./SelectionOverlayUI";
import { ILayerTransformValues } from "@/src/types/layer.type";
import { ILayer } from "@/src/types/editor.types";
import { useSelectionSync } from "@/src/context/SelectionSyncContext";

interface ILayerItemProps {
  layer: ILayer;
  isSelected: boolean;
  isCropping?: boolean;
  renderMode?: "content" | "overlay" | "full";
}

export function LayerItem({
  layer,
  isSelected,
  isCropping = false,
  renderMode = "full",
}: ILayerItemProps) {
  const { updateLayerTransform, selectLayer } = useProjectStore();
  const {
    transformValues: syncValues,
    reportTransform,
    initializeSync,
  } = useSelectionSync();

  const internalTx = useSharedValue(layer.transform.x);
  const internalTy = useSharedValue(layer.transform.y);
  const internalRotation = useSharedValue(
    (layer.transform.rotation * Math.PI) / 180,
  );
  const internalWidth = useSharedValue(layer.transform.width);
  const internalHeight = useSharedValue(layer.transform.height);

  useEffect(() => {
    if (isSelected && renderMode === "content") {
      initializeSync({
        tx: internalTx.value,
        ty: internalTy.value,
        rotation: internalRotation.value,
        width: internalWidth.value,
        height: internalHeight.value,
      });
    }
  }, [isSelected, renderMode]);

  const tx = isSelected ? syncValues.tx : internalTx;
  const ty = isSelected ? syncValues.ty : internalTy;
  const rotation = isSelected ? syncValues.rotation : internalRotation;
  const width = isSelected ? syncValues.width : internalWidth;
  const height = isSelected ? syncValues.height : internalHeight;

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  useEffect(() => {
    if (renderMode !== "overlay") {
      internalTx.value = layer.transform.x;
      internalTy.value = layer.transform.y;
      internalRotation.value = (layer.transform.rotation * Math.PI) / 180;
      internalWidth.value = layer.transform.width;
      internalHeight.value = layer.transform.height;
    }
  }, [
    layer.transform,
    internalTx,
    internalTy,
    internalRotation,
    internalWidth,
    internalHeight,
    renderMode,
  ]);

  const commitTransform = () => {
    updateLayerTransform(layer.id, {
      x: tx.value,
      y: ty.value,
      rotation: (rotation.value * 180) / Math.PI,
      width: width.value,
      height: height.value,
    });
  };

  const panGesture = Gesture.Pan()
    .enabled(!layer.isLocked && !isCropping && renderMode !== "overlay")
    .onStart(() => {
      runOnJS(selectLayer)(layer.id);
      startX.value = tx.value;
      startY.value = ty.value;
    })
    .onUpdate((e) => {
      tx.value = startX.value + e.translationX;
      ty.value = startY.value + e.translationY;
    })
    .onEnd(() => {
      runOnJS(commitTransform)();
    });

  const wrapperStyle = useAnimatedStyle(() => ({
    position: "absolute" as const,
    left: 0,
    top: 0,
    width: width.value,
    height: height.value,
    zIndex: layer.transform.zIndex || (isSelected ? 99 : 1),
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  const transformValues: ILayerTransformValues = {
    tx,
    ty,
    rotation,
    width,
    height,
  };

  if (renderMode === "overlay") {
    return (
      <Animated.View style={wrapperStyle} pointerEvents="box-none">
        <SelectionOverlayUI
          layer={layer}
          transformValues={transformValues}
          commitTransform={commitTransform}
        />
      </Animated.View>
    );
  }

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={wrapperStyle}>
        <EditableLayerContent layer={layer} width={width} height={height} />

        {isSelected && renderMode === "full" && (
          <SelectionOverlayUI
            layer={layer}
            transformValues={transformValues}
            commitTransform={commitTransform}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
}
