import { useEffect, useState } from "react";
import { useTemplateStore } from "@/src/stores/template.store";
import { useProjectStore } from "@/src/stores/project.store";
import { colors, styles } from "./styles/template.styles";
import { Ionicons } from "@expo/vector-icons";
import { TemplateGrid } from "./components/TemplateGrid";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CategoryScreenProps {
  category: string;
  onBack: () => void;
}

export const CategoryScreen = ({ category, onBack }: CategoryScreenProps) => {
  const isRecent = category === "Recently Used";

  const {
    templates,
    recentTemplates,
    categories,
    fetchTemplates,
    fetchRecentTemplates,
    fetchCategories,
    isLoading,
  } = useTemplateStore();

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    if (isRecent) {
      fetchRecentTemplates();
    } else {
      fetchTemplates(category);
    }
  }, [category]);

  const { projects } = useProjectStore();

  const sourceData = isRecent ? recentTemplates : templates;

  const isFavorites = category === "Favorites";
  const starredProjects = isFavorites ? projects.filter(p => p.isStarred) : [];
  const mappedProjects = starredProjects.map(p => ({
    id: `project-${p.id}`,
    name: p.name || p.ratio?.label || "Untitled",
    category: "Favorites",
    tags: ["Project"],
    sortOrder: 0,
    isProject: true,
    projectData: p,
  }));

  const combinedData = isFavorites ? [...mappedProjects, ...sourceData] : sourceData;

  const filters =
    categories.length > 0 ? categories : ["Portrait", "Square", "Landscape"];

  const filtered = activeFilter
    ? combinedData.filter((t) => t.category === activeFilter)
    : combinedData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.previewHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.previewHeaderTitle}>{category}</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        horizontal
        data={filters as any[]}
        keyExtractor={(item) => (typeof item === "string" ? item : item.code)}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => {
          const itemKey = typeof item === "string" ? item : item.code;
          const itemLabel = typeof item === "string" ? item : item.name;

          return (
            <TouchableOpacity
              style={[
                styles.filterPill,
                activeFilter === itemKey && styles.filterPillActive,
              ]}
              onPress={() =>
                setActiveFilter((prev) => (prev === itemKey ? null : itemKey))
              }
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === itemKey && styles.filterPillTextActive,
                ]}
              >
                {itemLabel}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => isRecent ? fetchRecentTemplates() : fetchTemplates(category)}
            tintColor={colors.textSecondary}
          />
        }
        contentContainerStyle={{ paddingBottom: 40, paddingTop: 8 }}
      >
        {isLoading && filtered.length === 0 ? (
          <ActivityIndicator
            color={colors.textSecondary}
            style={{ marginTop: 60 }}
          />
        ) : filtered.length === 0 ? (
          <Text style={styles.emptyText}>
            {isRecent
              ? "Bạn chưa xem mẫu nào. Hãy khám phá và chọn mẫu!"
              : "Không tìm thấy mẫu nào"}
          </Text>
        ) : (
          <TemplateGrid data={filtered} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
