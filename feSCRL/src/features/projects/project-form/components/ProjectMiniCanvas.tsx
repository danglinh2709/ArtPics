import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { ILayer, TPageBackground } from "@/src/types/editor.types";
import { resolveAssetUri } from "@/src/stores/helpers/api.utils";

interface IProjectMiniCanvasProps {
  layers: ILayer[];
  pageBackground?: TPageBackground | null;
  canvasWidth: number;
  canvasHeight: number;
  thumbnailWidth: number;
  thumbnailHeight: number;
}

export function ProjectMiniCanvas({
  layers,
  pageBackground,
  canvasWidth,
  thumbnailWidth,
  thumbnailHeight,
}: IProjectMiniCanvasProps) {
  const scale = thumbnailWidth / (canvasWidth || 1);

  const sortedLayers = [...layers].sort(
    (a, b) => (a.transform?.zIndex || 0) - (b.transform?.zIndex || 0),
  );

  return (
    // khung chứa thumbail
    <View
      style={[
        styles.container,
        {
          width: thumbnailWidth,
          height: thumbnailHeight,
          backgroundColor: pageBackground?.type === "color" ? pageBackground.color : "#fff",
          borderWidth: 0.5,
          borderColor: "rgba(255,255,255,0.1)",
        },
      ]}
    >
      {pageBackground?.type === "gradient" && (
        <LinearGradient
          colors={pageBackground.gradient.colors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {pageBackground?.type === "texture" && (
        <Image
          source={{ uri: pageBackground.textureUri }}
          style={StyleSheet.absoluteFillObject}
          contentFit="cover"
        />
      )}
      {sortedLayers.map((layer) => {
        if (!layer.isVisible) return null;

        const transform = layer.transform;
        const x = (transform?.x || 0) * scale;
        const y = (transform?.y || 0) * scale;
        const w = (transform?.width || 100) * scale;
        const h = (transform?.height || 100) * scale;
        const rotation = transform?.rotation || 0;
        const flipX = transform?.flipX ? -1 : 1;
        const flipY = transform?.flipY ? -1 : 1;

        const style = layer.style || {};
        
        let borderRadiusProp = {};
        if (style.individualCorners) {
           borderRadiusProp = {
             borderTopLeftRadius: (style.individualCorners.topLeft || 0) * scale,
             borderTopRightRadius: (style.individualCorners.topRight || 0) * scale,
             borderBottomLeftRadius: (style.individualCorners.bottomLeft || 0) * scale,
             borderBottomRightRadius: (style.individualCorners.bottomRight || 0) * scale,
           };
        } else {
           borderRadiusProp = { borderRadius: (style.borderRadius || 0) * scale };
        }

        const borderProp = style.border
          ? {
              borderWidth: style.border.width * scale,
              borderColor: style.border.color || "transparent",
            }
          : {};

        return (
          <View
            key={layer.id}
            style={[
              {
                position: "absolute",
                left: x,
                top: y,
                width: w,
                height: h,
                transform: [
                  { rotate: `${rotation}deg` },
                  { scaleX: flipX },
                  { scaleY: flipY }
                ],
                opacity: style.opacity ?? 1,
                overflow: "hidden",
              },
              borderRadiusProp,
              borderProp,
            ]}
          >
            {layer.type === "image" && (
              <Image
                source={{ uri: resolveAssetUri(layer.uri) }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
              />
            )}
            {layer.type === "text" && (
              <View style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}>
                <Text
                  style={{
                    fontSize: 24 * scale,
                    color: style.textColor || "#000",
                    textAlign: style.textAlign || "center",
                    fontFamily: style.fontFamily,
                  }}
                  adjustsFontSizeToFit
                >
                  {layer.text ?? layer.uri}
                </Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    overflow: "hidden",
  },
});
