import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjectStore } from "../../../stores/project.store";
import { Typography } from "../../../components/Typography";

const ALIGNMENTS: {
  id: string;
  icon: string;
  label: string;
  flip?: boolean;
}[] = [
  { id: "left", icon: "text-outline", label: "Trái" },
  { id: "center", icon: "menu-outline", label: "Giữa" },
  { id: "right", icon: "text-outline", label: "Phải", flip: true },
  { id: "justify", icon: "menu-outline", label: "Đều" },
];

export function AlignPanel() {
  const { selectedLayerId, layers, updateLayerStyle } = useProjectStore();
  const layer = layers.find((l) => l.id === selectedLayerId);

  if (!layer || layer.type !== "text") return null;

  const currentAlign = layer.style.textAlign || "center";

  return (
    <View style={styles.container}>
      {ALIGNMENTS.map((align) => (
        <TouchableOpacity
          key={align.id}
          style={[
            styles.alignBtn,
            currentAlign === align.id && styles.activeAlignBtn,
          ]}
          onPress={() =>
            updateLayerStyle(layer.id, { textAlign: align.id as any })
          }
        >
          <Ionicons
            name={align.icon as any}
            size={24}
            color={currentAlign === align.id ? "#EECB68" : "#fff"}
            style={align.flip ? { transform: [{ scaleX: -1 }] } : undefined}
          />
          <Typography
            style={[
              styles.label,
              currentAlign === align.id && styles.activeLabel,
            ]}
          >
            {align.label}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 24,
  },
  alignBtn: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#2c2c2e",
    width: "22%",
  },
  activeAlignBtn: {
    backgroundColor: "rgba(238, 203, 104, 0.1)",
    borderWidth: 1,
    borderColor: "#EECB68",
  },
  label: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
  },
  activeLabel: {
    color: "#EECB68",
  },
});
