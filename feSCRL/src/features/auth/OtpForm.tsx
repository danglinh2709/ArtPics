import { BaseInput } from "@/src/components/BaseInput";
import { Button } from "@/src/components/Button";
import { Typography } from "@/src/components/Typography";
import { ROUTES } from "@/src/enums/route.enum";
import { ILoginRequest } from "@/src/interfaces/request/login.request";
import { useAuthStore } from "@/src/stores/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./otp-form.styles";

export default function OtpForm() {
  const router = useRouter();
  const loginWithOtp = useAuthStore((state) => state.loginWithOtp);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { email } = useLocalSearchParams<{ email: string }>();

  const isButtonEnabled = otpValues.every((value) => value.trim().length === 1);

  const onContinue = async () => {
    try {
      const otpCode = otpValues.join("").trim();

      if (!email) {
        Alert.alert("Lỗi", "Không tìm thấy email");
        return;
      }

      if (otpCode.length !== 6) {
        Alert.alert("Lỗi", "Vui lòng nhập đủ 6 số OTP");
        return;
      }

      const payload: ILoginRequest = {
        email: String(email).trim(),
        otpCode,
        purpose: "login",
      };

      console.log("LOGIN OTP PAYLOAD:", payload);

      await loginWithOtp(payload);

      router.replace(ROUTES.MAINHOME);
    } catch (err: any) {
      console.log("LOGIN OTP ERROR:", err?.response?.data || err?.message);

      Alert.alert(
        "Lỗi",
        err?.response?.data?.message ||
          err?.message ||
          "Không xác thực được OTP",
      );
    }
  };

  const handleChange = (text: string, index: number) => {
    const value = text.replace(/\D/g, "").slice(0, 1);

    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otpValues];
        newOtp[index - 1] = "";
        setOtpValues(newOtp);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBadge}>
              <Ionicons name="person" size={60} color="#333" />
            </View>
          </View>
          <View style={{ width: 44 }} />
          <Typography variant="title" style={styles.headerTitle}>
            Bạn gần hoàn thành rồi
          </Typography>

          <View style={styles.infoBox}>
            <Typography variant="caption" style={styles.infoText}>
              Nhập mã 6 chữ số mà chúng tôi đã gửi đến
            </Typography>
          </View>

          <View style={styles.otpInput}>
            {Array.from({ length: 6 }).map((_, index) => (
              <BaseInput
                key={index}
                maxLength={1}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                value={otpValues[index]}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  paddingHorizontal: 0,
                }}
                containerStyle={{ width: 48 }}
                inputContainerStyle={{ height: 56, justifyContent: "center" }}
              />
            ))}
          </View>

          <Button
            title="Tiếp tục"
            loading={isLoading}
            onPress={onContinue}
            variant="primary"
            containerStyle={styles.continueButton}
            disabled={!isButtonEnabled || isLoading}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
