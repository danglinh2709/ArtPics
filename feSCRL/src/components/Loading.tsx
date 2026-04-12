import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

interface LoadingProps {
  inline?: boolean;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Loading({
  inline = false,
  size = 180,
  containerStyle,
}: LoadingProps) {
  return (
    <View
      style={[
        inline ? styles.inlineContainer : styles.loadingContainer,
        containerStyle,
      ]}
    >
      <LottieView
        source={require("@/assets/animations/loading.json")}
        autoPlay
        loop
        style={{
          width: size,
          height: size,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inlineContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
