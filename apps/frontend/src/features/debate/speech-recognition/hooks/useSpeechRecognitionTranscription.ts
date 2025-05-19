import { useState, useRef, useCallback, useMemo, useEffect } from "react";

export const useSpeechRecognitionTranscription = () => {
  const [submittedText, setSubmittedText] = useState("");
  const [nextChunk, setNextChunk] = useState("");
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    finalTranscriptRef.current = submittedText + nextChunk;
  }, [submittedText, nextChunk]);

  const transcript = useMemo(() => {
    return submittedText + nextChunk;
  }, [submittedText, nextChunk]);

  const cleanUp = useCallback(() => {
    setSubmittedText("");
    setNextChunk("");
    finalTranscriptRef.current = "";
  }, []);

  const updateTranscript = useCallback((value: string, isFinal: boolean) => {
    if (isFinal) {
      setNextChunk("");
      setSubmittedText((prev) => prev + value);
      return;
    }

    setNextChunk(value);
  }, []);

  return {
    transcript,
    cleanUp,
    updateTranscript,
    finalTranscriptRef,
  };
};
