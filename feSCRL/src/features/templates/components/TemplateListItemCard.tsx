import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ITemplateListItem } from "../../../types/template.types";
import { colors } from "../styles/template.styles";

const { width } = Dimensions.get("window");
const NUM_COLUMNS = 2;
const GAP = 16;
const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

interface TemplateListItemCardProps {
  template: ITemplateListItem;
}

export const TemplateListItemCard = ({
  template,
}: TemplateListItemCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/template-detail/[id]",
      params: { id: template.id },
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              template.thumbnailUrl ||
              template.previewImageUrl ||
              "https://picsum.photos/300/400",
          }}
          style={styles.thumbnail}
          contentFit="cover"
          transition={200}
        />
        {template.pageCount > 1 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{template.pageCount} Pages</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>
        {template.name || "Mẫu chưa đặt tên"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: GAP,
  },
  imageWrapper: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: colors.surfaceAlt,
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    paddingHorizontal: 2,
  },
});
