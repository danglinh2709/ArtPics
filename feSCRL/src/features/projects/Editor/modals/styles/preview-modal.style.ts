import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#111", // Dark background like Export modal
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  mockupContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  dragHandle: {
    width: 60,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 4,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#777",
    marginRight: 10,
  },
  userInfo: {
    gap: 6,
  },
  userNameLine: {
    width: 70,
    height: 8,
    backgroundColor: "#A0A0A0",
    borderRadius: 4,
  },
  userSubLine: {
    width: 40,
    height: 8,
    backgroundColor: "#D0D0D0",
    borderRadius: 4,
  },
  previewFrame: {
    alignSelf: "center",
    backgroundColor: "#fff",
    position: "relative",
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 16,
    position: "relative",
  },
  footerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginLeft: 16,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    top: 22,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dotActive: {
    backgroundColor: "#FF2D55", // TikTok pinkish-red
  },
  dotInactive: {
    backgroundColor: "#E0E0E0",
  },
});
