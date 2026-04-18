import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  input: {
    color: "#000",
    fontSize: 42,
    fontWeight: "700",
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  keyboardToolbarWrapper: {
    width: "100%",
  },
  keyboardToolbar: {
    height: 50,
    backgroundColor: "#1c1c1e",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  tabList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  tabItemActive: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    height: "100%",
    paddingHorizontal: 4,
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
  },
  activeTabText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  tabText: {
    color: "#888",
    fontSize: 14,
  },
  closeBtn: {
    padding: 4,
  },
});
