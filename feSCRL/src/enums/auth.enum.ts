export enum EAuth {
  LOGIN = "auth/login",
  LOGOUT = "auth/logout",
  REQUEST_OTP = "auth/request-otp",
  REFRESH_TOKEN = "auth/refresh-token",
}

export enum EAuthToken {
  ACCESS_TOKEN_KEY = "accessToken",
  REFRESH_TOKEN_KEY = "refreshToken",
  TOKEN = "token",
}
