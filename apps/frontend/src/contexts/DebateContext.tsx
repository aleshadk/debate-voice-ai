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
import {
  DEFAULT_TOPIC_EN,
  DEFAULT_TOPIC_RU,
} from "@/shared/const/debate-topic";

interface DebateContextType {
  topic: string;
  isLoading: boolean;
  feedback: string | undefined;
  topicSuggestions: string[] | undefined;
  startDebate: (answer: string) => void;
}

const DebateContext = createContext<DebateContextType | undefined>(undefined);

interface DebateProviderProps {
  children: ReactNode;
}

export const DebateProvider = ({ children }: DebateProviderProps) => {
  const language = useCurrentLanguage();
  const [topic] = useState(
    language === "ru" ? DEFAULT_TOPIC_RU : DEFAULT_TOPIC_EN
  );
  const { mutate, isPending, data } = useDebateAnalysis();

  const feedback = useMemo(() => {
    return data?.feedback;
  }, [data]);

  const topicSuggestions = useMemo(() => {
    return data?.topicSuggestions;
  }, [data]);

  const startDebate = useCallback(
    (answer: string) => {
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
      value={{ topic, isLoading: isPending, feedback, topicSuggestions, startDebate }}
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
