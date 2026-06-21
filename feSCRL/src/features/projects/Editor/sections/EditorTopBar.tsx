import { Ionicons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useProjectStore } from "@/src/stores/project.store";

interface IEditorTopBarProps {
  onBack: () => void;
  onExport: () => void;
}

export function EditorTopBar({ onBack, onExport }: IEditorTopBarProps) {
  const { undo, redo, pastStack, futureStack } = useProjectStore();

  const handleUndo = useCallback(() => {
    undo();
  }, [undo]);

  const handleRedo = useCallback(() => {
    redo();
  }, [redo]);

  const hasUndo = pastStack.length > 0;
  const hasRedo = futureStack.length > 0;

  return (
    <View style={styles.topBar}>
      <TouchableOpacity onPress={onBack}>
        <Ionicons name="chevron-back" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.topBarRight}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={handleUndo}
          disabled={!hasUndo}
        >
          <Ionicons
            name="arrow-undo"
            size={24}
            color={hasUndo ? "#fff" : "#666"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={handleRedo}
          disabled={!hasRedo}
        >
          <Ionicons
            name="arrow-redo"
            size={24}
            color={hasRedo ? "#fff" : "#666"}
          />
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
    height: 50,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    marginLeft: 20,
  },
});
