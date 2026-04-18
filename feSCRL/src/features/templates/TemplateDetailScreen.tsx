import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useTemplateStore } from "@/src/stores/template.store";
import { colors, styles as commonStyles } from "./styles/template.styles";

export default function TemplateDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { 
    createProjectFromTemplate, 
    isApplyingTemplate,
    selectedTemplate: template,
    isDetailLoading: loading,
    fetchTemplateDetail,
    clearSelectedTemplate,
    touchRecentTemplate,
  } = useTemplateStore();

  useEffect(() => {
    if (id) {
      fetchTemplateDetail(id);
      touchRecentTemplate(id);
    }
    return () => clearSelectedTemplate();
  }, [id, fetchTemplateDetail, clearSelectedTemplate, touchRecentTemplate]);

  const onBack = () => router.back();

  const handleUseTemplate = async () => {
    if (!template) return;
    const project = await createProjectFromTemplate(template.id, `Dự án từ mẫu ${template.name || ""}`);
    if (project) {
      router.push("/editor");
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>CHI TIẾT MẪU</Text>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        {renderHeader()}
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={styles.loadingText}>Đang tải chi tiết...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!template) {
    return (
      <SafeAreaView style={commonStyles.safeArea}>
        {renderHeader()}
        <View style={styles.centerContainer}>
          <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyText}>Không tìm thấy dữ liệu mẫu này.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageUrl = template.previewImageUrl || template.thumbnailUrl || "https://picsum.photos/600/800";

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.previewImage}
            contentFit="contain"
            transition={300}
          />
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.title}>{template.name || "Mẫu chưa đặt tên"}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="copy-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>{template.pageCount || 1} Trang</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="crop-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.metaText}>Tỷ lệ {template.aspectKey || "1:1"}</Text>
            </View>
          </View>

          {template.description ? (
            <Text style={styles.description}>{template.description}</Text>
          ) : (
            <Text style={styles.description}>Không có mô tả cho mẫu này.</Text>
          )}

          {template.tags && template.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {template.tags.map((tag, index) => (
                <View key={`${tag}-${index}`} style={styles.tagBadge}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[styles.useButton, isApplyingTemplate && { opacity: 0.7 }]} 
          onPress={handleUseTemplate} 
          activeOpacity={0.8}
          disabled={isApplyingTemplate}
        >
          {isApplyingTemplate ? (
            <ActivityIndicator size="small" color={colors.bg} />
          ) : (
            <>
              <Ionicons name="color-wand-outline" size={20} color={colors.bg} />
              <Text style={styles.useButtonText}>Sử dụng mẫu</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: 12,
    fontSize: 14,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 100, // Make room for bottom bar
  },
  imageContainer: {
    width: "100%",
    height: 450,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  infoSection: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metaText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: colors.textPrimary,
    fontSize: 13,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32, // safe area spacing roughly
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  useButton: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 27,
    gap: 10,
  },
  useButtonText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: "700",
  },
});
