import { Typography } from "@/src/components/Typography";
import { ILayer, TToolbarTab } from "@/src/types/editor.types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { EditorToolbar } from "../../toolbar/EditorTabs";
import { EDITOR_UI_CONSTANTS } from "@/src/constants/editor.constant";

interface IEditorBottomBarProps {
  activeLayer?: ILayer;
  activeTab: TToolbarTab | null;
  ratioLabel?: string;
  onOpenLayerModal: () => void;
  onTabPress: (tab: TToolbarTab) => void;
  onCloseToolbar: () => void;
}

export function EditorBottomBar({
  activeLayer,
  activeTab,
  ratioLabel,
  onOpenLayerModal,
  onTabPress,
  onCloseToolbar,
}: IEditorBottomBarProps) {
  return (
    <View style={styles.bottomBar}>
      {activeLayer ? (
        <EditorToolbar
          activeLayer={activeLayer}
          activeTab={activeTab}
          onTabPress={onTabPress}
          onClose={onCloseToolbar}
        />
      ) : (
        <View style={styles.defaultBottomBar}>
          <View style={styles.bottomBarItem}>
            <Ionicons name="radio-button-off" size={24} color="#fff" />
            <Typography variant="caption" style={styles.bottomLabel}>
              Nền
            </Typography>
          </View>

          <View style={styles.bottomBarItem}>
            <Ionicons name="layers-outline" size={24} color="#fff" />
            <Typography variant="caption" style={styles.bottomLabel}>
              Lớp
            </Typography>
          </View>

          <TouchableOpacity style={styles.centerAdd} onPress={onOpenLayerModal}>
            <Ionicons name="add" size={32} color="#000" />
          </TouchableOpacity>

          <View style={styles.bottomBarItem}>
            <View style={styles.ratioIcon}>
              <Typography style={styles.ratioIconText}>
                {ratioLabel ?? "—"}
              </Typography>
            </View>
            <Typography variant="caption" style={styles.bottomLabel}>
              Tỷ lệ
            </Typography>
          </View>

          <View style={styles.bottomBarItem}>
            <View style={styles.slideIcon}>
              <Typography style={styles.slideIconText}>1</Typography>
            </View>
            <Typography variant="caption" style={styles.bottomLabel}>
              Slide
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "#000",
  },
  defaultBottomBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: EDITOR_UI_CONSTANTS.BOTTOM_BAR_HEIGHT,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  bottomBarItem: {
    alignItems: "center",
    width: 60,
  },
  bottomLabel: {
    fontSize: 12,
    color: "#fff",
    marginTop: 4,
  },
  centerAdd: {
    backgroundColor: "#fff",
    width: EDITOR_UI_CONSTANTS.CENTER_ADD_BTN_SIZE,
    height: EDITOR_UI_CONSTANTS.CENTER_ADD_BTN_SIZE,
    borderRadius: EDITOR_UI_CONSTANTS.CENTER_ADD_BTN_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  ratioIcon: {
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: "center",
  },
  ratioIconText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#fff",
  },
  slideIcon: {
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: 4,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  slideIconText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
  },
});
