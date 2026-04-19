import React, { forwardRef } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { LayerItem } from "../../Layers/LayerItem";
import { ILayer, TPageBackground } from "@/src/types/editor.types";
import ViewShot from "react-native-view-shot";
import { PAGE_BACKGROUND_TYPES } from "@/src/constants/editor-tabs.constants";

interface IEditorCanvasProps {
  canvasWidth: number;
  canvasHeight: number;
  layers: ILayer[];
  selectedLayerId: string | null;
  isCropping: boolean;
  pageBackground: TPageBackground;
  onCanvasPress: () => void;
  gesture: ReturnType<
    typeof import("react-native-gesture-handler").Gesture.Simultaneous
  >;
  animatedStyle: any;
}

export const EditorCanvas = forwardRef<ViewShot, IEditorCanvasProps>(
  (
    {
      canvasWidth,
      canvasHeight,
      layers,
      selectedLayerId,
      isCropping,
      pageBackground,
      onCanvasPress,
      gesture,
      animatedStyle,
    },
    ref,
  ) => {
    return (
      <View style={styles.editorArea}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              styles.canvasWrapper,
              { width: canvasWidth, height: canvasHeight },
              animatedStyle,
            ]}
          >
            <ViewShot
              ref={ref}
              options={{ format: "png", quality: 1.0 }}
              style={styles.canvasContainer}
            >
              <TouchableOpacity
                activeOpacity={1}
                style={[
                  styles.canvas,
                  pageBackground?.type === PAGE_BACKGROUND_TYPES.COLOR && {
                    backgroundColor: pageBackground.color,
                  },
                ]}
                onPress={onCanvasPress}
              >
                {pageBackground?.type === PAGE_BACKGROUND_TYPES.GRADIENT && (
                  <LinearGradient
                    colors={pageBackground.gradient.colors as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                  />
                )}
                {pageBackground?.type === PAGE_BACKGROUND_TYPES.TEXTURE && (
                  <Image
                    source={{ uri: pageBackground.textureUri }}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                )}
                {layers.map((layer) => (
                  <LayerItem
                    key={`content-${layer.id}`}
                    layer={layer}
                    isSelected={selectedLayerId === layer.id}
                    isCropping={isCropping}
                    renderMode="content"
                  />
                ))}
              </TouchableOpacity>
            </ViewShot>

            <View style={styles.overlayLayer} pointerEvents="box-none">
              {layers.map((layer) => {
                if (layer.id !== selectedLayerId) return null;
                return (
                  <LayerItem
                    key={`overlay-${layer.id}`}
                    layer={layer}
                    isSelected={true}
                    isCropping={isCropping}
                    renderMode="overlay"
                  />
                );
              })}
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  editorArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  canvasWrapper: {
    position: "relative",
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 20,
    overflow: "hidden",
  },
  canvas: {
    flex: 1,
  },
  overlayLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "visible",
    zIndex: 99,
  },
});
