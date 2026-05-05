import React from "react";
import { StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useProjectStore } from "../../../stores/project.store";
import { Typography } from "../../../components/Typography";

export function OpacityPanel() {
  const { selectedLayerId, layers, updateLayerStyle, saveSnapshot } =
    useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer) return null;

  const opacity = layer.style.opacity ?? 1;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography style={styles.label}>Độ mờ</Typography>
        <Typography style={styles.value}>
          {Math.round(opacity * 100)}%
        </Typography>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={opacity}
        onSlidingStart={saveSnapshot}
        onValueChange={(v) => updateLayerStyle(layer.id, { opacity: v }, false)}
        minimumTrackTintColor="#EECB68"
        maximumTrackTintColor="rgba(255,255,255,0.2)"
        thumbTintColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    color: "#fff",
    fontSize: 14,
  },
  value: {
    color: "#EECB68",
    fontSize: 14,
    fontWeight: "bold",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});
