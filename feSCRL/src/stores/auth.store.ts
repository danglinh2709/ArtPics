import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { AuthState } from "./types/auth.store.types";

import { createAuthDataSlice } from "./slices/auth/auth-data.slice";
import { createAuthUiSlice } from "./slices/auth/auth-ui.slice";
import { createAuthApiSlice } from "./slices/auth/auth-api.slice";

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector((...args) => ({
    ...createAuthDataSlice(...args),
    ...createAuthUiSlice(...args),
    ...createAuthApiSlice(...args),
  }))
);

export type { AuthState } from "./types/auth.store.types";
