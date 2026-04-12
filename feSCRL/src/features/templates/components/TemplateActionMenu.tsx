import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTemplateStore } from '@/src/stores/template.store';
import { colors, styles } from '../styles/template.styles';

export const TemplateActionMenu = () => {
  const {
    isMenuOpen,
    selectedTemplateId,
    closeTemplateMenu,
    deleteTemplate,
    openEditModal,
  } = useTemplateStore();

  const handleEdit = () => {
    if (!selectedTemplateId) return;
    closeTemplateMenu();
    openEditModal(selectedTemplateId);
  };

  const handleDelete = () => {
    Alert.alert(
      'Xóa mẫu',
      'Bạn có chắc muốn xóa mẫu này không? Hành động không thể hoàn tác.',
      [
        { text: 'Hủy', style: 'cancel', onPress: closeTemplateMenu },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            if (selectedTemplateId) {
              await deleteTemplate(selectedTemplateId);
            }
            closeTemplateMenu();
          },
        },
      ],
    );
  };

  return (
    <Modal
      visible={isMenuOpen}
      transparent
      animationType="fade"
      onRequestClose={closeTemplateMenu}
    >
      <TouchableOpacity
        style={styles.actionMenuOverlay}
        activeOpacity={1}
        onPress={closeTemplateMenu}
      >
        <View style={styles.actionMenuSheet}>
          <View style={styles.actionMenuHandle} />

          <TouchableOpacity style={styles.actionMenuItem} onPress={handleEdit}>
            <Ionicons name="create-outline" size={20} color={colors.textPrimary} />
            <Text style={styles.actionMenuText}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionMenuItem}>
            <Ionicons name="copy-outline" size={20} color={colors.textPrimary} />
            <Text style={styles.actionMenuText}>Nhân bản mẫu</Text>
          </TouchableOpacity>

          <View style={styles.actionMenuDivider} />

          <TouchableOpacity style={styles.actionMenuItem} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
            <Text style={[styles.actionMenuText, styles.actionMenuDangerText]}>Xóa mẫu này</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionMenuClose} onPress={closeTemplateMenu}>
            <Text style={styles.actionMenuCloseText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

