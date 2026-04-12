import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { Typography } from "./Typography";
import { Loading } from "./Loading";

interface IButtonProps extends TouchableOpacityProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  variant?: "primary" | "disabled";
  loading?: boolean;
}

export function Button({
  title,
  containerStyle,
  disabled,
  loading = false,
  ...props
}: IButtonProps) {
  const isDisabled = disabled || props.variant === "disabled" || loading;
  const showDisabledStyle = disabled || props.variant === "disabled";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showDisabledStyle && styles.containerDisabled,
        containerStyle,
      ]}
      activeOpacity={0.8}
      disabled={isDisabled}
      {...props}
    >
      <View style={styles.content}>
        {loading ? (
          <Loading inline size={90} />
        ) : (
          <Typography
            variant="button"
            style={showDisabledStyle ? styles.textDisabled : undefined}
          >
            {title}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  containerDisabled: {
    backgroundColor: "#A3A3A3",
  },
  content: {
    minHeight: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  textDisabled: {
    color: "#333333",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
});
