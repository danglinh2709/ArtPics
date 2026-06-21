import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";

const PRESET_COLORS = [
  "#ffffff",
  "#000000",
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#888888",
  "#EECB68",
];

const FONTS = [
  "System",
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "sans-serif",
  "serif",
  "monospace",
];

export function FormatPanel() {
  const { selectedLayerId, layers, updateLayerStyle } = useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer || layer.type !== "text") return null;

  const handleSelectColor = (color: string) => {
    updateLayerStyle(layer.id, { textColor: color });
  };

  const handleSelectFont = (fontFamily: string) => {
    updateLayerStyle(layer.id, { fontFamily });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Typography style={styles.sectionTitle}>Màu chữ</Typography>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.colorScroll}
        >
          {PRESET_COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorBtn,
                { backgroundColor: color },
                layer.style.textColor === color && styles.activeColorBtn,
              ]}
              onPress={() => handleSelectColor(color)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Typography style={styles.sectionTitle}>Phông chữ</Typography>
        <View style={styles.fontContainer}>
          {FONTS.map((font) => (
            <TouchableOpacity
              key={font}
              style={[
                styles.fontBtn,
                (layer.style.fontFamily === font ||
                  (!layer.style.fontFamily && font === "System")) &&
                  styles.activeFontBtn,
              ]}
              onPress={() => handleSelectFont(font === "System" ? "" : font)}
            >
              <Typography
                style={[
                  styles.fontText,
                  { fontFamily: font === "System" ? undefined : font },
                ]}
              >
                {font.toUpperCase()}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 12,
  },
  colorScroll: {
    gap: 12,
  },
  colorBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  activeColorBtn: {
    borderWidth: 2,
    borderColor: "#EECB68",
  },
  fontContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  fontBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#2c2c2e",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeFontBtn: {
    borderColor: "#EECB68",
    backgroundColor: "rgba(238, 203, 104, 0.1)",
  },
  fontText: {
    color: "#fff",
    fontSize: 14,
  },
});
