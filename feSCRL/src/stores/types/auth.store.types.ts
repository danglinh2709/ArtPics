import { StateCreator } from "zustand";
import { ILoginRequest } from "../../interfaces/request/login.request";
import { IUserResponse } from "../../interfaces/response/auth.response";

export interface AuthState {
  // Auth Data
  user: IUserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  
  // Auth UI
  isHydrated: boolean;
  isLoading: boolean;

  // Actions
  setAuth: (payload: {
    user: IUserResponse | null;
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  clearAuth: () => Promise<void>;
  hydrate: () => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  loginWithOtp: (payload: ILoginRequest) => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => Promise<void>;
}

export type AuthSliceCreator<T> = StateCreator<AuthState, [["zustand/subscribeWithSelector", never]], [], T>;
