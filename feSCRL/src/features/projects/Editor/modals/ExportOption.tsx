import { Typography } from "@/src/components/Typography";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { TouchableOpacity, View } from "react-native";

export function ExportOption({
  icon,
  label,
  onPress,
  isNew,
}: {
  icon: any;
  label: string;
  onPress?: () => void;
  isNew?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.optionItem} onPress={onPress}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={26} color="#fff" />
        {isNew && (
          <View style={styles.newBadge}>
            <Typography style={styles.newText}>Mới</Typography>
          </View>
        )}
      </View>
      <Typography style={styles.optionLabel}>{label}</Typography>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  optionItem: {
    alignItems: "center",
    marginHorizontal: 12,
    width: 72,
    paddingVertical: 10,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
    borderWidth: 1.5,
    borderColor: "#2a2a2a",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  optionLabel: {
    color: "#aaa",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 16,
  },
  newBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#121212",
  },
  newText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "800",
  },
});
