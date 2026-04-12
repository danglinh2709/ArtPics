import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "../../components/Typography";
import { useProjectStore } from "../../stores/project.store";
import { ROUTES } from "@/src/enums/route.enum";
import { styles } from "./styles/project-action-menu.style";

export function ProjectActionMenu() {
  const router = useRouter();
  const {
    isProjectMenuVisible,
    closeProjectMenu,
    activeProjectMenuId,
    loadProject,
    duplicateProject,
    deleteProject,
  } = useProjectStore();

  if (!isProjectMenuVisible) return null;

  const handleSelect = async () => {
    if (activeProjectMenuId) {
      await loadProject(activeProjectMenuId);
      closeProjectMenu();
      router.push(ROUTES.EDITOR);
    }
  };

  const handleDuplicate = async () => {
    if (activeProjectMenuId) {
      await duplicateProject(activeProjectMenuId);
      closeProjectMenu();
    }
  };

  const handleDelete = async () => {
    if (activeProjectMenuId) {
      await deleteProject(activeProjectMenuId);
      closeProjectMenu();
    }
  };

  return (
    <Modal
      visible={isProjectMenuVisible}
      transparent
      animationType="slide"
      onRequestClose={closeProjectMenu}
    >
      <Pressable style={styles.overlay} onPress={closeProjectMenu}>
        <View style={styles.menuContainer}>
          <View style={styles.optionsBlock}>
            <TouchableOpacity style={styles.option} onPress={handleSelect}>
              <Typography style={styles.optionText}>Chọn</Typography>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.option} onPress={handleDuplicate}>
              <Typography style={styles.optionText}>Nhân bản</Typography>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.option}>
              <Typography style={styles.optionText}>
                Thêm vào Thư mục
              </Typography>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.option} onPress={handleDelete}>
              <Typography style={[styles.optionText, styles.deleteText]}>
                Xóa
              </Typography>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={closeProjectMenu}
          >
            <Typography style={styles.cancelText}>Hủy bỏ</Typography>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}
