import React from "react";
import { View } from "react-native";
import { styles } from "../styles/template.styles";
import { TemplateCard } from "./TemplateCard";
import { TemplateListItem } from "@/src/types/template.types";

interface ITemplateGridProps {
  data: TemplateListItem[];
}

export function TemplateGrid({ data }: ITemplateGridProps) {
  const leftColumn: TemplateListItem[] = [];
  const rightColumn: TemplateListItem[] = [];

  data.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  return (
    <View style={styles.masonryContainer}>
      <View style={styles.masonryColumn}>
        {leftColumn.map((item) => (
          <TemplateCard key={item.id} template={item} />
        ))}
      </View>
      <View style={styles.masonryColumn}>
        {rightColumn.map((item) => (
          <TemplateCard key={item.id} template={item} />
        ))}
      </View>
    </View>
  );
}
