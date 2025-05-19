import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useDebateAnalysis } from "@/hooks/useDebateAnalysis";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";

interface DebateContextType {
  topic: string;
  isLoading: boolean;
  feedback: string | undefined;
  topicSuggestions: string[] | undefined;
  hasResults: boolean;
  reset: () => void;
  startDebate: (answer: string) => void;
  setTopic: (topic: string) => void;
}

const DebateContext = createContext<DebateContextType | undefined>(undefined);

interface DebateProviderProps {
  children: ReactNode;
}

export const DebateProvider = ({ children }: DebateProviderProps) => {
  const language = useCurrentLanguage();
  const [topic, setTopic] = useState("");
  const { mutate, isPending, data, reset } = useDebateAnalysis();

  const hasResults = useMemo(() => {
    return data !== undefined;
  }, [data]);

  const feedback = useMemo(() => {
    return data?.feedback;
  }, [data]);

  const topicSuggestions = useMemo(() => {
    return data?.topicSuggestions;
  }, [data]);

  const startDebate = useCallback(
    (answer: string) => {
      if (!topic || !answer) {
        return;
      }

      mutate({
        topic,
        userAnswer: answer,
        language,
      });
    },
    [mutate, language, topic]
  );

  return (
    <DebateContext.Provider
      value={{
        topic,
        isLoading: isPending,
        feedback,
        topicSuggestions,
        hasResults,
        startDebate,
        setTopic,
        reset,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
};

export const useDebateContext = () => {
  const context = useContext(DebateContext);
  if (context === undefined) {
    throw new Error("useDebateContext must be used within a DebateProvider");
  }
  return context;
};
