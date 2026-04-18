import { useCallback, useEffect, useMemo, useState } from "react";
import { useTemplateStore } from "@/src/stores/template.store";
import { colors, styles } from "./styles/template.styles";
import { Ionicons } from "@expo/vector-icons";
import { TemplateGrid } from "./components/TemplateGrid";
import { HorizontalAspectFilters } from "./components/HorizontalAspectFilters";
import { TemplateActionMenu } from "./components/TemplateActionMenu";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getFavoriteTemplateIds,
  getRecentTemplateIds,
} from "@/src/services/template-preferences.storage";
import {
  orderTemplatesByIds,
  sortTemplatesByOrder,
} from "./template-browse.helpers";
import { TEMPLATE_BROWSE_UI } from "@/src/configs/template-browse.ui";

export type TemplateCatalogMode =
  | { type: "category"; category: string }
  | { type: "featured" }
  | { type: "recent" }
  | { type: "favorites" };

interface TemplateCatalogScreenProps {
  mode: TemplateCatalogMode;
  title: string;
  onBack: () => void;
}

export function TemplateCatalogScreen({
  mode,
  title,
  onBack,
}: TemplateCatalogScreenProps) {
  const { templates, fetchTemplates, isLoading } = useTemplateStore();
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedAspectKey, setSelectedAspectKey] = useState<string | null>(
    null,
  );

  const reloadLocalLists = useCallback(async () => {
    const [r, f] = await Promise.all([
      getRecentTemplateIds(),
      getFavoriteTemplateIds(),
    ]);
    setRecentIds(r);
    setFavoriteIds(f);
  }, []);

  const catalogCategory = mode.type === "category" ? mode.category : "";

  useEffect(() => {
    setSelectedAspectKey(null);
  }, [mode.type, catalogCategory]);

  useEffect(() => {
    if (mode.type === "category") {
      void fetchTemplates(catalogCategory);
    } else {
      void fetchTemplates();
    }
  }, [mode.type, catalogCategory, fetchTemplates]);

  useEffect(() => {
    void reloadLocalLists();
  }, [reloadLocalLists]);

  const baseList = useMemo(() => {
    if (mode.type === "category") return templates;
    if (mode.type === "featured") return sortTemplatesByOrder(templates);
    if (mode.type === "recent")
      return orderTemplatesByIds(templates, recentIds);
    return templates.filter((t) => favoriteIds.includes(t.id));
  }, [mode.type, templates, recentIds, favoriteIds]);

  const filtered = useMemo(() => {
    if (!selectedAspectKey) return baseList;
    return baseList.filter(
      (t) => (t.aspectKey ?? "square") === selectedAspectKey,
    );
  }, [baseList, selectedAspectKey]);

  const showAspectFilters = baseList.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.previewHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.previewHeaderTitle}>{title}</Text>
        <View style={styles.headerRight} />
      </View>

      {showAspectFilters ? (
        <HorizontalAspectFilters
          selectedAspectKey={selectedAspectKey}
          onChange={setSelectedAspectKey}
        />
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={async () => {
              await reloadLocalLists();
              if (mode.type === "category")
                await fetchTemplates(catalogCategory);
              else await fetchTemplates();
            }}
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
          <Text style={styles.emptyText}>{TEMPLATE_BROWSE_UI.emptyCatalog}</Text>
        ) : (
          <TemplateGrid data={filtered} />
        )}
      </ScrollView>

      <TemplateActionMenu />
    </SafeAreaView>
  );
}
