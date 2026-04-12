import React, { forwardRef } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type TInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  prefix?: React.ReactNode;
};

export const BaseInput = forwardRef<TextInput, TInputProps>(
  ({ label, error, containerStyle, inputContainerStyle, prefix, style, ...props }, ref) => {
    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}

        <View style={[styles.inputContainer, error ? styles.inputError : null, inputContainerStyle]}>
          {prefix && <View style={styles.prefixWrapper}>{prefix}</View>}
          <TextInput
            ref={ref}
            placeholderTextColor="#999"
            {...props}
            style={[styles.input, prefix ? styles.inputWithPrefix : null, style]}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    borderRadius: 12,
    backgroundColor: "transparent",
  },
  prefixWrapper: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#fff",
  },
  inputWithPrefix: {
    paddingLeft: 0,
  },
  inputError: {
    borderColor: "#ff4444",
  },
  error: {
    marginTop: 6,
    fontSize: 13,
    color: "#ff4444",
  },
});
