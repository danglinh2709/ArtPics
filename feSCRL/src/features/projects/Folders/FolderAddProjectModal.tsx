import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/src/components/Typography";
import { useFolderStore } from "@/src/stores/folder.store";
import { useProjectStore, resolveAssetUri } from "@/src/stores/project.store";

export function FolderAddProjectModal() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const {
    isAddProjectModalOpen,
    closeAddProjectModal,
    activeFolderId,
    folders,
    addProjectToFolder,
  } = useFolderStore();

  const { projects } = useProjectStore();

  const activeFolder = folders.find((f) => f.id === activeFolderId);

  // Projects not in the folder
  const availableProjects = projects.filter(
    (p) => !activeFolder?.projectIds.includes(p.id),
  );

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleAdd = () => {
    if (activeFolderId) {
      selectedIds.forEach((id) => {
        addProjectToFolder(activeFolderId, id);
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setSelectedIds(new Set());
    closeAddProjectModal();
  };

  if (!activeFolder) return null;

  return (
    <Modal
      visible={isAddProjectModalOpen}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Typography style={styles.headerAction}>Hủy</Typography>
          </TouchableOpacity>
          <Typography variant="title" style={styles.title}>
            Thêm dự án
          </Typography>
          <TouchableOpacity
            onPress={handleAdd}
            style={styles.addButton}
            disabled={selectedIds.size === 0}
          >
            <Typography
              style={[
                styles.headerAction,
                styles.addText,
                selectedIds.size === 0 && styles.disabledText,
              ]}
            >
              Thêm ({selectedIds.size})
            </Typography>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.list}>
          {availableProjects.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Typography style={styles.emptyText}>
                Không có dự án nào để thêm
              </Typography>
            </View>
          ) : (
            availableProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectItem}
                onPress={() => toggleSelect(project.id)}
                activeOpacity={0.7}
              >
                <View style={styles.projectInfo}>
                  {project.thumbnailAssetId ? (
                    <Image
                      source={{
                        uri: resolveAssetUri(project.thumbnailAssetId),
                      }}
                      style={styles.thumbnail}
                    />
                  ) : (
                    <View style={styles.placeholderThumbnail} />
                  )}
                  <Typography style={styles.projectName}>
                    {project.name}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.checkbox,
                    selectedIds.has(project.id) && styles.checkboxSelected,
                  ]}
                >
                  {selectedIds.has(project.id) && (
                    <Ionicons name="checkmark" size={16} color="#000" />
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
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
    padding: 8,
    marginLeft: -8,
  },
  addButton: {
    padding: 8,
    marginRight: -8,
  },
  headerAction: {
    fontSize: 16,
    color: "#fff",
  },
  addText: {
    color: "#FFD700",
    fontWeight: "600",
  },
  disabledText: {
    color: "#8E8E93",
  },
  list: {
    padding: 16,
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  projectInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#2C2C2E",
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#2C2C2E",
  },
  projectName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#FFD700",
    borderColor: "#FFD700",
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
