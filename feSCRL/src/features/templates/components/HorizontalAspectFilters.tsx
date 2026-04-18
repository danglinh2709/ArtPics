import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import {
  TEMPLATE_ASPECT_FILTERS,
  TemplateAspectFilterKey,
} from "@/src/configs/template-aspect-filters.config";
import { styles } from "../styles/template.styles";

interface HorizontalAspectFiltersProps {
  selectedAspectKey: string | null;
  onChange: (aspectKey: string | null) => void;
}

export function HorizontalAspectFilters({
  selectedAspectKey,
  onChange,
}: HorizontalAspectFiltersProps) {
  const data = [...TEMPLATE_ASPECT_FILTERS];

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.aspectKey}
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={[styles.filterRow, { paddingRight: 18 }]}
      renderItem={({ item }) => {
        const isActive = selectedAspectKey === item.aspectKey;
        return (
          <TouchableOpacity
            style={[styles.filterPill, isActive && styles.filterPillActive]}
            onPress={() =>
              onChange(isActive ? null : (item.aspectKey as TemplateAspectFilterKey))
            }
          >
            <Text
              style={[
                styles.filterPillText,
                isActive && styles.filterPillTextActive,
              ]}
            >
              {item.labelVi}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}
