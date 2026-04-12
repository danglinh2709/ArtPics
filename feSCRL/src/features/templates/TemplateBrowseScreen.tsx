import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTemplateStore } from "@/src/stores/template.store";
import { colors, styles } from "./styles/template.styles";
import { TemplateActionMenu } from "./components/TemplateActionMenu";
import TemplatePreviewModal from "./components/TemplatePreviewModal";
import { TemplateGrid } from "./components/TemplateGrid";
import { CategoryScreen } from "./CategoryScreen";
import { Searchs } from "@/src/components/Searchs";

const DISCOVER_CATEGORIES = [
  "Stories",
  "10+ Photos",
  "Collage",
  "Scrapbook",
  "Celebrations",
  "Creator Templates",
  "Vision Boards",
  "Film",
  "Recap2025",
  "Tiles",
];

export const TemplateBrowseScreen = () => {
  const {
    templates,
    searchQuery,
    isLoading,
    fetchTemplates,
    fetchCategories,
    setSearchQuery,
  } = useTemplateStore();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchTemplates();
  }, []);

  if (activeCategory !== null) {
    return (
      <CategoryScreen
        category={activeCategory}
        onBack={() => setActiveCategory(null)}
      />
    );
  }

  const filteredTemplates = searchQuery.trim()
    ? templates.filter((t) => {
        const q = searchQuery.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.tags?.some((tag: string) => tag.toLowerCase().includes(q)) ||
          t.category?.toLowerCase().includes(q)
        );
      })
    : templates;

  const renderDiscoverTile = (cat: string) => {
    const tempImage = `https://picsum.photos/seed/${cat.replace(/\s+/g, "")}/200/300`;

    return (
      <TouchableOpacity
        key={cat}
        style={styles.discoverTile}
        onPress={() => setActiveCategory(cat)}
        activeOpacity={0.85}
      >
        <Image
          source={{ uri: tempImage }}
          style={styles.discoverTileImage}
          resizeMode="cover"
        />
        <View style={styles.discoverTileOverlay} />
        <Text style={styles.discoverTileText}>{cat}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.header, { paddingTop: 8 }]}>
        <Text style={[styles.screenTitle, { textAlign: "center" }]}>Mẫu</Text>
      </View>

      <Searchs
        initialValue={searchQuery}
        placeholder="Tìm Kiếm Mẫu"
        onSearch={setSearchQuery}
        containerStyle={{ marginHorizontal: 16, marginVertical: 12 }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchTemplates}
            tintColor={colors.textSecondary}
          />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {searchQuery.trim() ? (
          <View style={{ paddingTop: 8 }}>
            {filteredTemplates.length === 0 ? (
              <Text style={styles.emptyText}>Không tìm thấy mẫu nào</Text>
            ) : (
              <TemplateGrid data={filteredTemplates} />
            )}
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>For You</Text>
            <View style={styles.categoryTilesRow}>
              <TouchableOpacity
                style={styles.categoryTile}
                onPress={() => setActiveCategory("Recently Used")}
                activeOpacity={0.85}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/seed/RecentlyUsed/200/300",
                  }}
                  style={styles.categoryTileImage}
                  resizeMode="cover"
                />
                <View style={styles.categoryTileOverlay} />
                <Text style={styles.categoryTileText}>Recently{"\n"}Used</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryTile}
                onPress={() => setActiveCategory("Favorites")}
                activeOpacity={0.85}
              >
                <View style={styles.categoryTileOverlay} />
                <Text style={styles.categoryTileText}>Favorites</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={[styles.categoryTilesRow, { marginBottom: 20 }]}>
              <TouchableOpacity
                style={[styles.categoryTile, { height: 110 }]}
                onPress={() => setActiveCategory("Top Templates")}
                activeOpacity={0.85}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/seed/TopTemplates/400/300",
                  }}
                  style={styles.categoryTileImage}
                  resizeMode="cover"
                />
                <View style={styles.categoryTileOverlay} />
                <Text style={styles.categoryTileText}>Top{"\n"}Templates</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Discover</Text>
            <View style={styles.discoverGrid}>
              {DISCOVER_CATEGORIES.map((cat) => renderDiscoverTile(cat))}
            </View>
          </>
        )}
      </ScrollView>

      <TemplateActionMenu />
      <TemplatePreviewModal />
    </SafeAreaView>
  );
};
