import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/src/components/Typography";

// Use dynamic typing from types
import { IProjectFolder } from "@/src/types/folder.types";

interface IFolderCardProps {
  folder: IProjectFolder;
  onPress: (folder: IProjectFolder) => void;
}

export function FolderCard({ folder, onPress }: IFolderCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(folder)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="folder" size={48} color="#FFD700" />
      </View>
      <View style={styles.infoContainer}>
        <Typography variant="title" style={styles.name} numberOfLines={1}>
          {folder.name}
        </Typography>
        <Typography variant="caption" style={styles.count}>
          {folder.projectIds.length} dự án
        </Typography>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    backgroundColor: "rgba(255, 215, 0, 0.1)",
    borderRadius: 12,
    marginBottom: 12,
  },
  infoContainer: {
    gap: 4,
  },
  name: {
    fontWeight: "600",
    color: "#fff",
  },
  count: {
    color: "#8E8E93",
  },
});
