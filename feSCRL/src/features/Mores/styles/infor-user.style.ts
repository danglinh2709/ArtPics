import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 0,
  },
  headerSpacer: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  box: {
    backgroundColor: "#1C1C1E",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    minHeight: 72,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3A3A3C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#48484A",
  },
  initials: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  label: {
    fontSize: 15,
    color: "#ffffffff",
    marginBottom: 2,
    fontWeight: "700",
  },
  emailText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  blueBox: {
    backgroundColor: "#002D57",
    justifyContent: "center",
    minHeight: 56,
  },
  blueBoxText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    lineHeight: 20,
  },
  logoutButton: {
    backgroundColor: "#2C2C2E",
    borderRadius: 12,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff0000ff",
  },
});
