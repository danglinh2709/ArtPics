import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { AuthState } from "./types/auth.store.types";

import { createAuthDataSlice } from "./slices/auth/auth-data.slice";
import { createAuthUiSlice } from "./slices/auth/auth-ui.slice";
import { createAuthApiSlice } from "./slices/auth/auth-api.slice";
import { authBus } from "../utils/auth-bus";

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((...args) => ({
    ...createAuthDataSlice(...args),
    ...createAuthUiSlice(...args),
    ...createAuthApiSlice(...args),
  }))
);

// Listen for unauthorized events from the API and clear local auth state
authBus.onUnauthorized(() => {
  useAuthStore.getState().clearAuth();
});

export type { AuthState } from "./types/auth.store.types";
