import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError } from "../utils/api-error";
import { ERROR_CODE } from "../configs/error.config";
import { storage } from "../utils/storage";
import { authBus } from "../utils/auth-bus";

const instances = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 120000,
});

console.log("BASE URL:", process.env.EXPO_PUBLIC_API_BASE_URL);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else if (token) {
      item.resolve(token);
    }
  });

  failedQueue = [];
};

instances.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const url = (config.url || "").toLowerCase();

    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/request-otp") ||
      url.includes("/auth/refresh-token") ||
      url.includes("/auth/logout");

    if (isAuthRoute) {
      return config;
    }

    const token = await storage.getAccessToken();

    if (token) {
      config.headers = config.headers || {};
      if (!config.headers.Authorization && !config.headers.authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instances.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message?: string }>) => {
    if (!error.response) {
      if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        return Promise.reject(
          new ApiError(
            "Server took too long to respond. Please try again.",
            ERROR_CODE.TIMEOUT,
          ),
        );
      }

      return Promise.reject(new ApiError("No connection to server"));
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const { status, data } = error.response;
    const url = (originalRequest?.url || "").toLowerCase();

    const isRefreshRoute = url.includes("/auth/refresh-token");
    const isLoginRoute = url.includes("/auth/login");
    const isRequestOtpRoute = url.includes("/auth/request-otp");

    if (
      status === 401 &&
      !originalRequest?._retry &&
      !isRefreshRoute &&
      !isLoginRoute &&
      !isRequestOtpRoute
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(instances(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await storage.getRefreshToken();

        if (!refreshToken) {
          authBus.emitUnauthorized();
          return Promise.reject(
            new ApiError("Unauthorized", ERROR_CODE.UNAUTHORIZED, 401),
          );
        }
        const refreshResponse = await instances.post("/Auth/refresh-token", {
          refreshToken,
        });

        const newAccessToken = refreshResponse.data.accessToken as string;
        const newRefreshToken =
          refreshResponse.data.refreshToken ?? refreshToken;

        await storage.setAccessToken(newAccessToken);
        await storage.setRefreshToken(newRefreshToken);

        processQueue(null, newAccessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instances(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        authBus.emitUnauthorized();

        return Promise.reject(
          new ApiError("Unauthorized", ERROR_CODE.UNAUTHORIZED, 401),
        );
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 409) {
      return Promise.reject(
        new ApiError(
          data?.message || "Already exists",
          ERROR_CODE.CONFLICT,
          409,
        ),
      );
    }

    if (status === 400) {
      return Promise.reject(
        new ApiError(
          data?.message || "Invalid data",
          ERROR_CODE.BAD_REQUEST,
          400,
        ),
      );
    }

    if (status === 404) {
      return Promise.reject(
        new ApiError(
          data?.message || "Resource not found",
          ERROR_CODE.NOT_FOUND,
          404,
        ),
      );
    }

    if (status >= 500) {
      return Promise.reject(
        new ApiError(
          data?.message || "Server error, please try again later",
          "SERVER_ERROR",
          status,
        ),
      );
    }

    return Promise.reject(
      new ApiError(data?.message || error.message, ERROR_CODE.UNKNOWN, status),
    );
  },
);

export default instances;
