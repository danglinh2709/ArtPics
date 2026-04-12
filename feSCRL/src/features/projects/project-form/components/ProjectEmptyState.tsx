import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

import { Typography } from "../../../../components/Typography";
import { Button } from "../../../../components/Button";
import { styles } from "../../styles/project-form.styles";

interface IProjectEmptyStateProps {
  title: string;
  subtitle: string;
  buttonText: string;
  onPress: () => void;
}

export function ProjectEmptyState({
  title,
  subtitle,
  buttonText,
  onPress,
}: IProjectEmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.folderIconContainer}>
        <Ionicons name="folder" size={120} color="#2C2C2E" />
      </View>

      <Typography variant="title" style={styles.emptyTitle}>
        {title}
      </Typography>

      <Typography variant="subtitle" style={styles.emptySubtitle}>
        {subtitle}
      </Typography>

      <Button
        title={buttonText}
        onPress={onPress}
        containerStyle={styles.createButton}
      />
    </View>
  );
}
