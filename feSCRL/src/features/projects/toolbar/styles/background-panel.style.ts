import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 24, // Dư giả không gian cuộn dưới
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: 2,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  tabText: {
    fontSize: 13,
    color: "#8E8E93",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  //  COLOR SWATCHES (Circular)
  colorContainer: {
    width: "15%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColorContainer: {
    borderColor: "#ffffff",
  },
  colorPreview: {
    width: "85%",
    height: "85%",
    borderRadius: 999,
  },
  transparentIcon: {
    width: "85%",
    height: "85%",
    borderRadius: 999,
    backgroundColor: "#2C2C2E",
    justifyContent: "center",
    alignItems: "center",
  },
  colorWheelIcon: {
    width: "85%",
    height: "85%",
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  //  GRADIENTS / TEXTURES
  squareContainer: {
    width: "22%",
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    overflow: "hidden",
  },
  selectedSquareContainer: {
    borderColor: "#ffffff",
  },
  squarePreview: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  textureImage: {
    flex: 1,
    opacity: 0.8,
  },
});
