import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { styles, colors } from "../styles/template.styles";
import { useTemplateStore } from "@/src/stores/template.store";
import { TemplateListItem } from "@/src/types/template.types";

interface ITemplateCardProps {
  template: TemplateListItem;
}

export function TemplateCard({ template }: ITemplateCardProps) {
  const { openPreviewModal, openTemplateMenu } = useTemplateStore();

  return (
    <TouchableOpacity
      style={styles.templateCard}
      onPress={() => openPreviewModal(template.id)}
      activeOpacity={0.88}
    >
      {template.thumbnailUrl ? (
        <Image
          source={{ uri: template.thumbnailUrl }}
          style={[styles.templateThumb, { aspectRatio: 0.75 }]}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.templateThumbPlaceholder}>
          <Ionicons name="image-outline" size={32} color={colors.textMuted} />
        </View>
      )}

      <View style={styles.templateCardInfo}>
        <Text style={styles.templateCardName} numberOfLines={1}>
          SCRL
        </Text>
        <View style={styles.templateCardMeta}>
          <Ionicons name="copy-outline" size={11} color={colors.textMuted} />
          <Text style={styles.templateCardMetaText} numberOfLines={1}>
            {template.category || "Mẫu"} • {template.tags?.length ?? 0} ảnh
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
