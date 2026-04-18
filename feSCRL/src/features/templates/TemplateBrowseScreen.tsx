import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTemplateStore } from "@/src/stores/template.store";
import { colors, styles } from "./styles/template.styles";
import { TemplateActionMenu } from "./components/TemplateActionMenu";
import TemplatePreviewModal from "./components/TemplatePreviewModal";
import { TemplateGrid } from "./components/TemplateGrid";
import { CategoryScreen } from "./CategoryScreen";
import { Searchs } from "@/src/components/Searchs";

import { TemplateCategory } from "@/src/types/template.types";

export const TemplateBrowseScreen = () => {
  const router = useRouter();
  const {
    templates,
    categories,
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
      <>
        <CategoryScreen
          category={activeCategory}
          onBack={() => setActiveCategory(null)}
        />
        <TemplateActionMenu />
        <TemplatePreviewModal />
      </>
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

  const renderDiscoverTile = (cat: TemplateCategory) => {
    return (
      <TouchableOpacity
        key={cat.id}
        style={styles.discoverTile}
        onPress={() => {
          router.push({
            pathname: "/template-category/[code]",
            params: { code: cat.code, name: cat.name },
          });
        }}
        activeOpacity={0.85}
      >
        <Image
          source={{
            uri:
              cat.coverImageUrl ||
              `https://picsum.photos/seed/${cat.code}/200/300`,
          }}
          style={styles.discoverTileImage}
          resizeMode="cover"
        />
        <View style={styles.discoverTileOverlay} />
        <Text style={styles.discoverTileText}>{cat.name}</Text>
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
            <View style={styles.discoverGrid}>
              <TouchableOpacity
                style={styles.discoverTile}
                onPress={() => setActiveCategory("Recently Used")}
                activeOpacity={0.85}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/seed/RecentlyUsed/200/300",
                  }}
                  style={styles.discoverTileImage}
                  resizeMode="cover"
                />
                <View style={styles.discoverTileOverlay} />
                <Text style={styles.discoverTileText}>{"Recently\nUsed"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.discoverTile}
                onPress={() => setActiveCategory("Favorites")}
                activeOpacity={0.85}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/seed/Favorites/200/300",
                  }}
                  style={styles.discoverTileImage}
                  resizeMode="cover"
                />
                <View style={styles.discoverTileOverlay} />
                <Text style={styles.discoverTileText}>Favorites</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Featured</Text>
            <View style={[styles.discoverGrid, { marginBottom: 20 }]}>
              <TouchableOpacity
                style={styles.discoverTile}
                onPress={() => setActiveCategory("Top Templates")}
                activeOpacity={0.85}
              >
                <Image
                  source={{
                    uri: "https://picsum.photos/seed/TopTemplates/400/300",
                  }}
                  style={styles.discoverTileImage}
                  resizeMode="cover"
                />
                <View style={styles.discoverTileOverlay} />
                <Text style={styles.discoverTileText}>{"Top\nTemplates"}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Discover</Text>
            <View style={styles.discoverGrid}>
              {categories.map((cat) => renderDiscoverTile(cat))}
            </View>
          </>
        )}
      </ScrollView>

      <TemplateActionMenu />
      <TemplatePreviewModal />
    </SafeAreaView>
  );
};
