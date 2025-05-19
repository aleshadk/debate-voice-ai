export const API_CONFIG = {
  BASE_URL: "https://debate-voice-ai.onrender.com/api",
  ENDPOINTS: {
    ANALYZE_ANSWER: "/analyze-answer",
  },
} as const;

// Типы для конфигурации
export type ApiConfig = typeof API_CONFIG;
export type ApiEndpoints = typeof API_CONFIG.ENDPOINTS;
