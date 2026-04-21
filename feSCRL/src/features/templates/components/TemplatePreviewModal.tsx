import React from "react";
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTemplateStore } from "@/src/stores/template.store";
import { colors, styles } from "../styles/template.styles";

const TemplatePreviewModal = () => {
  const router = useRouter();
  const {
    isPreviewModalOpen,
    closePreviewModal,
    selectedTemplateId,
    selectedTemplate,
    layers,
    isLoading,
    createProjectFromTemplate,
    fetchTemplateDetail,
  } = useTemplateStore();

  React.useEffect(() => {
    if (isPreviewModalOpen && selectedTemplateId) {
      fetchTemplateDetail(selectedTemplateId);
    }
  }, [isPreviewModalOpen, selectedTemplateId]);

  const handleUseTemplate = async () => {
    if (!selectedTemplateId) return;
    const project = await createProjectFromTemplate(selectedTemplateId);
    if (project) {
      closePreviewModal();
      router.push("/editor");
    }
  };

  const template = selectedTemplate;

  return (
    <Modal
      visible={isPreviewModalOpen}
      animationType="slide"
      onRequestClose={closePreviewModal}
      statusBarTranslucent
    >
      <View style={styles.previewOverlay}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.previewHeader}>
            <TouchableOpacity onPress={closePreviewModal}>
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.previewHeaderTitle}>Mẫu</Text>
            <View style={{ width: 24 }} />
          </View>
        </SafeAreaView>

        {/* Preview image fills screen */}
        {isLoading && !template ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color={colors.textSecondary} size="large" />
          </View>
        ) : template ? (
          <View style={styles.previewSingleImageWrapper}>
            <Image
              source={{
                uri: template.previewImageUrl || template.thumbnailUrl || "",
              }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons name="image-outline" size={64} color={colors.textMuted} />
          </View>
        )}

        {/* Footer */}
        <View style={styles.previewFooter}>
          <View style={styles.previewMetaRow}>
            <View style={styles.previewMetaLeft}>
              <Ionicons
                name="copy-outline"
                size={20}
                color={colors.textSecondary}
              />
              <View>
                <Text style={styles.previewBrand}>SCRL</Text>
                <Text style={styles.previewSubMeta}>
                  {template?.category ? `☐ ${template.category}` : ""}{" "}
                  {layers.length > 0 ? `⬛ ${layers.length}` : ""}{" "}
                  {template?.tags?.length ? `☐ ${template.tags.length}` : ""}
                </Text>
              </View>
            </View>
            <View style={styles.previewMetaIcons}>
              <Ionicons
                name="logo-instagram"
                size={22}
                color={colors.textSecondary}
              />
              <Ionicons
                name="share-outline"
                size={22}
                color={colors.textSecondary}
              />
              <Ionicons
                name="bookmark-outline"
                size={22}
                color={colors.textSecondary}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.useTemplateBtn,
              isLoading && styles.useTemplateBtnDisabled,
            ]}
            onPress={handleUseTemplate}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.bg} />
            ) : (
              <Text style={styles.useTemplateBtnText}>Sử dụng mẫu</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TemplatePreviewModal;
