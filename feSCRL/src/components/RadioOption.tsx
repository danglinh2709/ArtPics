import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "./Typography";

interface IRadioOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function RadioOption({ label, selected, onPress }: IRadioOptionProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.radioOutline}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Typography variant="button" style={styles.label}>
        {label}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 12,
  },
  radioOutline: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ffffff",
  },
  label: {
    color: "#ffffff",
    fontWeight: "500",
  },
});
