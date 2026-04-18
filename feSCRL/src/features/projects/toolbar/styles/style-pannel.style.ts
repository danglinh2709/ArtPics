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
  borderControls: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
    marginTop: 4,
  },
  subLabel: {
    color: "#8E8E93",
    fontSize: 12,
    marginBottom: 4,
  },
  borderColorRow: {
    marginTop: 12,
  },
  colorPredefined: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeColor: {
    borderColor: "#fff",
  },
});

