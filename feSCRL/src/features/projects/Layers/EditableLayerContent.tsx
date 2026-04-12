import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { resolveAssetUri } from "@/src/stores/project.store";
import { ILayer } from "@/src/types/editor.types";

interface EditableLayerContentProps {
  layer: ILayer;
}

export function EditableLayerContent({ layer }: EditableLayerContentProps) {
  if (layer.type === "text") {
    return (
      <Text
        style={[
          styles.text,
          {
            width: layer.transform.width,
            height: layer.transform.height,
            opacity: layer.style.opacity,
          },
        ]}
      >
        {layer.uri}
      </Text>
    );
  }

  return (
    <Image
      key={layer.uri}
      source={{ uri: resolveAssetUri(layer.uri) }}
      style={styles.image}
      contentFit="cover"
      onError={(e) => {
        console.error(
          `[EditableLayerContent] Failed to load: ${layer.uri}`,
          e.error,
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: "#000",
    textAlign: "center",
  },
});
