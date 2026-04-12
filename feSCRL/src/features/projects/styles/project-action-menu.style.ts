import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    padding: 16,
    paddingBottom: 30,
  },
  menuContainer: {
    width: "100%",
  },
  optionsBlock: {
    backgroundColor: "#2C2C2E",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 10,
  },
  option: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "400",
  },
  deleteText: {
    color: "#FF453A",
  },
  separator: {
    height: 0.5,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 16,
  },
  cancelButton: {
    backgroundColor: "#2C2C2E",
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
