import { useState, useEffect, useRef, useCallback } from "react";

interface UseSpeechRecognitionProps {
  duration: number;
  handleTranscriptStart: () => void;
  onTranscriptEnd: (transcript: string) => void;
  onTranscriptChange?: (transcript: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

export const useSpeechRecognition = ({
  duration,
  handleTranscriptStart,
  onTranscriptEnd,
  onTranscriptChange,
  onError,
  language = "en-US",
}: UseSpeechRecognitionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef<number | null>(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    console.warn("RECREATING RECOGNITION");
    const RecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!RecognitionClass) {
      onError?.("Speech recognition is not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("SpeechRecognition stop failed:", e);
      }
      recognitionRef.current = null;
    }

    const recognition = new RecognitionClass() as SpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let combinedTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        combinedTranscript += result[0].transcript;
      }

      finalTranscriptRef.current = combinedTranscript;
      setTranscript(finalTranscriptRef.current);
      onTranscriptChange?.(combinedTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      onError?.(event.error);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      onTranscriptEnd(finalTranscriptRef.current);
      finalTranscriptRef.current = "";
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language, onTranscriptChange, onTranscriptEnd, onError]);

  const startRecording = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    handleTranscriptStart();

    try {
      finalTranscriptRef.current = "";
      setTranscript("");
      recognition.start();
      setIsRecording(true);
    } catch (e) {
      console.warn("Failed to start recognition:", e);
    }
  };

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }, []);

  useEffect(() => {
    if (isRecording) {
      setTimeLeft(duration);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [isRecording, duration, stopRecording]);

  return {
    isRecording,
    transcript,
    timeLeft,
    startRecording,
    stopRecording,
  };
};
