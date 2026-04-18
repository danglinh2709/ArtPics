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
    marginHorizontal: 10,
    width: 80,
    paddingVertical: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2c2c2e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  optionLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
  },
  newBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#007AFF",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  newText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "800",
  },
});
