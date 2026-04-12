import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Typography } from "../../components/Typography";
import { useProjectStore } from "../../stores/project.store";
import { ROUTES } from "@/src/enums/route.enum";
import { SUPPORTED_ASPECT_RATIOS } from "@/src/configs/aspectRatio.config";
import { styles } from "./styles/project-create-modal.style";

export function ProjectCreateModal() {
  const router = useRouter();
  const { isCreateModalVisible, closeCreateModal, createNewProject } =
    useProjectStore();

  return (
    <Modal
      visible={isCreateModalVisible}
      transparent
      animationType="fade"
      onRequestClose={closeCreateModal}
    >
      <Pressable style={styles.overlay} onPress={closeCreateModal}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <View style={{ width: 44 }} />
            <Typography variant="title" style={styles.title}>
              Dự án mới
            </Typography>
            <TouchableOpacity
              onPress={closeCreateModal}
              style={styles.closeButton}
            >
              <View style={styles.closeIconWrapper}>
                <Ionicons name="close" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {SUPPORTED_ASPECT_RATIOS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.ratioItem}
                activeOpacity={0.7}
                onPress={async () => {
                  await createNewProject(item.label, item);
                  closeCreateModal();
                  router.push(ROUTES.EDITOR);
                }}
              >
                <View style={styles.boxContainer}>
                  <View
                    style={[
                      styles.ratioBox,
                      {
                        width: 80,
                        height: 80 / item.ratio,
                        maxHeight: 160,
                      },
                    ]}
                  >
                    <Typography style={styles.ratioValue}>{item.id}</Typography>
                  </View>
                </View>
                <Typography variant="caption" style={styles.ratioLabel}>
                  {item.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}
