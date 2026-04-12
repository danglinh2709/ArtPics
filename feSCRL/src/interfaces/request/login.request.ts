export interface ILoginRequest {
  email: string;
  otpCode: string;
  purpose: string;
  deviceId?: string;
  deviceName?: string;
  ipAddress?: string;
}
