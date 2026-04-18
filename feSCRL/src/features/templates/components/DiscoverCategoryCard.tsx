import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { styles, colors } from "../styles/template.styles";

interface DiscoverCategoryCardProps {
  title: string;
  coverUri?: string | null;
  onPress: () => void;
}

export function DiscoverCategoryCard({
  title,
  coverUri,
  onPress,
}: DiscoverCategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.discoverCard}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.discoverCardTextCol}>
        <Text style={styles.discoverCardTitle} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
      {coverUri ? (
        <Image
          source={{ uri: coverUri }}
          style={styles.discoverCardThumb}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      ) : (
        <View
          style={[
            styles.discoverCardThumb,
            styles.discoverCardThumbPlaceholder,
          ]}
        >
          <Ionicons name="image-outline" size={32} color={colors.textMuted} />
        </View>
      )}
    </TouchableOpacity>
  );
}
