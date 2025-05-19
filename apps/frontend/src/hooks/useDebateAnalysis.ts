import { useMutation } from "@tanstack/react-query";
import { analyzeDebateAnswer, AnalyzeDebateAnswerDTO, AnalyzeDebateAnswerResponseDTO } from "../api/debate";

export const useDebateAnalysis = () => {
  return useMutation<
    AnalyzeDebateAnswerResponseDTO,
    Error,
    AnalyzeDebateAnswerDTO
  >({
    mutationFn: analyzeDebateAnswer,
  });
};
