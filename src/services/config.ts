export const Config = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "",
  APP_ENVIRONMENT: import.meta.env.VITE_APP_ENVIRONMENT || "",
  API_URL: import.meta.env.VITE_API_URL || "",
  AUTH_SECRET: import.meta.env.VITE_AUTH_SECRET || "",
  MOCK_API: import.meta.env.VITE_MOCK_API === "true",
  TOKEN_EXPIRY: import.meta.env.VITE_TOKEN_EXPIRY || "",
};
