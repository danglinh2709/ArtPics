import React from "react";
import { Text, TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { styles, colors } from "../styles/template.styles";
import { Ionicons } from "@expo/vector-icons";

export type BrowsePromoTileVariant = "half" | "wide";

interface BrowsePromoTileProps {
  title: string;
  subtitle?: string;
  imageUri?: string | null;
  onPress: () => void;
  variant?: BrowsePromoTileVariant;
  containerStyle?: StyleProp<ViewStyle>;
}

export function BrowsePromoTile({
  title,
  subtitle,
  imageUri,
  onPress,
  variant = "half",
  containerStyle,
}: BrowsePromoTileProps) {
  const tileStyle =
    variant === "wide" ? styles.browsePromoTileWide : styles.browsePromoTileHalf;

  return (
    <TouchableOpacity
      style={[tileStyle, containerStyle]}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={[styles.browsePromoBg, { backgroundColor: "#2C2C2E" }]} />
      <View style={styles.discoverCardTextCol}>
        <Text style={styles.browsePromoTitle} numberOfLines={2}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.browsePromoSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={styles.browsePromoThumb}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      ) : (
        <View
          style={[
            styles.browsePromoThumb,
            { backgroundColor: colors.surfaceAlt, justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Ionicons name="images-outline" size={20} color={colors.textMuted} />
        </View>
      )}
    </TouchableOpacity>
  );
}
