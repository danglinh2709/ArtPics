import { BaseInput } from "@/src/components/BaseInput";
import type { LoginFormData } from "@/src/utils/validation";
import { Controller, type Control } from "react-hook-form";
import { styles } from "./login-form.styles";

interface LoginEmailFieldProps {
  control: Control<LoginFormData>;
  error?: string;
}

export function LoginEmailField({ control, error }: LoginEmailFieldProps) {
  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { onChange, onBlur, value } }) => (
        <BaseInput
          label="Email*"
          placeholder="john.doe@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          error={error}
          style={[styles.input, error && styles.inputError]}
        />
      )}
    />
  );
}
