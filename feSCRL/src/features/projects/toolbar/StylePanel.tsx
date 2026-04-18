import React, { useState } from "react";
import { ScrollView, Switch, View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles/style-pannel.style";
import { Section } from "@/src/components/Section";

export function StylePanel() {
  const { selectedLayerId, layers, updateLayerStyle, updateLayerOpacity } =
    useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);
  const [showIndividual, setShowIndividual] = useState(
    !!layer?.style?.individualCorners,
  );

  if (!layer) return null;

  const handleIndividualToggle = (value: boolean) => {
    setShowIndividual(value);
    if (!value) {
      updateLayerStyle(layer.id, { individualCorners: null });
    } else {
      const radius = layer.style?.borderRadius ?? 0;
      updateLayerStyle(layer.id, {
        individualCorners: {
          topLeft: radius,
          topRight: radius,
          bottomLeft: radius,
          bottomRight: radius,
        },
      });
    }
  };

  const updateIndividualCorner = (key: string, value: number) => {
    const corners = { 
      ...(layer.style?.individualCorners || { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 }), 
      [key]: value 
    };
    updateLayerStyle(layer.id, { individualCorners: corners as any });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Section
        title="Độ mờ"
        value={`${Math.round((layer.style?.opacity ?? 1) * 100)}%`}
      >
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={layer.style?.opacity ?? 1}
          onValueChange={(v: number) => updateLayerOpacity(layer.id, v)}
          minimumTrackTintColor="#EECB68"
          maximumTrackTintColor="rgba(255,255,255,0.1)"
          thumbTintColor="#fff"
        />
      </Section>

      <Section
        title="Bán kính góc"
        value={`${Math.round(layer.style?.borderRadius ?? 0)}px`}
      >
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          value={layer.style?.borderRadius ?? 0}
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

      {showIndividual && layer.style?.individualCorners && (
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

      <Section title="Viền" value={`${layer.style?.border?.width ?? 0}px`}>
        <View style={styles.borderControls}>
          <Typography variant="caption" style={styles.subLabel}>Độ dày</Typography>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={20}
            value={layer.style?.border?.width ?? 0}
            onValueChange={(v) => updateLayerStyle(layer.id, { 
              border: { ...(layer.style?.border || { color: "#fff", opacity: 1 }), width: v } 
            })}
            minimumTrackTintColor="#EECB68"
            maximumTrackTintColor="rgba(255,255,255,0.1)"
            thumbTintColor="#fff"
          />
          
          <View style={styles.borderColorRow}>
             <Typography variant="caption" style={styles.subLabel}>Màu sắc</Typography>
             <View style={styles.colorPredefined}>
                {["#ffffff", "#000000", "#ff3b30", "#4cd964", "#007aff", "#EECB68"].map(c => (
                  <TouchableOpacity 
                    key={c}
                    style={[styles.colorCircle, { backgroundColor: c }, layer.style?.border?.color === c && styles.activeColor]} 
                    onPress={() => updateLayerStyle(layer.id, { 
                      border: { ...(layer.style?.border || { width: 1, opacity: 1 }), color: c } 
                    })}
                  />
                ))}
             </View>
          </View>
        </View>
      </Section>
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

