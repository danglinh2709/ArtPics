import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Typography } from "../../../components/Typography";
import { styles } from "./styles/pannel-container.style";

interface IPanelContainerProps {
  title: string;
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function PanelContainer({
  title,
  isVisible,
  onClose,
  children,
}: IPanelContainerProps) {
  if (!isVisible) return null;

  return (
    <Animated.View
      entering={SlideInDown.duration(300)}
      exiting={SlideOutDown.duration(250)}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.handle} />
        <Typography variant="subtitle" style={styles.title}>
          {title}
        </Typography>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );
}
