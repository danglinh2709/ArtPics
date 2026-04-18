import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useAuthStore } from "@/src/stores/auth.store";
import { ProjectCreateModal } from "../src/features/projects/ProjectCreateModal";

export const unstable_settings = {
  anchor: "index",
};

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="index" />
            <Stack.Screen name="usage-intent" />
            <Stack.Screen name="login" />
            <Stack.Screen name="otp" />
          </>
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="template-detail/[id]" options={{ presentation: "modal" }} />
          </>
        )}


      </Stack>


      <ProjectCreateModal />
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
