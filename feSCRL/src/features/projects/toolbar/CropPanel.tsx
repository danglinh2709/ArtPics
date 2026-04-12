import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { RATIOS } from "@/src/configs/cropPannel.config";

function cropRatiosEqual(
  a: number | null | undefined,
  b: number | null | undefined,
): boolean {
  if (a == null && b == null) return true;
  if (a == null || b == null) return false;
  return Math.abs(a - b) < 0.001;
}

export function CropPanel() {
  const {
    selectedLayerId,
    layers,
    updateLayerCrop,
    resetLayerCrop,
    setLayerFrameRatio,
  } = useProjectStore();

  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Typography variant="caption" style={styles.sectionTitle}>
        Tỷ lệ khung (Shape)
      </Typography>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ratioList}>
        {RATIOS.map((r) => (
          <TouchableOpacity
            key={r.id}
            style={[
              styles.ratioItem,
              cropRatiosEqual(layer.crop.aspectRatio, r.ratio) && styles.activeRatio,
            ]}
            onPress={() => {
              if (r.ratio && selectedLayerId) {
                setLayerFrameRatio(selectedLayerId, r.ratio);
              }
            }}
          >
            <View style={[styles.ratioBox, { aspectRatio: r.ratio || 1 }]} />
            <Typography
              variant="caption"
              style={[
                styles.ratioLabel,
                cropRatiosEqual(layer.crop.aspectRatio, r.ratio) && styles.activeLabel,
              ]}
            >
              {r.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.controlRow}>
        <View style={styles.controlSection}>
          <Typography variant="caption" style={styles.sectionTitle}>Zoom nội dung</Typography>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            value={layer.crop.scale}
            onValueChange={(v: number) => updateLayerCrop(layer.id, { scale: v })}
            minimumTrackTintColor="#EECB68"
            maximumTrackTintColor="rgba(255,255,255,0.1)"
            thumbTintColor="#fff"
          />
        </View>
        <View style={styles.controlSection}>
          <Typography variant="caption" style={styles.sectionTitle}>Xoay nội dung</Typography>
          <Slider
            style={styles.slider}
            minimumValue={-180}
            maximumValue={180}
            value={layer.crop.rotation}
            onValueChange={(v: number) => updateLayerCrop(layer.id, { rotation: v })}
            minimumTrackTintColor="#EECB68"
            maximumTrackTintColor="rgba(255,255,255,0.1)"
            thumbTintColor="#fff"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.resetBtn} onPress={() => resetLayerCrop(layer.id)}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Typography style={styles.resetText}>Đặt lại</Typography>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 12,
  },
  ratioList: {
    flexDirection: "row",
    marginBottom: 24,
  },
  ratioItem: {
    alignItems: "center",
    marginRight: 24,
    width: 60,
  },
  activeRatio: {},
  ratioBox: {
    width: 28,
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  ratioLabel: {
    fontSize: 10,
    color: "#8E8E93",
    fontWeight: "600",
  },
  activeLabel: {
    color: "#EECB68",
  },
  controlRow: {
    flexDirection: "column",
    marginBottom: 20,
  },
  controlSection: {
    marginBottom: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 14,
    borderRadius: 14,
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
