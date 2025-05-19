import { useMutation } from "@tanstack/react-query";
import {
  analyzeDebateAnswer,
  AnalyzeDebateAnswerDTO,
  AnalyzeDebateAnswerResponseDTO,
} from "../api/debate";
import { useState } from "react";

export const useDebateAnalysis = () => {
  const [data, setData] = useState<
    AnalyzeDebateAnswerResponseDTO | undefined
  >();

  const { mutate, isPending, reset } = useMutation<
    AnalyzeDebateAnswerResponseDTO,
    Error,
    AnalyzeDebateAnswerDTO
  >({
    mutationFn: analyzeDebateAnswer,
    onSuccess: (result) => setData(result),
  });

  const clear = () => {
    reset();
    setData(undefined);
  };

  return {
    mutate,
    data,
    isPending,
    reset: clear,
  };
};
