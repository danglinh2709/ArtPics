import React, { useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Canvas,
  Image,
  useImage,
  Group,
  ColorMatrix,
  Blur,
  RoundedRect,
  rrect,
  rect,
  Skia,
} from "@shopify/react-native-skia";
import { resolveAssetUri } from "@/src/stores/project.store";
import { ILayer } from "@/src/types/editor.types";
import {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import Animated from "react-native-reanimated";

interface EditableLayerContentProps {
  layer: ILayer;
  width?: number | SharedValue<number>;
  height?: number | SharedValue<number>;
}

export function EditableLayerContent({
  layer,
  width: propsWidth,
  height: propsHeight,
}: EditableLayerContentProps) {
  const resolvedUri = resolveAssetUri(layer.uri);
  const image = useImage(resolvedUri);

  const canvasWidth = propsWidth ?? layer.transform.width;
  const canvasHeight = propsHeight ?? layer.transform.height;

  // 1. Root Container Style (Animated)
  const animatedContainerStyle = useAnimatedStyle(() => {
    const w = typeof canvasWidth === "number" ? canvasWidth : canvasWidth.value;
    const h =
      typeof canvasHeight === "number" ? canvasHeight : canvasHeight.value;
    return {
      width: w,
      height: h,
    };
  });

  // 2. Corner Radii Calculation (Memoized as it depends on layer.style)
  const borderRadius = useMemo(() => {
    if (layer.style?.individualCorners) {
      const { topLeft, topRight, bottomLeft, bottomRight } =
        layer.style.individualCorners;
      return {
        topLeft: { x: topLeft, y: topLeft },
        topRight: { x: topRight, y: topRight },
        bottomLeft: { x: bottomLeft, y: bottomLeft },
        bottomRight: { x: bottomRight, y: bottomRight },
      };
    }
    const r = layer.style?.borderRadius || 0;
    return { x: r, y: r };
  }, [layer.style]);

  // 3. Image Filter Matrix (Memoized)
  const matrix = useMemo(() => {
    const b = (layer.adjustments?.brightness || 0) / 255;
    const c = (layer.adjustments?.contrast || 0) / 100 + 1;
    const s = (layer.adjustments?.saturation || 0) / 100 + 1;
    const t = (1 - c) / 2;
    const lumR = 0.212671;
    const lumG = 0.71516;
    const lumB = 0.072169;
    const sr = (1 - s) * lumR;
    const sg = (1 - s) * lumG;
    const sb = (1 - s) * lumB;

    return [
      c * (sr + s),
      c * sg,
      c * sb,
      0,
      c * (t + b),
      c * sr,
      c * (sg + s),
      c * sb,
      0,
      c * (t + b),
      c * sr,
      c * sg,
      c * (sb + s),
      0,
      c * (t + b),
      0,
      0,
      0,
      1,
      0,
    ];
  }, [layer.adjustments]);

  // 4. Reactive Clipping Area
  const clipRRect = useDerivedValue(() => {
    const w = typeof canvasWidth === "number" ? canvasWidth : canvasWidth.value;
    const h =
      typeof canvasHeight === "number" ? canvasHeight : canvasHeight.value;

    return rrect(
      rect(0, 0, w, h),
      borderRadius.topLeft ? borderRadius.topLeft.x : (borderRadius as any).x,
      borderRadius.topLeft ? borderRadius.topLeft.y : (borderRadius as any).y,
    );
  }, [canvasWidth, canvasHeight, borderRadius]);

  // 5. Reactive Skia Matrix for Internal transform (Anchor point handling)
  const skiaMatrix = useDerivedValue(() => {
    const w = typeof canvasWidth === "number" ? canvasWidth : canvasWidth.value;
    const h =
      typeof canvasHeight === "number" ? canvasHeight : canvasHeight.value;

    return Skia.Matrix()
      .translate(
        w / 2 + (layer.crop?.translateX || 0),
        h / 2 + (layer.crop?.translateY || 0),
      )
      .rotate(((layer.crop?.rotation || 0) * Math.PI) / 180)
      .scale(layer.crop?.scale || 1, layer.crop?.scale || 1)
      .translate(-w / 2, -h / 2);
  }, [canvasWidth, canvasHeight, layer.crop]);

  // 6. Reactive Border Dims
  const borderDims = useDerivedValue(() => {
    const w = typeof canvasWidth === "number" ? canvasWidth : canvasWidth.value;
    const h =
      typeof canvasHeight === "number" ? canvasHeight : canvasHeight.value;
    const bw = layer.style?.border?.width || 0;
    return {
      x: bw / 2,
      y: bw / 2,
      width: w - bw,
      height: h - bw,
    };
  }, [canvasWidth, canvasHeight, layer.style?.border?.width]);

  // RENDERING
  if (layer.type === "text") {
    return (
      <Animated.View
        style={[
          styles.textWrapper,
          animatedContainerStyle,
          { opacity: layer.style?.opacity ?? 1 },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              color: layer.style?.textColor || "#000",
              textAlign: layer.style?.textAlign || "center",
              fontFamily: layer.style?.fontFamily,
              fontSize: 24,
            },
          ]}
        >
          {layer.text ?? ""}
        </Text>
      </Animated.View>
    );
  }

  if (!image) return null;

  return (
    <Animated.View style={animatedContainerStyle}>
      <Canvas style={styles.canvas}>
        <Group opacity={layer.style?.opacity ?? 1}>
          {/* Main Clipping Area */}
          <Group clip={clipRRect}>
            <Group matrix={skiaMatrix}>
              <Image
                image={image}
                x={0}
                y={0}
                width={canvasWidth}
                height={canvasHeight}
                fit="cover"
              >
                <ColorMatrix matrix={matrix} />
                {layer.adjustments?.blur > 0 && (
                  <Blur blur={layer.adjustments.blur / 2} />
                )}
              </Image>
            </Group>
          </Group>

          {/* Border (Drawn on top) */}
          {layer.style?.border && layer.style.border.width > 0 && (
            <RoundedRect
              x={borderDims.value.x}
              y={borderDims.value.y}
              width={borderDims.value.width}
              height={borderDims.value.height}
              r={
                borderRadius.topLeft
                  ? borderRadius.topLeft.x
                  : (borderRadius as any).x
              }
              color={layer.style.border.color}
              opacity={layer.style.border.opacity ?? 1}
              style="stroke"
              strokeWidth={layer.style.border.width}
            />
          )}
        </Group>
      </Canvas>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  canvas: {
    flex: 1,
  },
});
