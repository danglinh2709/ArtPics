import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    height: 52,
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerSide: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 0,
  },
  menuButton: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 4,
  },

  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  tab: {
    position: "relative",
    paddingVertical: 12,
    marginRight: 24,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E8E93",
  },
  activeTabText: {
    color: "#fff",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 4,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#fff",
  },

  content: {
    flex: 1,
    paddingTop: 10,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  projectCard: {
    width: "100%",
    marginBottom: 16,
  },
  thumbnailContainer: {
    overflow: "hidden",
    position: "relative",
  },
  thumbnail: {
    flex: 1,
  },
  placeholderThumbnail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C2E",
  },
  projectMenuBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  projectLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "500",
    color: "#8E8E93",
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: -60,
  },
  folderIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "#8E8E93",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 12,
  },
  createButton: {
    minWidth: 160,
    width: "auto",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#EECB68",
  },
  masonryContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  masonryColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
