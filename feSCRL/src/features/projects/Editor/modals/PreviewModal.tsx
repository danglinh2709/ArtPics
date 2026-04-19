import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "../../../../components/Typography";
import { ProjectMiniCanvas } from "../../project-form/components/ProjectMiniCanvas";
import { ILayer } from "@/src/types/editor.types";
import { styles } from "./styles/preview-modal.style";
import { SCREEN_WIDTH } from "@/src/constants/device.constants";

interface IPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  layers: ILayer[];
  pageBackground?: any;
  canvasWidth: number;
  canvasHeight: number;
}

export function PreviewModal({
  visible,
  onClose,
  layers,
  pageBackground,
  canvasWidth,
  canvasHeight,
}: IPreviewModalProps) {
  const previewScale = (SCREEN_WIDTH - 60) / canvasWidth;
  const previewWidth = canvasWidth * previewScale;
  const previewHeight = canvasHeight * previewScale;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <View style={{ width: 44 }} />
          <Typography style={styles.headerTitle}>Preview</Typography>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <Ionicons name="close" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.mockupContainer}>
          <View style={styles.whiteCard}>
            <View style={styles.dragHandle} />

            <View style={styles.postHeader}>
              <View style={styles.profileCircle} />
              <View style={styles.userInfo}>
                <View style={styles.userNameLine} />
                <View style={styles.userSubLine} />
              </View>
              <Ionicons
                name="ellipsis-horizontal"
                size={20}
                color="#A0A0A0"
                style={{ marginLeft: "auto" }}
              />
            </View>

            <View
              style={[
                styles.previewFrame,
                { width: previewWidth, height: previewHeight },
              ]}
            >
              <ProjectMiniCanvas
                layers={layers}
                pageBackground={pageBackground}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                thumbnailWidth={previewWidth}
                thumbnailHeight={previewHeight}
              />
            </View>

            <View style={styles.postFooter}>
              <View style={styles.footerActions}>
                <Ionicons name="heart-outline" size={26} color="#222" />
                <Ionicons
                  name="chatbubble-outline"
                  size={24}
                  color="#222"
                  style={styles.actionIcon}
                />
                <Ionicons
                  name="paper-plane-outline"
                  size={24}
                  color="#222"
                  style={styles.actionIcon}
                />
              </View>

              <View style={styles.dotsContainer}>
                <View style={[styles.dot, styles.dotActive]} />
                <View style={[styles.dot, styles.dotInactive]} />
              </View>

              <Ionicons
                name="bookmark-outline"
                size={24}
                color="#222"
                style={{ marginLeft: "auto" }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
