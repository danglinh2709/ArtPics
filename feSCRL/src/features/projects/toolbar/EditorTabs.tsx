import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { ILayer, TToolbarTab } from "../../../types/editor.types";

interface IEditorToolbarProps {
  activeLayer: ILayer;
  activeTab: TToolbarTab | null;
  onTabPress: (tab: TToolbarTab) => void;
  onClose: () => void;
}

const ALL_TABS: {
  id: TToolbarTab;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { id: "replace", label: "Thay thế", icon: "refresh-outline" },
  { id: "text", label: "Chỉnh sửa", icon: "text-outline" },
  { id: "format", label: "Định dạng", icon: "text-sharp" },
  { id: "align", label: "Căn chỉnh", icon: "menu-outline" },
  { id: "position", label: "Vị trí", icon: "layers-outline" },
  { id: "opacity", label: "Độ mờ", icon: "contrast-outline" },
  { id: "style", label: "Kiểu", icon: "color-palette-outline" },
  { id: "crop", label: "Cắt", icon: "crop-outline" },
  { id: "adjust", label: "Chỉnh sửa", icon: "options-outline" },
];

export function EditorToolbar({
  activeLayer,
  activeTab,
  onTabPress,
  onClose,
}: IEditorToolbarProps) {
  const tabs = ALL_TABS.filter((tab) => {
    if (activeLayer?.type === "text") {
      return ["text", "format", "align", "position", "opacity"].includes(
        tab.id,
      );
    }
    return ["replace", "crop", "style", "adjust"].includes(tab.id);
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabItem, activeTab === tab.id && styles.activeTab]}
            onPress={() => onTabPress(tab.id)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={activeTab === tab.id ? "#EECB68" : "#fff"}
            />
            <Typography
              variant="caption"
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="close" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  tabList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabItem: {
    alignItems: "center",
    width: 60,
    paddingVertical: 8,
  },
  activeTab: {
    // Optional: add a small indicator or background
  },
  tabLabel: {
    fontSize: 10,
    color: "#fff",
    marginTop: 4,
  },
  activeLabel: {
    color: "#EECB68",
  },
  closeBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
