import Slider from "@react-native-community/slider";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { ILayerAdjustments } from "../../../types/editor.types";

const ADJUSTMENTS: {
  id: keyof ILayerAdjustments;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
}[] = [
  { id: "brightness", label: "Độ sáng", min: -100, max: 100, defaultValue: 0 },
  {
    id: "contrast",
    label: "Độ tương phản",
    min: -100,
    max: 100,
    defaultValue: 0,
  },
  {
    id: "saturation",
    label: "Độ bão hòa",
    min: -100,
    max: 100,
    defaultValue: 0,
  },
  { id: "blur", label: "Làm mờ", min: 0, max: 50, defaultValue: 0 },
  { id: "sharpen", label: "Độ sắc nét", min: 0, max: 100, defaultValue: 0 },
];

export function AdjustPanel() {
  const { selectedLayerId, layers, updateLayerAdjustments } = useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {ADJUSTMENTS.map((adj) => (
        <View key={adj.id} style={styles.section}>
          <View style={styles.header}>
            <Typography style={styles.label}>{adj.label}</Typography>
            <Typography variant="caption" style={styles.value}>
              {(layer.adjustments[adj.id] || 0).toFixed(0)}
            </Typography>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={adj.min}
            maximumValue={adj.max}
            value={layer.adjustments[adj.id] || adj.defaultValue}
            onValueChange={(v: number) =>
              updateLayerAdjustments(layer.id, { [adj.id]: v })
            }
            minimumTrackTintColor="#EECB68"
            maximumTrackTintColor="rgba(255,255,255,0.1)"
            thumbTintColor="#fff"
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  value: {
    color: "#EECB68",
    fontSize: 12,
    fontWeight: "800",
    backgroundColor: "rgba(238, 203, 104, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
