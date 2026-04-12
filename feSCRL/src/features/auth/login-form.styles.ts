import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
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
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: "center",
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
  inputSection: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.3)",
    color: "#fff",
  },
  inputError: {
    borderColor: "#FF4D4F",
    borderWidth: 1,
  },
  continueButton: {
    borderRadius: 12,
    height: 56,
  },
  continueButtonDisabled: {
    backgroundColor: "#A3A3A3",
    opacity: 0.6,
  },
  continueButtonActive: {
    backgroundColor: "#E5E5E5",
  },
  footer: {
    marginTop: 30,
    width: "100%",
  },
  footerText: {
    textAlign: "left",
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    lineHeight: 18,
  },
  footerLink: {
    color: "rgba(255,255,255,0.8)",
    textDecorationLine: "underline",
    fontSize: 12,
  },
});
