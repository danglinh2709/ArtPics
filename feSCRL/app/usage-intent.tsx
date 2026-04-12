import { Button } from "@/src/components/Button";
import { RadioOption } from "@/src/components/RadioOption";
import { Typography } from "@/src/components/Typography";
import { OnboardingStrings } from "@/src/configs/onboarding.config";
import { BackgroundCollage } from "@/src/features/onboarding/BackgroundCollage";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Usage Intent Screen
export default function UsageIntentScreen() {
  const insets = useSafeAreaInsets();
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);

  const handleContinue = () => {
    console.log("Selected usage:", selectedIntent);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <BackgroundCollage />

      <LinearGradient
        colors={[
          "transparent",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.98)",
          "#000000",
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={[StyleSheet.absoluteFill, styles.gradient]}
      />

      <View
        style={[styles.content, { paddingBottom: Math.max(insets.bottom, 24) }]}
      >
        <Typography variant="caption" style={styles.subtitle}>
          {OnboardingStrings.usageSubtitle}
        </Typography>

        <Typography variant="title" style={styles.title}>
          {OnboardingStrings.usageTitle}
        </Typography>

        <View style={styles.optionsContainer}>
          {OnboardingStrings.usageOptions.map((option) => (
            <RadioOption
              key={option.id}
              label={option.label}
              selected={selectedIntent === option.id}
              onPress={() => setSelectedIntent(option.id)}
            />
          ))}
        </View>

        <Button
          title={OnboardingStrings.continue}
          disabled={!selectedIntent}
          onPress={handleContinue}
          containerStyle={styles.button}
        />
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
    top: "30%",
    bottom: 0,
    height: "70%",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
  },
  subtitle: {
    marginBottom: 8,
    color: "#rgba(255,255,255,0.7)",
  },
  title: {
    marginBottom: 32,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  button: {
    marginBottom: 8,
  },
});
