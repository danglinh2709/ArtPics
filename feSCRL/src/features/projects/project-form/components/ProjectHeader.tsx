import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../../../components/Typography";
import { styles } from "../../styles/project-form.styles";

interface ProjectHeaderProps {
  title?: string;
  onPressAdd?: () => void;
  onPressMenu?: () => void;
}

export function ProjectHeader({
  title = "Dự án",
  onPressAdd,
  onPressMenu,
}: ProjectHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide} />

      <Typography variant="title" style={styles.headerTitle}>
        {title}
      </Typography>

      <View style={styles.headerSide}>
        {onPressAdd ? (
          <TouchableOpacity onPress={onPressAdd} style={{ alignItems: "flex-end", padding: 8 }}>
            <Ionicons name="add" size={28} color="#FFF" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
