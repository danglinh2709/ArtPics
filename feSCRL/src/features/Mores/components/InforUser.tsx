import { Typography } from "@/src/components/Typography";
import { ROUTES } from "@/src/enums/route.enum";
import { useAuthStore } from "@/src/stores/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/infor-user.style";

export default function InforUser() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(ROUTES.HOME);
    } catch (err) {
      console.warn("Logout failed:", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Typography variant="title" style={styles.headerTitle}>
          Tài khoản
        </Typography>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <View style={styles.box}>
          <View>
            <Typography variant="caption" style={styles.label}>
              Email
            </Typography>
            <Typography style={styles.emailText}>{user?.email}</Typography>
          </View>
        </View>

        <View style={[styles.box, styles.blueBox]}>
          <Typography style={styles.blueBoxText}>
            Để quản lý tài khoản của bạn, vui lòng truy cập scrl.com
          </Typography>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Typography style={styles.logoutText}>Đăng xuất</Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
