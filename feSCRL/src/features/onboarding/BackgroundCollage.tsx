import { Image } from "expo-image";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";
import { OnboardingAssets } from "../../configs/onboarding.config";

export function BackgroundCollage() {
  const { height } = useWindowDimensions();
  const panY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(panY, {
          toValue: -150,
          duration: 35000,
          useNativeDriver: true,
        }),
        Animated.timing(panY, {
          toValue: 0,
          duration: 35000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [panY]);

  const allImages = [
    ...OnboardingAssets.images,
    ...OnboardingAssets.images,
    ...OnboardingAssets.images,
  ];

  const col1: any[] = [];
  const col2: any[] = [];
  const col3: any[] = [];

  allImages.forEach((src, i) => {
    if (i % 3 === 0) col1.push(src);
    else if (i % 3 === 1) col2.push(src);
    else col3.push(src);
  });

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Animated.View
        style={[
          styles.transformer,
          {
            transform: [
              { rotate: "-15deg" },
              { translateY: panY },
              { scale: 1.1 },
            ],
          },
        ]}
      >
        <View style={styles.grid}>
          {/* Column 1 */}
          <View style={styles.column}>
            {col1.map((src, index) => (
              <View
                key={`c1-${index}`}
                style={[
                  styles.imageWrapper,
                  { height: index % 2 === 0 ? height * 0.3 : height * 0.22 },
                ]}
              >
                <Image
                  source={src as any}
                  style={styles.image}
                  contentFit="cover"
                />
              </View>
            ))}
          </View>

          {/* Column 2 */}
          <View style={[styles.column, { marginTop: height * 0.1 }]}>
            {col2.map((src, index) => (
              <View
                key={`c2-${index}`}
                style={[
                  styles.imageWrapper,
                  { height: index % 2 === 0 ? height * 0.22 : height * 0.3 },
                ]}
              >
                <Image
                  source={src as any}
                  style={styles.image}
                  contentFit="cover"
                />
              </View>
            ))}
          </View>

          {/* Column 3 */}
          <View style={[styles.column, { marginTop: height * 0.05 }]}>
            {col3.map((src, index) => (
              <View
                key={`c3-${index}`}
                style={[
                  styles.imageWrapper,
                  { height: index % 2 === 0 ? height * 0.35 : height * 0.18 },
                ]}
              >
                <Image
                  source={src as any}
                  style={styles.image}
                  contentFit="cover"
                />
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    overflow: "hidden",
  },
  transformer: {
    position: "absolute",
    width: "150%",
    height: "150%",
    left: "-25%",
    top: "-25%",
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
  },
  column: {
    flex: 1,
    gap: 16,
  },
  imageWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
