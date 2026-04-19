import React from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "../../../../components/Typography";
import { ProjectMiniCanvas } from "../../project-form/components/ProjectMiniCanvas";
import { ILayer } from "@/src/types/editor.types";
import { ExportOption } from "./ExportOption";
import { styles } from "./styles/export-modal.style";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface IExportModalProps {
  visible: boolean;
  onClose: () => void;
  layers: ILayer[];
  pageBackground?: any;
  canvasWidth: number;
  canvasHeight: number;
  onExpand: () => void;
  onSaveImage: () => void;
}

export function ExportModal({
  visible,
  onClose,
  layers,
  pageBackground,
  canvasWidth,
  canvasHeight,
  onExpand,
  onSaveImage,
}: IExportModalProps) {
  const previewScale = (SCREEN_WIDTH - 120) / canvasWidth;
  const previewWidth = canvasWidth * previewScale;
  const previewHeight = canvasHeight * previewScale;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={{ width: 44 }} />
          <Typography style={styles.headerTitle}>Export</Typography>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabSwitcher}>
          <View style={styles.tabActive}>
            <Typography style={styles.tabTextActive}>Carousel</Typography>
          </View>
          <View style={styles.tabInactive}>
            <Typography style={styles.tabTextInactive}>Video</Typography>
            <View style={styles.crownContainer}>
              <Ionicons name="ribbon" size={14} color="#000" />
            </View>
          </View>
        </View>

        <View style={styles.previewContainer}>
          <View style={styles.previewCard}>
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
              <TouchableOpacity
                style={styles.expandBtn}
                onPress={onExpand}
                activeOpacity={0.8}
              >
                <Ionicons name="expand" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={[styles.dot, styles.dotInactive]} />
          </View>
        </View>

        <View style={styles.footer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.optionsScroll}
            decelerationRate="fast"
          >
            <ExportOption
              icon="download-outline"
              label="Camera Roll"
              onPress={onSaveImage}
            />
            <ExportOption icon="logo-instagram" label="Instagram" isNew />
            <ExportOption icon="calendar-outline" label="Schedule" isNew />
            <ExportOption icon="link-outline" label="Template Link" />
            <ExportOption icon="logo-tiktok" label="TikTok" />
            <ExportOption icon="ellipsis-horizontal" label="More" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
