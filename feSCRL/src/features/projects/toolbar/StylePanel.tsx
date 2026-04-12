import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import Slider from "@react-native-community/slider";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles/style-pannel.style";
import { Section } from "@/src/components/Section";

export function StylePanel() {
  const { selectedLayerId, layers, updateLayerStyle, updateLayerOpacity } =
    useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);
  const [showIndividual, setShowIndividual] = useState(
    !!layer?.style.individualCorners,
  );

  if (!layer) return null;

  const handleIndividualToggle = (value: boolean) => {
    setShowIndividual(value);
    if (!value) {
      updateLayerStyle(layer.id, { individualCorners: null });
    } else {
      updateLayerStyle(layer.id, {
        individualCorners: {
          topLeft: layer.style.borderRadius,
          topRight: layer.style.borderRadius,
          bottomLeft: layer.style.borderRadius,
          bottomRight: layer.style.borderRadius,
        },
      });
    }
  };

  const updateIndividualCorner = (key: string, value: number) => {
    const corners = { ...layer.style.individualCorners, [key]: value } as any;
    updateLayerStyle(layer.id, { individualCorners: corners });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Section
        title="Độ mờ"
        value={`${Math.round(layer.style.opacity * 100)}%`}
      >
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={layer.style.opacity}
          onValueChange={(v: number) => updateLayerOpacity(layer.id, v)}
          minimumTrackTintColor="#EECB68"
          maximumTrackTintColor="rgba(255,255,255,0.1)"
          thumbTintColor="#fff"
        />
      </Section>

      <Section
        title="Bán kính góc"
        value={`${Math.round(layer.style.borderRadius)}px`}
      >
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={layer.style.borderRadius}
          onValueChange={(v: number) =>
            updateLayerStyle(layer.id, { borderRadius: v })
          }
          minimumTrackTintColor="#EECB68"
          maximumTrackTintColor="rgba(255,255,255,0.1)"
          thumbTintColor="#fff"
          disabled={showIndividual}
        />
      </Section>

      <View style={styles.toggleRow}>
        <Typography style={styles.toggleLabel}>Các góc cá nhân</Typography>
        <Switch
          value={showIndividual}
          onValueChange={handleIndividualToggle}
          trackColor={{ false: "#3A3A3C", true: "#EECB68" }}
          thumbColor="#fff"
        />
      </View>

      {showIndividual && layer.style.individualCorners && (
        <View style={styles.individualContainer}>
          <CornerSlider
            label="Trên trái"
            value={layer.style.individualCorners.topLeft}
            onChange={(v) => updateIndividualCorner("topLeft", v)}
          />
          <CornerSlider
            label="Trên phải"
            value={layer.style.individualCorners.topRight}
            onChange={(v) => updateIndividualCorner("topRight", v)}
          />
          <CornerSlider
            label="Dưới trái"
            value={layer.style.individualCorners.bottomLeft}
            onChange={(v) => updateIndividualCorner("bottomLeft", v)}
          />
          <CornerSlider
            label="Dưới phải"
            value={layer.style.individualCorners.bottomRight}
            onChange={(v) => updateIndividualCorner("bottomRight", v)}
          />
        </View>
      )}

      <View style={styles.divider} />
      <TouchableOpacity style={styles.borderBtn}>
        <Typography style={styles.borderTitle}>Viền</Typography>
        <View style={styles.borderRight}>
          <Typography style={styles.borderValue}>
            {layer.style.border?.width || 0} px
          </Typography>
          <Ionicons name="chevron-forward" size={18} color="#8E8E93" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

function CornerSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <View style={styles.cornerRow}>
      <Typography variant="caption" style={styles.cornerLabel}>
        {label}
      </Typography>
      <Slider
        style={styles.cornerSlider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="#EECB68"
        maximumTrackTintColor="rgba(255,255,255,0.05)"
        thumbTintColor="#fff"
      />
    </View>
  );
}
