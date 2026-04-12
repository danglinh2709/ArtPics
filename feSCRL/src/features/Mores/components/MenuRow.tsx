import { Typography } from "@/src/components/Typography";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export function MenuRow({
  label,
  value,
  onPress,
  disabled = false,
  isLast = false,
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  disabled?: boolean;
  isLast?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowBorder,
        pressed && !disabled && styles.rowPressed,
      ]}
    >
      <Typography style={styles.rowLabel} numberOfLines={1}>
        {label}
      </Typography>

      <View style={styles.rowRight}>
        {!!value && (
          <Typography style={styles.rowValue} numberOfLines={1}>
            {value}
          </Typography>
        )}

        {!disabled && (
          <Feather name="chevron-right" size={20} color="#6f6f73" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowPressed: {
    opacity: 0.7,
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2c2c2e",
  },

  rowLabel: {
    color: "#fff",
    fontSize: 17,
    flex: 1,
    marginBottom: 0,
  },

  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "45%",
  },

  rowValue: {
    color: "#b8b8bd",
    fontSize: 16,
    marginRight: 6,
    marginBottom: 0,
  },
});
