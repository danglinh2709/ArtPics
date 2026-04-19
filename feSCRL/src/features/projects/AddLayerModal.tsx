import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Typography } from "../../components/Typography";
import {
  LAYER_MENU_ITEMS,
  LAYER_MENU_ITEMS_ACTION_TYPE,
} from "@/src/configs/editor.config";
import { TTextLayer } from "@/src/types/editor.types";
import { styles } from "./styles/add-layer-modal.style";

interface IAddLayerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: (uri: string, width: number, height: number) => void;
  onAddText: (textLayer: TTextLayer) => void;
}

export function AddLayerModal({
  visible,
  onClose,
  onSelectImage,
  onAddText,
}: IAddLayerModalProps) {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Cần quyền truy cập ảnh để tiếp tục!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      onSelectImage(asset.uri, asset.width, asset.height);
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <View style={{ width: 44 }} />
            <Typography variant="title" style={styles.title}>
              Lớp mới
            </Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.grid}>
            {LAYER_MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() => {
                  if (
                    item.actionType === LAYER_MENU_ITEMS_ACTION_TYPE.GALLERY
                  ) {
                    pickImage();
                    return;
                  }

                  // if (item.actionType === LAYER_MENU_ITEMS_ACTION_TYPE.TEXT) {
                  //   onAddText({
                  //     text: "Văn bản mới",
                  //     x: 100,
                  //     y: 100,
                  //     width: 200,
                  //     height: 50,
                  //   });
                  //   onClose();
                  //   return;
                  // }
                }}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={30} color="#fff" />
                  {item.hasCrown && (
                    <View style={styles.crown}>
                      <Ionicons name="star" size={8} color="#000" />
                    </View>
                  )}
                  {item.isNew && (
                    <View style={styles.newBadge}>
                      <Typography style={styles.newBadgeText}>Mới</Typography>
                    </View>
                  )}
                </View>
                <Typography variant="caption" style={styles.itemLabel}>
                  {item.name}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
