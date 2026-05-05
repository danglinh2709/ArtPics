import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { Typography } from "@/src/components/Typography";
import { ISticker, stickerService } from "@/src/services/sticker.service";

interface IStickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectSticker: (imageUrl: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  emoji: "Biểu cảm",
  decorative: "Trang trí",
  gesture: "Cử chỉ",
  food: "Đồ ăn",
};

export function StickerModal({
  visible,
  onClose,
  onSelectSticker,
}: IStickerModalProps) {
  const [stickers, setStickers] = useState<ISticker[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStickers = useCallback(async () => {
    setIsLoading(true);
    try {
      const [stickerData, categoryData] = await Promise.all([
        stickerService.getAll(selectedCategory ?? undefined),
        stickerService.getCategories(),
      ]);
      setStickers(stickerData);
      setCategories((prev) => (prev.length === 0 ? categoryData : prev));
    } catch (error) {
      console.warn("[StickerModal] Failed to fetch stickers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (visible) {
      fetchStickers();
    }
  }, [visible, fetchStickers]);

  const handleSelectSticker = (sticker: ISticker) => {
    onSelectSticker(sticker.imageUrl);
    onClose();
  };

  const renderSticker = ({ item }: { item: ISticker }) => (
    <TouchableOpacity
      style={styles.stickerItem}
      onPress={() => handleSelectSticker(item)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.stickerImage}
        contentFit="contain"
        transition={200}
      />
      <Typography
        variant="caption"
        style={styles.stickerName}
        numberOfLines={1}
      >
        {item.name}
      </Typography>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ width: 44 }} />
            <Typography variant="title" style={styles.title}>
              Nhãn dán
            </Typography>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === null && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(null)}
            >
              <Typography
                style={[
                  styles.categoryText,
                  selectedCategory === null && styles.categoryTextActive,
                ]}
              >
                Tất cả
              </Typography>
            </TouchableOpacity>

            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat && styles.categoryChipActive,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Typography
                  style={[
                    styles.categoryText,
                    selectedCategory === cat && styles.categoryTextActive,
                  ]}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Sticker Grid */}
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <FlatList
              data={stickers}
              keyExtractor={(item) => item.id}
              renderItem={renderSticker}
              numColumns={4}
              contentContainerStyle={styles.gridContainer}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Typography style={styles.emptyText}>
                    Không tìm thấy nhãn dán
                  </Typography>
                </View>
              }
            />
          )}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#161618",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    paddingHorizontal: 16,
    maxHeight: "70%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  closeBtn: {
    backgroundColor: "#2c2c2e",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryScroll: {
    marginBottom: 12,
    flexGrow: 0,
    flexShrink: 0,
  },
  categoryContainer: {
    gap: 8,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#2c2c2e",
    flexShrink: 0,
  },
  categoryChipActive: {
    backgroundColor: "#fff",
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#aaa",
  },
  categoryTextActive: {
    color: "#000",
  },
  gridContainer: {
    paddingBottom: 20,
  },
  stickerItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  stickerImage: {
    width: 60,
    height: 60,
  },
  stickerName: {
    color: "#aaa",
    fontSize: 11,
    marginTop: 6,
    textAlign: "center",
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#666",
    fontSize: 14,
  },
});
