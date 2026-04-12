import { authService } from "../../../services/auth.service";
import { storage } from "../../../utils/storage";
import { useFolderStore } from "../../folder.store";
import { useProjectStore } from "../../project.store";
import { AuthSliceCreator } from "../../types/auth.store.types";

export const createAuthApiSlice: AuthSliceCreator<
  Pick<
    import("../../types/auth.store.types").AuthState,
    | "setAuth"
    | "clearAuth"
    | "hydrate"
    | "requestOtp"
    | "loginWithOtp"
    | "refreshAccessToken"
    | "logout"
  >
> = (set, get) => ({
  setAuth: async ({ user, accessToken, refreshToken }) => {
    await Promise.all([
      storage.setAccessToken(accessToken),
      storage.setRefreshToken(refreshToken),
      user ? storage.setUser(user) : Promise.resolve(),
    ]);

    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  clearAuth: async () => {
    await storage.clearAll();

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });

    // Reset Memory State inside associated global stores explicitly
    // This provides graceful teardown avoiding cross-session data leaks
    useProjectStore.setState({ projects: [], currentProjectId: null, layers: [] });
    useFolderStore.setState({ folders: [], activeFolderId: null });
  },

  hydrate: async () => {
    try {
      set({ isLoading: true });

      const [accessToken, refreshToken, user] = await Promise.all([
        storage.getAccessToken(),
        storage.getRefreshToken(),
        storage.getUser(),
      ]);

      if (accessToken && refreshToken && user) {
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      } else {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      }
    } catch {
      await get().clearAuth();
    } finally {
      set({
        isLoading: false,
        isHydrated: true,
      });
    }
  },

  requestOtp: async (email: string) => {
    try {
      set({ isLoading: true });
      await authService.requestOtp({ email });
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithOtp: async (payload) => {
    try {
      set({ isLoading: true });

      const data = await authService.loginWithOtp(payload);
      let user = data.user;

      if (!user && data.accessToken) {
        try {
          user = await authService.getMe(data.accessToken);
        } catch (err: any) {
          throw err;
        }
      }

      await get().setAuth({
        user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    } catch (error: any) {
      console.log(
        "LOGIN WITH OTP ERROR:",
        error?.response?.data || error.message
      );
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  refreshAccessToken: async () => {
    const currentRefreshToken = get().refreshToken;
    const currentUser = get().user;

    if (!currentRefreshToken || !currentUser) {
      await get().clearAuth();
      return null;
    }

    try {
      const data = await authService.refreshToken(currentRefreshToken);
      const nextRefreshToken = data.refreshToken ?? currentRefreshToken;

      await get().setAuth({
        user: currentUser,
        accessToken: data.accessToken,
        refreshToken: nextRefreshToken,
      });

      return data.accessToken;
    } catch {
      await get().clearAuth();
      return null;
    }
  },

  logout: async () => {
    const currentRefreshToken = get().refreshToken;

    try {
      if (currentRefreshToken) {
        await authService.logout(currentRefreshToken);
      }
    } finally {
      await get().clearAuth();
    }
  },
});
