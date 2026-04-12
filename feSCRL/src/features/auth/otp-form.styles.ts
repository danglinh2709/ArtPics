import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 140,
    marginHorizontal: 20,
  },

  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 0,
  },

  avatarContainer: {
    marginTop: 40,
    marginBottom: 60,
  },
  avatarBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoBox: {
    marginBottom: 30,
  },
  infoText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  otpInput: {
    flexDirection: "row",
    width: 50,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  continueButton: {
    borderRadius: 12,
    height: 56,
    margin: 40,
  },
});
