import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjectStore } from "../../../stores/project.store";
import { Typography } from "../../../components/Typography";

export function PositionPanel() {
  const { selectedLayerId, bringToFront, sendToBack } = useProjectStore();

  if (!selectedLayerId) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => bringToFront(selectedLayerId)}
      >
        <Ionicons name="caret-up-outline" size={32} color="#fff" />
        <Typography style={styles.label}>Đưa lên trên cùng</Typography>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => sendToBack(selectedLayerId)}
      >
        <Ionicons name="caret-down-outline" size={32} color="#fff" />
        <Typography style={styles.label}>Đưa xuống dưới cùng</Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    padding: 24,
  },
  actionBtn: {
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#2c2c2e",
    width: 140,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    marginTop: 12,
    textAlign: "center",
  },
});
