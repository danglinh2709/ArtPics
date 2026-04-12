import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  valueBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 50,
    alignItems: "center",
  },
  valueText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  toggleLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  individualContainer: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  cornerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cornerLabel: {
    width: 70,
    color: "#8E8E93",
  },
  cornerSlider: {
    flex: 1,
    height: 30,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginVertical: 10,
  },
  borderBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  borderTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  borderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  borderValue: {
    color: "#8E8E93",
    marginRight: 8,
    fontSize: 14,
  },
});
