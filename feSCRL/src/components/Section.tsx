import { Typography } from "@/src/components/Typography";
import React from "react";
import { StyleSheet, View } from "react-native";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  value?: string;
};

export function Section({ title, value, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Typography
          variant="caption"
          style={[styles.sectionTitle, value && styles.sectionTitleWithValue]}
        >
          {title}
        </Typography>

        {value ? (
          <View style={styles.valueBox}>
            <Typography style={styles.valueText}>{value}</Typography>
          </View>
        ) : null}
      </View>

      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    color: "#7f7f84",
    fontSize: 13,
    paddingHorizontal: 4,
    textTransform: "uppercase",
  },

  sectionTitleWithValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "none",
    paddingHorizontal: 0,
  },

  card: {
    backgroundColor: "#1c1c1e",
    borderRadius: 18,
    overflow: "hidden",
  },

  valueBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 50,
    alignItems: "center",
  },

  valueText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
