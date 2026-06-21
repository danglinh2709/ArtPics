export enum EAuth {
  LOGIN = "/Auth/login",
  LOGOUT = "/Auth/logout",
  REQUEST_OTP = "/Auth/request-otp",
  REFRESH_TOKEN = "/Auth/refresh-token",
}

export enum EAuthToken {
  ACCESS_TOKEN_KEY = "accessToken",
  REFRESH_TOKEN_KEY = "refreshToken",
  TOKEN = "token",
}
