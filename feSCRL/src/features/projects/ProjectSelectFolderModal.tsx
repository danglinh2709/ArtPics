import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/src/components/Typography";
import { useFolderStore } from "@/src/stores/folder.store";
import { useProjectStore } from "@/src/stores/project.store";

interface ProjectSelectFolderModalProps {
  isVisible: boolean;
  onClose: () => void;
  projectId: string | null;
}

export function ProjectSelectFolderModal({ isVisible, onClose, projectId }: ProjectSelectFolderModalProps) {
  const { folders, addProjectToFolder } = useFolderStore();

  const handleSelectFolder = async (folderId: string) => {
    if (projectId) {
      await addProjectToFolder(folderId, projectId);
    }
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Typography variant="title" style={styles.title}>
              Lưu vào Thư mục
            </Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.list}>
            {folders.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Typography style={styles.emptyText}>
                  Bạn chưa có thư mục nào
                </Typography>
              </View>
            ) : (
              folders.map((folder) => {
                const isAdded = folder.projectIds?.includes(projectId || "");
                return (
                  <TouchableOpacity
                    key={folder.id}
                    style={styles.folderItem}
                    onPress={() => !isAdded && handleSelectFolder(folder.id)}
                    activeOpacity={0.7}
                    disabled={isAdded}
                  >
                    <View style={styles.folderInfo}>
                      <Ionicons name="folder-outline" size={24} color="#8E8E93" />
                      <Typography style={[styles.folderName, isAdded && styles.disabledText]}>
                        {folder.name}
                      </Typography>
                    </View>

                    {isAdded && (
                      <Typography style={styles.addedText}>Đã thêm</Typography>
                    )}
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#1C1C1E",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    minHeight: "50%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  closeButton: {
    padding: 4,
  },
  list: {
    padding: 16,
  },
  folderItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  folderInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  folderName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  disabledText: {
    color: "#8E8E93",
  },
  addedText: {
    color: "#8E8E93",
    fontSize: 14,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#8E8E93",
    fontSize: 16,
  },
});
