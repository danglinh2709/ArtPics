import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#121212",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 50,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 0,
  },
  closeButton: {
    padding: 5,
  },
  closeIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.15)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: "flex-end",
  },
  ratioItem: {
    alignItems: "center",
    marginRight: 1,
    minHeight: 200,
    justifyContent: "flex-end",
  },
  boxContainer: {
    width: 100,
    height: 180,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  ratioBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  ratioValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  ratioLabel: {
    fontSize: 14,
    color: "#D1D1D6",
    fontWeight: "600",
    marginTop: 5,
  },
});
