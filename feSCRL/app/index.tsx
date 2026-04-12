import { Button } from "@/src/components/Button";
import { Typography } from "@/src/components/Typography";
import { OnboardingStrings } from "@/src/configs/onboarding.config";
import { ROUTES } from "@/src/enums/route.enum";
import { BackgroundCollage } from "@/src/features/onboarding/BackgroundCollage";
import { AppStoreBadge, CreatorsBadge } from "@/src/features/onboarding/Badges";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Home Screen
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <BackgroundCollage />

      <LinearGradient
        colors={[
          "transparent",
          "rgba(0,0,0,0.6)",
          "rgba(0,0,0,0.95)",
          "#000000",
        ]}
        locations={[0, 0.4, 0.7, 1]}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />

      <View
        style={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}
      >
        <View style={styles.badgesWrapper}>
          <AppStoreBadge />
          <CreatorsBadge />
        </View>

        <Typography variant="caption" style={styles.greeting}>
          {OnboardingStrings.greeting}
        </Typography>

        <Typography variant="title">{OnboardingStrings.title}</Typography>

        <Typography variant="subtitle">{OnboardingStrings.subtitle}</Typography>

        <Button
          title={OnboardingStrings.getStarted}
          onPress={() => router.push(ROUTES.USAGE_INTENT)}
          containerStyle={styles.button}
        />

        <View style={styles.footer}>
          <Typography variant="caption">
            {OnboardingStrings.alreadyHaveAccount}{" "}
          </Typography>
          <Typography
            variant="link"
            style={{ color: "#fff" }}
            onPress={() => router.push(ROUTES.LOGIN)}
          >
            {OnboardingStrings.login}
          </Typography>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradient: {
    top: "40%",
    bottom: 0,
    height: "60%",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
  },
  badgesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  greeting: {
    marginBottom: 12,
    color: "#rgba(255,255,255,0.6)",
  },
  button: {
    marginBottom: 24,
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
