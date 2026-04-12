import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../../../components/Typography";
import { useProjectStore } from "../../../stores/project.store";
import { EAssetType } from "@/src/enums/layer.enum";

interface IReplacePanelProps {
  onClose: () => void;
}

export function ReplacePanel({ onClose }: IReplacePanelProps) {
  const { selectedLayerId, replaceLayerAsset, currentProjectId, uploadAsset } =
    useProjectStore();

  const handlePickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!pickerResult.canceled && selectedLayerId && currentProjectId) {
      const localUri = pickerResult.assets[0].uri;

      replaceLayerAsset(selectedLayerId, localUri);
      onClose();

      const uploadResult = await uploadAsset(
        currentProjectId,
        EAssetType.Image,
        localUri,
      );

      if (uploadResult) {
        useProjectStore
          .getState()
          .replaceLayerAsset(
            selectedLayerId,
            uploadResult.uri,
            uploadResult.id,
          );
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.option} onPress={handlePickImage}>
        <View style={styles.iconCircle}>
          <Ionicons name="image-outline" size={28} color="#fff" />
        </View>
        <Typography style={styles.label}>Ảnh</Typography>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} disabled>
        <View style={styles.iconCircle}>
          <Ionicons
            name="play-circle-outline"
            size={28}
            color="rgba(255,255,255,0.3)"
          />
          <View style={styles.crownContainer}>
            <Ionicons name="ribbon" size={12} color="#000" />
          </View>
        </View>
        <Typography style={[styles.label, { color: "rgba(255,255,255,0.3)" }]}>
          Video
        </Typography>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    minWidth: "100%",
  },
  option: {
    alignItems: "center",
    width: 100,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },
  crownContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#EECB68",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 12,
  },
});
