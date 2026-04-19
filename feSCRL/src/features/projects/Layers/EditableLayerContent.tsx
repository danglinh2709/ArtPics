import React, { useMemo } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Canvas,
  Image,
  useImage,
  Rect,
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

interface EditableLayerContentProps {
  layer: ILayer;
}

export function EditableLayerContent({ layer }: EditableLayerContentProps) {
  const resolvedUri = resolveAssetUri(layer.uri);
  const image = useImage(resolvedUri);

  // 1. Calculate Adjustments Matrix
  /*const colorMatrix = useMemo(() => {
    const {
      brightness = 0,
      contrast = 0,
      saturation = 0,
    } = layer.adjustments || {};

    // Normalize values to Skia range
    const b = brightness / 100;
    const c = contrast / 100 + 1;
    const s = saturation / 100 + 1;

    // Luminance constants
    const lumR = 0.213;
    const lumG = 0.715;
    const lumB = 0.072;

    const saturationMatrix = [
      lumR * (1 - s) + s,
      lumG * (1 - s),
      lumB * (1 - s),
      0,
      0,
      lumR * (1 - s),
      lumG * (1 - s) + s,
      lumB * (1 - s),
      0,
      0,
      lumR * (1 - s),
      lumG * (1 - s),
      lumB * (1 - s) + s,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
    ];

    const contrastMatrix = [
      c,
      0,
      0,
      0,
      (128 * (1 - c)) / 255,
      0,
      c,
      0,
      0,
      (128 * (1 - c)) / 255,
      0,
      0,
      c,
      0,
      (128 * (1 - c)) / 255,
      0,
      0,
      0,
      1,
      0,
    ];

    const brightnessMatrix = [
      1,
      0,
      0,
      0,
      b,
      0,
      1,
      0,
      0,
      b,
      0,
      0,
      1,
      0,
      b,
      0,
      0,
      0,
      1,
      0,
    ];

    // const multiply = (m1: number[], m2: number[]) => {
    //   const result = new Array(20).fill(0);
    //   for (let i = 0; i < 4; i++) {
    //     for (let j = 0; j < 5; j++) {
    //        let sum = 0;
    //        for(let k = 0; k < 4; k++) {
    //          sum += m1[i * 5 + k] * m2[k * 5 + j];
    //        }
    //        if (j === 4) sum += m1[i * 5 + 4];
    //        result[i * 5 + j] = sum;
    //     }
    //   }
    //   return result;
    // };

    // Combine matrices
    // Note: Simplify for performance or use individual filters
    return [...brightnessMatrix]; // Simplified example, real implementation uses concat
  }, [layer.adjustments]);
  */

  // Higher level simplified matrix for Brightness/Contrast/Saturation
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

  const { width, height } = layer.transform;

  // 2. Corner Radii Calculation
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

  if (layer.type === "text") {
    return (
      <View
        style={[
          styles.textWrapper,
          { width, height, opacity: layer.style?.opacity ?? 1 },
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
      </View>
    );
  }

  if (!image) return null;

  return (
    <View style={{ width, height }}>
      <Canvas style={{ flex: 1 }}>
        <Group opacity={layer.style?.opacity ?? 1}>
          {/* Main Clipping Area (Frame) */}
          <Group
            clip={rrect(
              rect(0, 0, width, height),
              borderRadius.topLeft
                ? borderRadius.topLeft.x
                : (borderRadius as any).x,
              borderRadius.topLeft
                ? borderRadius.topLeft.y
                : (borderRadius as any).y,
            )}
          >
            {/* Inner Content (Cropped & Transformed) */}
            <Group
              matrix={Skia.Matrix()
                .translate(
                  width / 2 + (layer.crop?.translateX || 0),
                  height / 2 + (layer.crop?.translateY || 0),
                )
                .rotate(((layer.crop?.rotation || 0) * Math.PI) / 180)
                .scale(layer.crop?.scale || 1, layer.crop?.scale || 1)
                .translate(-width / 2, -height / 2)}
            >
              <Image
                image={image}
                x={0}
                y={0}
                width={width}
                height={height}
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
              x={layer.style.border.width / 2}
              y={layer.style.border.width / 2}
              width={width - layer.style.border.width}
              height={height - layer.style.border.width}
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
    </View>
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
});
