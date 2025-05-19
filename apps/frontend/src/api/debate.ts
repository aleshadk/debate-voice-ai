import { API_CONFIG } from "../config/api";

// TODO: move to packages
export interface AnalyzeDebateAnswerDTO {
  topic: string;
  userAnswer: string;
  language?: "en" | "ru" | "es";
}

export interface AnalyzeDebateAnswerResponseDTO {
  feedback: string;
  topicSuggestions: string[];
}

export const analyzeDebateAnswer = async (
  data: AnalyzeDebateAnswerDTO
): Promise<AnalyzeDebateAnswerResponseDTO> => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE_ANSWER}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze debate answer");
  }

  return response.json();
};
