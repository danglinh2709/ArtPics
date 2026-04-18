import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/src/components/Typography";

import { IProjectFolder } from "@/src/types/folder.types";
import { useFolderStore } from "@/src/stores/folder.store";

interface IFolderCardProps {
  folder: IProjectFolder;
  onPress: (folder: IProjectFolder) => void;
}

export function FolderCard({ folder, onPress }: IFolderCardProps) {
  const { deleteFolder, updateFolder } = useFolderStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [newName, setNewName] = useState(folder.name);

  const handleDelete = () => {
    setShowMenu(false);
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

  const handleRename = async () => {
    if (newName.trim() && newName.trim() !== folder.name) {
      await updateFolder(folder.id, newName.trim());
    }
    setShowRename(false);
  };

  const openRename = () => {
    setShowMenu(false);
    setNewName(folder.name);
    setTimeout(() => setShowRename(true), 200);
  };

  return (
    <>
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
            onPress={() => setShowMenu(true)}
          >
            <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Typography variant="title" style={styles.name} numberOfLines={1}>
            {folder.name}
          </Typography>
          <Typography variant="caption" style={styles.count}>
            {folder.projectIds?.length ?? 0} dự án
          </Typography>
        </View>
      </TouchableOpacity>

      {/* Action Menu */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View style={styles.menuSheet}>
            <View style={styles.menuHandle} />
            <TouchableOpacity style={styles.menuItem} onPress={openRename}>
              <Ionicons name="pencil-outline" size={20} color="#fff" />
              <Typography style={styles.menuText}>Đổi tên</Typography>
            </TouchableOpacity>
            <View style={styles.menuDivider} />
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color="#ef4444" />
              <Typography style={[styles.menuText, { color: "#ef4444" }]}>
                Xóa thư mục
              </Typography>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Rename Modal */}
      <Modal
        visible={showRename}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRename(false)}
      >
        <View style={styles.renameOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.renameKeyboard}
          >
            <View style={styles.renameContainer}>
              <Typography variant="title" style={styles.renameTitle}>
                Đổi tên thư mục
              </Typography>
              <TextInput
                style={styles.renameInput}
                value={newName}
                onChangeText={setNewName}
                placeholder="Tên thư mục"
                placeholderTextColor="#8E8E93"
                autoFocus
                selectTextOnFocus
              />
              <View style={styles.renameButtons}>
                <TouchableOpacity
                  style={[styles.renameBtn, styles.cancelBtn]}
                  onPress={() => setShowRename(false)}
                >
                  <Typography style={styles.cancelBtnText}>Hủy</Typography>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.renameBtn,
                    styles.confirmBtn,
                    !newName.trim() && styles.disabledBtn,
                  ]}
                  onPress={handleRename}
                  disabled={!newName.trim()}
                >
                  <Typography style={styles.confirmBtnText}>Lưu</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </>
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
  // Action menu
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  menuSheet: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    paddingTop: 16,
  },
  menuHandle: {
    width: 36,
    height: 4,
    backgroundColor: "#2a2a2a",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 14,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#2a2a2a",
    marginVertical: 4,
  },
  // Rename modal
  renameOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  renameKeyboard: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  renameContainer: {
    width: "85%",
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
  },
  renameTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  renameInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 24,
  },
  renameButtons: {
    flexDirection: "row",
    gap: 12,
  },
  renameBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  confirmBtn: {
    backgroundColor: "#fff",
  },
  disabledBtn: {
    opacity: 0.5,
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  confirmBtnText: {
    color: "#000",
    fontWeight: "600",
  },
});
