import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { styles } from "./styles/background-panel.style";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import {
  PRESET_COLORS,
  PRESET_GRADIENTS,
  PRESET_TEXTURES,
} from "@/src/configs/background-panel.config";
import {
  PAGE_BACKGROUND_OPTIONS,
  TPageBackgroundType,
} from "@/src/constants/editor-tabs.constants";

export function BackgroundPanel() {
  const {
    selectedLayerId,
    layers,
    updateLayerStyle,
    pageBackground,
    updatePageBackground,
  } = useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);
  const [activeTab, setActiveTab] = useState<TPageBackgroundType>(
    PAGE_BACKGROUND_OPTIONS[0].key,
  );

  const currentBg = layer ? layer.style.background : pageBackground;

  const handleSelectColor = (color: string) => {
    if (color === "transparent") {
      if (layer) {
        updateLayerStyle(layer.id, { background: null });
      } else {
        updatePageBackground({ type: "color", color: "transparent" });
      }
    } else {
      const bg = { type: "color" as const, color };
      if (layer) {
        updateLayerStyle(layer.id, { background: bg });
      } else {
        updatePageBackground(bg);
      }
    }
  };

  const handleSelectGradient = (grad: { colors: string[]; angle: number }) => {
    const bg = { type: "gradient" as const, gradient: grad };
    if (layer) {
      updateLayerStyle(layer.id, { background: bg });
    } else {
      updatePageBackground(bg);
    }
  };

  const handleSelectTexture = (uri: string) => {
    const bg = { type: "texture" as const, textureUri: uri };
    if (layer) {
      updateLayerStyle(layer.id, { background: bg });
    } else {
      updatePageBackground(bg);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Segmented Tabs */}
      <View style={styles.tabContainer}>
        {PAGE_BACKGROUND_OPTIONS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Typography
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Grids */}
      <View style={styles.grid}>
        {/* COLOR TAB: Circular Swatches + Color Wheel */}
        {activeTab === "color" && (
          <>
            {/* Custom Color Wheel Button */}
            <TouchableOpacity
              style={styles.colorContainer}
              // In the future, this would open a specific Color Picker Modal
              onPress={() => {}}
            >
              <LinearGradient
                colors={[
                  "#FF0000",
                  "#FF7F00",
                  "#FFFF00",
                  "#00FF00",
                  "#0000FF",
                  "#4B0082",
                  "#9400D3",
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.colorWheelIcon}
              >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 999, padding: 2 }}>
                  <Ionicons name="color-palette" size={16} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Default Presets */}
            {PRESET_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorContainer,
                  currentBg?.type === "color" &&
                    currentBg.color === color &&
                    styles.selectedColorContainer,
                  color === "transparent" && !currentBg && styles.selectedColorContainer,
                ]}
                onPress={() => handleSelectColor(color)}
              >
                {color === "transparent" ? (
                  <View style={styles.transparentIcon}>
                    <Ionicons name="ban-outline" size={20} color="#8E8E93" />
                  </View>
                ) : (
                  <View
                    style={[styles.colorPreview, { backgroundColor: color }]}
                  />
                )}
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* GRADIENT TAB: 4-Column Rounded Squares */}
        {activeTab === "gradient" &&
          PRESET_GRADIENTS.map((grad, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.squareContainer,
                currentBg?.type === "gradient" &&
                  JSON.stringify(currentBg.gradient) === JSON.stringify(grad) &&
                  styles.selectedSquareContainer,
              ]}
              onPress={() => handleSelectGradient(grad)}
            >
              <LinearGradient
                colors={grad.colors as any}
                style={styles.squarePreview}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </TouchableOpacity>
          ))}

        {/* TEXTURE TAB: 4-Column Textures */}
        {activeTab === "texture" &&
          PRESET_TEXTURES.map((tex, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.squareContainer,
                currentBg?.type === "texture" &&
                  currentBg.textureUri === tex.uri &&
                  styles.selectedSquareContainer,
              ]}
              onPress={() => handleSelectTexture(tex.uri)}
            >
              <View
                style={[styles.squarePreview, { backgroundColor: "#2C2C2E" }]} // fallback dark background
              >
                 <Image
                    source={{ uri: tex.uri }}
                    style={styles.textureImage}
                    resizeMode="cover"
                 />
              </View>
            </TouchableOpacity>
          ))}
      </View>
      {/* Provide padding bottom for scrollable content */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}
