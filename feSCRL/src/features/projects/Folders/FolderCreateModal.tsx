import React, { useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFolderStore } from "@/src/stores/folder.store";
import { Typography } from "@/src/components/Typography";

export function FolderCreateModal() {
  const [folderName, setFolderName] = useState<string>("");
  const { isCreateFolderModalOpen, closeCreateFolderModal, createFolder } =
    useFolderStore();

  const handleCreate = async () => {
    if (folderName.trim()) {
      await createFolder(folderName.trim());
      setFolderName("");
      closeCreateFolderModal();
    }
  };

  const handleClose = () => {
    setFolderName("");
    closeCreateFolderModal();
  };

  return (
    <Modal
      visible={isCreateFolderModalOpen}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Typography variant="title" style={styles.title}>
                Thêm thư mục mới
              </Typography>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tên thư mục"
                placeholderTextColor="#8E8E93"
                value={folderName}
                onChangeText={setFolderName}
                autoFocus
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleClose}
              >
                <Typography style={styles.cancelText}>Hủy</Typography>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.createButton,
                  !folderName.trim() && styles.disabledButton,
                ]}
                onPress={handleCreate}
                disabled={!folderName.trim()}
              >
                <Typography style={styles.createText}>Tạo mới</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  keyboardView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  createButton: {
    backgroundColor: "#fff",
  },
  disabledButton: {
    opacity: 0.5,
  },
  cancelText: {
    color: "#fff",
    fontWeight: "600",
  },
  createText: {
    color: "#000",
    fontWeight: "600",
  },
});
