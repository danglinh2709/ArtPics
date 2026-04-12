import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface IEditorTopBarProps {
  onBack: () => void;
  onExport: () => void;
}

export function EditorTopBar({ onBack, onExport }: IEditorTopBarProps) {
  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.topBarRight}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="arrow-undo" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="arrow-redo" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="ellipsis-horizontal-circle" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={onExport}>
          <Ionicons name="share-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 20,
  },
});
