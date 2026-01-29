function loadEnv(key: string): string {
  const value = import.meta.env[key] as string;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const envConfig = {
  app: {
    mode: import.meta.env.MODE,
    isProd: import.meta.env.PROD,
    isDev: import.meta.env.DEV,
  },
  api: {
    baseUrl: loadEnv("VITE_API_URL"),
    apiKey: loadEnv("VITE_API_KEY"),
  },
};
