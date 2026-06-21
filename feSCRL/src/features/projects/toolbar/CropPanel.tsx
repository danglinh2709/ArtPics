import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { RATIOS } from "@/src/configs/cropPannel.config";
import { Section } from "@/src/components/Section";

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
    saveSnapshot,
  } = useProjectStore();

  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Section title="Tỷ lệ khung (Shape)">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.ratioList}
          contentContainerStyle={styles.ratioListContent}
        >
          {RATIOS.map((r) => (
            <TouchableOpacity
              key={r.id}
              style={[
                styles.ratioItem,
                cropRatiosEqual(layer.crop.aspectRatio, r.ratio) &&
                  styles.activeRatio,
              ]}
              onPress={() => {
                if (r.ratio && selectedLayerId) {
                  setLayerFrameRatio(selectedLayerId, r.ratio);
                } else if (!r.ratio && selectedLayerId) {
                  updateLayerCrop(selectedLayerId, { aspectRatio: null });
                }
              }}
            >
              <View
                style={[
                  styles.ratioBox,
                  { aspectRatio: r.ratio || 1 },
                  cropRatiosEqual(layer.crop.aspectRatio, r.ratio) &&
                    styles.activeRatioBox,
                ]}
              />
              <Typography
                variant="caption"
                style={[
                  styles.ratioLabel,
                  cropRatiosEqual(layer.crop.aspectRatio, r.ratio) &&
                    styles.activeLabel,
                ]}
              >
                {r.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Section>

      <Section title="Zoom nội dung" value={`${layer.crop.scale.toFixed(1)}x`}>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={0.1}
          value={layer.crop.scale}
          onSlidingStart={saveSnapshot}
          onValueChange={(v: number) =>
            updateLayerCrop(layer.id, { scale: v }, false)
          }
          minimumTrackTintColor="#EECB68"
          maximumTrackTintColor="rgba(255,255,255,0.1)"
          thumbTintColor="#fff"
        />
      </Section>

      <Section
        title="Xoay nội dung"
        value={`${Math.round(layer.crop.rotation)}°`}
      >
        <Slider
          style={styles.slider}
          minimumValue={-180}
          maximumValue={180}
          value={layer.crop.rotation}
          onSlidingStart={saveSnapshot}
          onValueChange={(v: number) =>
            updateLayerCrop(layer.id, { rotation: v }, false)
          }
          minimumTrackTintColor="#EECB68"
          maximumTrackTintColor="rgba(255,255,255,0.1)"
          thumbTintColor="#fff"
        />
      </Section>

      <TouchableOpacity
        style={styles.resetBtn}
        onPress={() => resetLayerCrop(layer.id)}
      >
        <Ionicons name="refresh" size={18} color="#fff" />
        <Typography style={styles.resetText}>Đặt lại khung hình</Typography>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  ratioList: {
    paddingVertical: 10,
  },
  ratioListContent: {
    paddingHorizontal: 15,
  },
  ratioItem: {
    alignItems: "center",
    marginRight: 24,
    minWidth: 50,
  },
  activeRatio: {},
  ratioBox: {
    width: 28,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  activeRatioBox: {
    borderColor: "#EECB68",
    backgroundColor: "rgba(238, 203, 104, 0.1)",
    borderWidth: 2,
  },
  ratioLabel: {
    fontSize: 10,
    color: "#8E8E93",
    fontWeight: "600",
  },
  activeLabel: {
    color: "#EECB68",
    fontWeight: "700",
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
