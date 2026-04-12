import { Typography } from "@/src/components/Typography";
import { ROUTES } from "@/src/enums/route.enum";
import { useAuthStore } from "@/src/stores/auth.store";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuRow } from "./components/MenuRow";
import { Section } from "../../components/Section";
import { styles } from "./styles/more-form.style";

const APP_VERSION = "9.28.1";

export default function SettingForm() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerSide} />
        <Typography variant="title" style={styles.headerTitle}>
          Thêm
        </Typography>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Section title="TẠO VIỀN">
          <MenuRow label="Hướng dẫn sử dụng" />
          <MenuRow label="Instagram" isLast />
        </Section>

        <Section title="HỖ TRỢ">
          <MenuRow label="Câu hỏi thường gặp" />
          <MenuRow label="Cài đặt" isLast />
        </Section>

        <Section title="PHÁP LÝ">
          <MenuRow label="Chính sách bảo mật" />
          <MenuRow label="Điều khoản" isLast />
        </Section>

        <Section title="THÔNG TIN ỨNG DỤNG">
          <MenuRow label="Phiên bản ứng dụng" value={APP_VERSION} disabled />
          <MenuRow label="Có gì mới" isLast />
        </Section>

        <Section title="TÀI KHOẢN">
          {!isAuthenticated ? (
            <MenuRow
              label="Đăng Nhập"
              onPress={() => {
                router.push(ROUTES.LOGIN);
              }}
              isLast
            />
          ) : (
            <View>
              <MenuRow
                label={user?.email ?? "Tài khoản của tôi"}
                isLast
                onPress={() => {
                  router.push(ROUTES.INFORUSER);
                }}
              />
            </View>
          )}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}
