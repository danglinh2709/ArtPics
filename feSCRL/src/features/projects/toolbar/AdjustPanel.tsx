import Slider from "@react-native-community/slider";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { ILayerAdjustments } from "../../../types/editor.types";
import { Section } from "@/src/components/Section";
import { Ionicons } from "@expo/vector-icons";

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
  { id: "blur", label: "Làm mờ", min: 0, max: 20, defaultValue: 0 },
  { id: "sharpen", label: "Độ sắc nét", min: 0, max: 100, defaultValue: 0 },
];

export function AdjustPanel() {
  const { selectedLayerId, layers, updateLayerAdjustments } = useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer) return null;

  const handleReset = () => {
    const defaults = ADJUSTMENTS.reduce((acc, curr) => {
      acc[curr.id] = curr.defaultValue;
      return acc;
    }, {} as any);
    updateLayerAdjustments(layer.id, defaults);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {ADJUSTMENTS.map((adj) => (
        <Section 
            key={adj.id} 
            title={adj.label} 
            value={(layer.adjustments?.[adj.id] ?? adj.defaultValue).toFixed(0)}
        >
          <Slider
            style={styles.slider}
            minimumValue={adj.min}
            maximumValue={adj.max}
            value={layer.adjustments?.[adj.id] ?? adj.defaultValue}
            onValueChange={(v: number) =>
              updateLayerAdjustments(layer.id, { [adj.id]: v })
            }
            minimumTrackTintColor="#EECB68"
            maximumTrackTintColor="rgba(255,255,255,0.1)"
            thumbTintColor="#fff"
          />
        </Section>
      ))}

      <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Typography style={styles.resetText}>Đặt lại tất cả</Typography>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  slider: {
    width: "100%",
    height: 44,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

