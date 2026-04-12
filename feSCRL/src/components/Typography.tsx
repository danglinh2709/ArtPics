import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface ITypographyProps extends TextProps {
  variant?: "title" | "subtitle" | "caption" | "button" | "link";
  children: React.ReactNode;
}

export function Typography({
  variant = "caption",
  style,
  children,
  ...props
}: ITypographyProps) {
  return (
    <Text style={[styles.text, styles[variant], style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffffff",
    fontFamily: "System",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: "#rgba(255,255,255,0.8)",
    marginBottom: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400",
    color: "#rgba(255,255,255,0.6)",
  },
  button: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  link: {
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
