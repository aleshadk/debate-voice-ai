export interface AnalyzeDebateAnswerDTO {
  topic: string;
  userAnswer: string;
  language?: "en" | "ru" | "es";
}