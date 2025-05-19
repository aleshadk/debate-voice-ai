import { useState, useRef, useCallback, useMemo } from "react";

export const useSpeechRecognitionTranscription = () => {
  const [submittedText, setSubmittedText] = useState("");
  const [nextChunk, setNextChunk] = useState("");
  const finalTranscriptRef = useRef("");

  const transcript = useMemo(() => {
    return submittedText + nextChunk;
  }, [submittedText, nextChunk]);

  const cleanUp = useCallback(() => {
    setSubmittedText("");
    setNextChunk("");
    finalTranscriptRef.current = "";
  }, []);

  const updateTranscript = useCallback(
    (value: string, isFinal: boolean) => {
      if (isFinal) {
        setNextChunk("");
        setSubmittedText((prev) => {
          const updated = prev + value;
          finalTranscriptRef.current = updated;
          return updated;
        });
        return;
      }

      setNextChunk(value);
    },
    []
  );

  return {
    transcript,
    cleanUp,
    updateTranscript,
    finalTranscriptRef,
  };
};
