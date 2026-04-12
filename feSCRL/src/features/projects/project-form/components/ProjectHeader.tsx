import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Typography } from "../../../../components/Typography";
import { styles } from "../../styles/project-form.styles";

interface ProjectHeaderProps {
  title?: string;
  onPressMenu?: () => void;
}

export function ProjectHeader({
  title = "Dự án",
  onPressMenu,
}: ProjectHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerSide} />

      <Typography variant="title" style={styles.headerTitle}>
        {title}
      </Typography>

      <TouchableOpacity
        style={styles.menuButton}
        activeOpacity={0.8}
        onPress={onPressMenu}
      >
        <Ionicons name="ellipsis-horizontal-circle" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
