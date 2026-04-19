import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { templateService } from "@/src/services/template.service";
import { TemplateListItem } from "@/src/types/template.types";
import { colors, styles as commonStyles } from "./styles/template.styles";
import { FilterChip } from "./components/FilterChip";
import { TemplateListItemCard } from "./components/TemplateListItemCard";

export default function TemplateCategoryScreen() {
  const router = useRouter();
  const { code, name } = useLocalSearchParams<{
    code: string;
    name?: string;
  }>();

  const [formats, setFormats] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [templates, setTemplates] = useState<TemplateListItem[]>([]);

  const [loadingFormats, setLoadingFormats] = useState<boolean>(true);
  const [loadingTemplates, setLoadingTemplates] = useState<boolean>(true);

  useEffect(() => {
    if (!code) return;
    const fetchFormats = async () => {
      try {
        setLoadingFormats(true);
        const data = await templateService.getFormats(code);
        setFormats(data);
      } catch (error) {
        console.error("Failed to load formats", error);
      } finally {
        setLoadingFormats(false);
      }
    };
    fetchFormats();
  }, [code]);

  useEffect(() => {
    if (!code) return;
    const fetchTemplates = async () => {
      try {
        setLoadingTemplates(true);
        const data = await templateService.getAllTemplates(
          code,
          selectedFormat || undefined,
        );
        setTemplates(data || []);
      } catch (error) {
        console.error("Failed to load templates", error);
      } finally {
        setLoadingTemplates(false);
      }
    };
    fetchTemplates();
  }, [code, selectedFormat]);

  const onBack = () => router.back();

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>
          {name ? name.toUpperCase() : "DANH MỤC"}
        </Text>
      </View>
      <View style={{ width: 40 }} />
    </View>
  );

  return (
    <SafeAreaView style={commonStyles.safeArea}>
      <StatusBar barStyle="light-content" />

      {renderHeader()}

      <View style={styles.filterSection}>
        {loadingFormats ? (
          <ActivityIndicator
            size="small"
            color={colors.textSecondary}
            style={{ marginLeft: 20 }}
          />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <FilterChip
              label="Tất cả"
              isSelected={!selectedFormat}
              onPress={() => setSelectedFormat(null)}
            />
            {formats.map((format) => (
              <FilterChip
                key={format}
                label={format}
                isSelected={selectedFormat === format}
                onPress={() => setSelectedFormat(format)}
              />
            ))}
          </ScrollView>
        )}
      </View>

      <View style={{ flex: 1 }}>
        {loadingTemplates ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.white} />
            <Text style={styles.loadingText}>Đang tải mẫu...</Text>
          </View>
        ) : (
          <FlatList
            data={templates}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TemplateListItemCard template={item} />}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Ionicons
                  name="documents-outline"
                  size={48}
                  color={colors.textMuted}
                />
                <Text style={styles.emptyText}>
                  Không tìm thấy mẫu nào trong mục này.
                </Text>
              </View>
            }
          />
        )}
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
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  filterSection: {
    height: 50,
    marginVertical: 10,
  },
  filterScroll: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
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
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
