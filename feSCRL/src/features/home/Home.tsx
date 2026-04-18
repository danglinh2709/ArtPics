import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTemplateStore } from "@/src/stores/template.store";
import { TemplateGrid } from "../templates/components/TemplateGrid";
import { colors, styles } from "../templates/styles/template.styles";
import { TemplateActionMenu } from "../templates/components/TemplateActionMenu";

export const Home = () => {
  const { templates, fetchTemplates, fetchCategories, isLoading } =
    useTemplateStore();

  useEffect(() => {
    fetchCategories();
    fetchTemplates();
  }, [fetchCategories, fetchTemplates]);

  const onRefresh = () => {
    fetchCategories();
    fetchTemplates();
  };

  const featuredTemplates = (templates || []).slice(0, 10);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.screenTitle}>Trang Chủ</Text>
          <TouchableOpacity style={{ padding: 8 }}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Chào mừng bạn quay trở lại!</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={colors.textSecondary}
          />
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View
          style={{ paddingHorizontal: 16, marginTop: 12, marginBottom: 16 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
              Mẫu Phổ Biến
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading && featuredTemplates.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
        ) : featuredTemplates.length === 0 ? (
          <View style={styles.loaderContainer}>
            <Ionicons
              name="albums-outline"
              size={48}
              color={colors.textMuted}
            />
            <Text style={styles.emptyText}>
              Bắt đầu tạo thiết kế ngay hôm nay!
            </Text>
          </View>
        ) : (
          <View style={{ paddingTop: 8 }}>
            <TemplateGrid data={featuredTemplates} />
          </View>
        )}
      </ScrollView>

      <TemplateActionMenu />
    </SafeAreaView>
  );
};
