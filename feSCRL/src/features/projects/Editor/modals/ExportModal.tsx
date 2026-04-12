import React from "react";
import {
  Modal,
  StyleSheet,
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
import { styles } from "./export-modal.style";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface IExportModalProps {
  visible: boolean;
  onClose: () => void;
  layers: ILayer[];
  canvasWidth: number;
  canvasHeight: number;
  onExpand: () => void;
  onSaveImage: () => void;
}

export function ExportModal({
  visible,
  onClose,
  layers,
  canvasWidth,
  canvasHeight,
  onExpand,
  onSaveImage,
}: IExportModalProps) {
  const previewScale = (SCREEN_WIDTH - 80) / canvasWidth;
  const previewWidth = canvasWidth * previewScale;
  const previewHeight = canvasHeight * previewScale;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ width: 40 }} />
            <Typography style={styles.headerTitle}>Xuất</Typography>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={28} color="#444" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabSwitcher}>
            <View style={styles.tabActive}>
              <Typography style={styles.tabTextActive}>Carousel</Typography>
            </View>
            <View style={styles.tabInactive}>
              <Typography style={styles.tabTextInactive}>Video</Typography>
              <View style={styles.crownContainer}>
                <Ionicons name="ribbon" size={12} color="#000" />
              </View>
            </View>
          </View>

          <View style={styles.previewContainer}>
            <View
              style={[
                styles.previewFrame,
                { width: previewWidth, height: previewHeight },
              ]}
            >
              <ProjectMiniCanvas
                layers={layers}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                thumbnailWidth={previewWidth}
                thumbnailHeight={previewHeight}
              />
              <TouchableOpacity
                style={styles.expandBtn}
                onPress={onExpand}
                activeOpacity={0.7}
              >
                <Ionicons name="expand" size={24} color="#fff" />
              </TouchableOpacity>
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
                label="Ảnh"
                onPress={onSaveImage}
              />
              <ExportOption icon="logo-instagram" label="Instagram" />
              <ExportOption icon="logo-tiktok" label="TikTok" />
              <ExportOption icon="link-outline" label="Liên kết mẫu" isNew />
              <ExportOption icon="ellipsis-horizontal" label="Thêm" />
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}
