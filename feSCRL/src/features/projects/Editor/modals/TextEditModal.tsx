import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Typography } from "../../../../components/Typography";
import { Ionicons } from "@expo/vector-icons";

interface ITextEditModalProps {
  visible: boolean;
  value: string;
  onClose: () => void;
  onSave: (text: string) => void;
}

export function TextEditModal({
  visible,
  value,
  onClose,
  onSave,
}: ITextEditModalProps) {
  const [text, setText] = useState(value);

  useEffect(() => {
    if (visible) setText(value);
  }, [visible, value]);

  const handleSave = () => {
    onSave(text);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={1}
          style={StyleSheet.absoluteFill}
          onPress={handleSave}
        />

        <View style={styles.content}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            multiline
            autoFocus
            selectionColor="#007AFF"
            textAlign="center"
          />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardToolbarWrapper}
        >
          <View style={styles.keyboardToolbar}>
            <View style={styles.tabList}>
              <TouchableOpacity style={styles.tabItemActive}>
                <Ionicons name="text-outline" size={20} color="#fff" />
                <Typography style={styles.activeTabText}>Chỉnh sửa</Typography>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Typography style={styles.tabText}>Định dạng</Typography>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabItem}>
                <Typography style={styles.tabText}>Căn chỉnh</Typography>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleSave} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    color: "#000",
    fontSize: 42,
    fontWeight: "700",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  keyboardToolbarWrapper: {
    width: "100%",
  },
  keyboardToolbar: {
    height: 50,
    backgroundColor: "#1c1c1e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tabList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  tabItemActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    height: "100%",
    paddingHorizontal: 4,
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
  },
  activeTabText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  tabText: {
    color: "#888",
    fontSize: 14,
  },
  closeBtn: {
    padding: 4,
  },
});
