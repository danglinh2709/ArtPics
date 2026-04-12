import { AuthSliceCreator } from "../../types/auth.store.types";

export const createAuthDataSlice: AuthSliceCreator<
  Pick<
    import("../../types/auth.store.types").AuthState,
    "user" | "accessToken" | "refreshToken" | "isAuthenticated"
  >
> = () => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
});
