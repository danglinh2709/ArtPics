import { Gesture } from "react-native-gesture-handler";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import {
  applyResizeFromHandle,
  clampSize,
} from "../utils/selectionOverlay.utils";
import { MIN_HEIGHT, MIN_WIDTH } from "../constants/selectionOverlay.constants";
import { TResizeHandle } from "../types/selectionOverlay.types";

type TSharedNumber = { value: number };

interface IUseSelectionOverlayGesturesParams {
  layerLocked: boolean;

  tx: TSharedNumber;
  ty: TSharedNumber;
  rotation: TSharedNumber;
  width: TSharedNumber;
  height: TSharedNumber;

  commitTransform: () => void;
}

export function useSelectionOverlayGestures({
  layerLocked,
  tx,
  ty,
  rotation,
  width,
  height,
  commitTransform,
}: IUseSelectionOverlayGesturesParams) {
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startWidth = useSharedValue(0);
  const startHeight = useSharedValue(0);
  const startRotation = useSharedValue(0);

  const startPointerX = useSharedValue(0);
  const startPointerY = useSharedValue(0);

  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const startAngle = useSharedValue(0);

  const pinchStartWidth = useSharedValue(0);
  const pinchStartHeight = useSharedValue(0);
  const pinchCenterX = useSharedValue(0);
  const pinchCenterY = useSharedValue(0);

  const dragGesture = Gesture.Pan()
    .enabled(!layerLocked)
    .minPointers(1)
    .maxPointers(1)
    .onStart(() => {
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

  const pinchGesture = Gesture.Pinch()
    .enabled(!layerLocked)
    .onStart(() => {
      pinchStartWidth.value = width.value;
      pinchStartHeight.value = height.value;
      pinchCenterX.value = tx.value + width.value / 2;
      pinchCenterY.value = ty.value + height.value / 2;
    })
    .onUpdate((e) => {
      const nextWidth = clampSize(pinchStartWidth.value * e.scale, MIN_WIDTH);
      const nextHeight = clampSize(
        pinchStartHeight.value * e.scale,
        MIN_HEIGHT,
      );

      width.value = nextWidth;
      height.value = nextHeight;
      tx.value = pinchCenterX.value - nextWidth / 2;
      ty.value = pinchCenterY.value - nextHeight / 2;
    })
    .onEnd(() => {
      runOnJS(commitTransform)();
    });

  const twoFingerRotateGesture = Gesture.Rotation()
    .enabled(!layerLocked)
    .onStart(() => {
      startRotation.value = rotation.value;
    })
    .onUpdate((e) => {
      rotation.value = startRotation.value + e.rotation;
    })
    .onEnd(() => {
      runOnJS(commitTransform)();
    });

  const contentGesture = Gesture.Simultaneous(
    dragGesture,
    pinchGesture,
    twoFingerRotateGesture,
  );

  const rotateHandleGesture = Gesture.Pan()
    .enabled(!layerLocked)
    .onStart((e) => {
      startRotation.value = rotation.value;

      centerX.value = tx.value + width.value / 2;
      centerY.value = ty.value + height.value / 2;

      const dx = e.absoluteX - centerX.value;
      const dy = e.absoluteY - centerY.value;

      startAngle.value = Math.atan2(dy, dx);
    })
    .onUpdate((e) => {
      const dx = e.absoluteX - centerX.value;
      const dy = e.absoluteY - centerY.value;

      const currentAngle = Math.atan2(dy, dx);
      rotation.value = startRotation.value + (currentAngle - startAngle.value);
    })
    .onEnd(() => {
      runOnJS(commitTransform)();
    });

  const createResizeGesture = (handle: TResizeHandle) =>
    Gesture.Pan()
      .enabled(!layerLocked)
      .onStart((e) => {
        startPointerX.value = e.absoluteX;
        startPointerY.value = e.absoluteY;

        startX.value = tx.value;
        startY.value = ty.value;
        startWidth.value = width.value;
        startHeight.value = height.value;
      })
      .onUpdate((e) => {
        const dx = e.absoluteX - startPointerX.value;
        const dy = e.absoluteY - startPointerY.value;

        const next = applyResizeFromHandle({
          handle,
          dx,
          dy,
          startX: startX.value,
          startY: startY.value,
          startWidth: startWidth.value,
          startHeight: startHeight.value,
          rotationRad: rotation.value,
        });

        tx.value = next.x;
        ty.value = next.y;
        width.value = next.width;
        height.value = next.height;
      })
      .onEnd(() => {
        runOnJS(commitTransform)();
      });

  return {
    contentGesture,
    rotateHandleGesture,
    topLeftGesture: createResizeGesture("topLeft"),
    topMiddleGesture: createResizeGesture("topMiddle"),
    topRightGesture: createResizeGesture("topRight"),
    rightMiddleGesture: createResizeGesture("rightMiddle"),
    bottomRightGesture: createResizeGesture("bottomRight"),
    bottomMiddleGesture: createResizeGesture("bottomMiddle"),
    bottomLeftGesture: createResizeGesture("bottomLeft"),
    leftMiddleGesture: createResizeGesture("leftMiddle"),
  };
}
