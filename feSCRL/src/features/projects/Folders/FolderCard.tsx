import React from "react";
import { StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/src/components/Typography";

import { IProjectFolder } from "@/src/types/folder.types";
import { useFolderStore } from "@/src/stores/folder.store";

interface IFolderCardProps {
  folder: IProjectFolder;
  onPress: (folder: IProjectFolder) => void;
}

export function FolderCard({ folder, onPress }: IFolderCardProps) {
  const { deleteFolder } = useFolderStore();

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa thư mục này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => deleteFolder(folder.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(folder)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="folder" size={48} color="#FFD700" />
        <TouchableOpacity
          style={styles.folderMenuBtn}
          activeOpacity={0.8}
          onPress={handleDelete}
        >
          <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
        </TouchableOpacity>
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
    position: "relative",
  },
  folderMenuBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
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
