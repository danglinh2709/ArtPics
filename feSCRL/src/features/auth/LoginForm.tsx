import { BaseInput } from "@/src/components/BaseInput";
import { Button } from "@/src/components/Button";
import { Typography } from "@/src/components/Typography";
import { ROUTES } from "@/src/enums/route.enum";
import { useAuthStore } from "@/src/stores/auth.store";
import { loginSchema, type LoginFormData } from "@/src/utils/validation";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  Alert,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./login-form.styles";
import { LoginEmailField } from "./LoginEmailField";

export default function LoginForm() {
  const router = useRouter();
  const requestOtp = useAuthStore((state) => state.requestOtp);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });

  const watchEmail = watch("email");
  const isButtonEnabled = watchEmail.trim().length > 0;

  const handleClose = () => {
    router.back();
  };

  const onContinue = async (data: LoginFormData) => {
    try {
      await requestOtp(data.email);

      router.push({
        pathname: ROUTES.OTP,
        params: { email: data.email },
      });
    } catch (err: any) {
      Alert.alert("Lỗi", err?.message || "Không gửi được OTP");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 44 }} />
          <Typography variant="title" style={styles.headerTitle}>
            Đăng Nhập hoặc Đăng Ký
          </Typography>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBadge}>
              <Ionicons name="person" size={60} color="#333" />
            </View>
          </View>

          <View style={styles.infoBox}>
            <Typography variant="caption" style={styles.infoText}>
              Đăng nhập để đồng bộ hóa gói đăng ký trên các thiết bị. Chúng tôi
              sẽ kiểm tra xem bạn có tài khoản hay không và giúp tạo tài khoản
              nếu bạn chưa có.
            </Typography>
          </View>

          <View style={styles.inputSection}>
            <LoginEmailField control={control} error={errors.email?.message} />
          </View>
          <Button
            title="Tiếp tục"
            loading={isLoading}
            onPress={handleSubmit(onContinue)}
            containerStyle={[
              styles.continueButton,
              isButtonEnabled
                ? styles.continueButtonActive
                : styles.continueButtonDisabled,
            ]}
            variant="primary"
            disabled={!isButtonEnabled || isLoading}
          />

          <View style={styles.footer}>
            <Typography variant="caption" style={styles.footerText}>
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <Typography variant="link" style={styles.footerLink}>
                Điều khoản
              </Typography>{" "}
              &{" "}
              <Typography variant="link" style={styles.footerLink}>
                Chính sách Bảo mật
              </Typography>{" "}
              của SCRL.
            </Typography>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
