import { StyleSheet } from "react-native";
import { SCREEN_WIDTH } from "@/src/constants/device.constants";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "flex-end",
    marginTop: 150,
  },
  container: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "88%",
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: "#222",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  mockupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  instagramPost: {
    width: SCREEN_WIDTH,
    backgroundColor: "#000",
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
    backgroundColor: "#262626",
    marginRight: 10,
  },
  userInfo: {
    gap: 4,
  },
  userNameLine: {
    width: 70,
    height: 10,
    backgroundColor: "#262626",
    borderRadius: 2,
  },
  userSubLine: {
    width: 100,
    height: 8,
    backgroundColor: "#1C1C1C",
    borderRadius: 2,
  },
  previewFrame: {
    alignSelf: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 25,
    borderRadius: 1,
    overflow: "hidden",
    position: "relative",
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 14,
    position: "relative",
  },
  footerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    marginLeft: 14,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    backgroundColor: "#0095f6",
  },
  dotInactive: {
    backgroundColor: "#262626",
  },
});
