import { EAuth } from "../enums/auth.enum";
import { ILoginRequest } from "../interfaces/request/login.request";
import {
  ILoginResponse,
  RequestOtpPayload,
} from "../interfaces/response/auth.response";
import instances from "./api";

export const authService = {
  async requestOtp(payload: RequestOtpPayload) {
    const res = await instances.post(EAuth.REQUEST_OTP, payload);
    return res.data;
  },

  async loginWithOtp(payload: ILoginRequest) {
    const res = await instances.post(EAuth.LOGIN, payload);
    return res.data as ILoginResponse;
  },

  async refreshToken(refreshToken: string) {
    const res = await instances.post(EAuth.REFRESH_TOKEN, {
      refreshToken,
    });

    return res.data as {
      accessToken: string;
      refreshToken?: string;
    };
  },

  async logout(refreshToken: string | null) {
    const res = await instances.post(EAuth.LOGOUT, { refreshToken });
    return res.data;
  },

  getMe: async (accessToken: string) => {
    const { data } = await instances.get("/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  },
};
