export const getApiBaseUrl = (): string => {
  return (process.env.EXPO_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
};

export const resolveAssetUri = (uri: string | null | undefined): string => {
  if (!uri) return "";
  const apiBaseUrl = getApiBaseUrl();

  if (
    uri.startsWith("http") ||
    uri.startsWith("file") ||
    uri.startsWith("data") ||
    uri.startsWith("content")
  ) {
    return uri;
  }

  return `${apiBaseUrl}/Asset/download/${uri}`;
};
