import { AuthSliceCreator } from "../../types/auth.store.types";

export const createAuthUiSlice: AuthSliceCreator<
  Pick<
    import("../../types/auth.store.types").AuthState,
    "isHydrated" | "isLoading"
  >
> = () => ({
  isHydrated: false,
  isLoading: false,
});
