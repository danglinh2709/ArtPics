import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { ILayer } from "@/src/types/editor.types";
import { resolveAssetUri } from "@/src/stores/helpers/api.utils";

interface IProjectMiniCanvasProps {
  layers: ILayer[];
  canvasWidth: number;
  canvasHeight: number;
  thumbnailWidth: number;
  thumbnailHeight: number;
}

export function ProjectMiniCanvas({
  layers,
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
          backgroundColor: "#fff",
          borderWidth: 0.5,
          borderColor: "rgba(255,255,255,0.1)",
        },
      ]}
    >
      {sortedLayers.map((layer) => {
        if (!layer.isVisible) return null;

        // từ scale xuống thumbnail, xác định vị trí và kích thước của layer để render
        const transform = layer.transform;
        const x = (transform?.x || 0) * scale;
        const y = (transform?.y || 0) * scale;
        const w = (transform?.width || 100) * scale;
        const h = (transform?.height || 100) * scale;
        const rotation = transform?.rotation || 0;

        // render layer
        return (
          <View
            key={layer.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: w,
              height: h,
              transform: [{ rotate: `${rotation}deg` }],
              opacity: layer.style?.opacity ?? 1,
              overflow: "hidden",
              borderRadius: (layer.style?.borderRadius || 0) * scale,
              borderWidth: 0.2,
              borderColor: "rgba(0,0,0,0.05)",
            }}
          >
            {layer.type === "image" && (
              <Image
                source={{ uri: resolveAssetUri(layer.uri) }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
              />
            )}
            {layer.type === "text" && (
              <Text
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  fontSize: 24 * scale,
                  color: "#000",
                  textAlign: "center",
                }}
              >
                {layer.text ?? layer.uri}
              </Text>
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
