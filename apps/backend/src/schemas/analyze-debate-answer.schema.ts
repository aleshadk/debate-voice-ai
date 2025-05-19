import { z } from "zod";

export const AnalyzeDebateAnswerSchema = z.object({
  topic: z.string().min(5),
  userAnswer: z.string().min(10),
  language: z.enum(["en", "ru"]),
});

export type AnalyzeDebateAnswerDTO = z.infer<typeof AnalyzeDebateAnswerSchema>;

export const AnalyzeDebateAnswerResponseSchema = z.object({
  feedback: z.string(),
  topicSuggestions: z.array(z.string()),
});

export type AnalyzeDebateAnswerResponseDTO = z.infer<typeof AnalyzeDebateAnswerResponseSchema>;
