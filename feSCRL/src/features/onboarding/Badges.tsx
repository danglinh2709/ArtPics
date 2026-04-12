import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../../components/Typography";

export function AppStoreBadge() {
  return (
    <View style={styles.badgeContainer}>
      <Ionicons name="logo-apple" size={24} color="#fff" style={styles.icon} />
      <View>
        <Typography variant="caption" style={styles.badgeCaption}>
          APP
        </Typography>
        <Typography variant="caption" style={styles.badgeCaption}>
          OF THE
        </Typography>
        <Typography variant="button" style={styles.badgeStrong}>
          DAY
        </Typography>
      </View>
    </View>
  );
}

export function CreatorsBadge() {
  return (
    <View style={styles.badgeContainer}>
      <MaterialCommunityIcons
        name="leaf"
        size={20}
        color="#fff"
        style={styles.iconLeaf}
      />
      <View style={styles.textCenter}>
        <Typography variant="caption" style={styles.badgeCaption}>
          The Best Apps
        </Typography>
        <Typography variant="caption" style={styles.badgeCaption}>
          for Creators
        </Typography>
      </View>
      <MaterialCommunityIcons
        name="leaf"
        size={20}
        color="#fff"
        style={styles.iconLeafFlip}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    marginRight: 4,
  },
  iconLeaf: {
    marginRight: 4,
    transform: [{ rotate: "45deg" }],
    opacity: 0.8,
  },
  iconLeafFlip: {
    marginLeft: 4,
    transform: [{ rotate: "-45deg" }, { scaleX: -1 }],
    opacity: 0.8,
  },
  badgeCaption: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
    color: "#rgba(255,255,255,0.9)",
  },
  badgeStrong: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "900",
    color: "#fff",
  },
  textCenter: {
    alignItems: "center",
  },
});
