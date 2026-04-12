import { useEffect, useState } from "react";
import { useTemplateStore } from "@/src/stores/template.store";
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
  const { templates, categories, fetchTemplates, fetchCategories, isLoading } =
    useTemplateStore();

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchTemplates(category);
  }, [category]);

  const filters =
    categories.length > 0 ? categories : ["Portrait", "Square", "Landscape"];

  const filtered = activeFilter
    ? templates.filter((t) => t.category === activeFilter)
    : templates;

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
        data={filters}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterPill,
              activeFilter === item && styles.filterPillActive,
            ]}
            onPress={() =>
              setActiveFilter((prev) => (prev === item ? null : item))
            }
          >
            <Text
              style={[
                styles.filterPillText,
                activeFilter === item && styles.filterPillTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => fetchTemplates(category)}
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
          <Text style={styles.emptyText}>Không tìm thấy mẫu nào</Text>
        ) : (
          <TemplateGrid data={filtered} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
