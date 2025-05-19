import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button/Button";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";

const RECORDING_DURATION = 30; // seconds

// Add type definitions for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export const SpeechRecognition = (props: {
  handleTranscriptStart: () => void;
  handleTranscriptChange: (value: string) => void;
  handleTranscriptEnd: (value: string) => void;
}) => {
  const { t } = useTranslation();
  const language = useCurrentLanguage();

  const onError = useCallback((error: string) => {
    console.error("Speech recognition error:", error);
  }, []);

  const { isRecording, startRecording, stopRecording, timeLeft } =
    useSpeechRecognition({
      duration: RECORDING_DURATION,
      handleTranscriptStart: props.handleTranscriptStart,
      onTranscriptEnd: props.handleTranscriptEnd,
      language: language === "en" ? "en-US" : "ru-RU",
      onError,
      onTranscriptChange: props.handleTranscriptChange,
    });

  const toggleRecording = () => {
    // setTimeout(() => {
    //   props.handleTranscriptChange("раз два три");
    //   props.handleTranscriptEnd("раз два три");
    // }, 500);
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center py-8 space-y-4">
      <Button
        onClick={toggleRecording}
        className={`relative w-32 h-32 rounded-full flex items-center justify-center ${
          isRecording ? "ring-4 ring-red-400 ring-opacity-50 animate-pulse" : ""
        }`}
        aria-label={
          isRecording ? t("debate.stopRecording") : t("debate.recordResponse")
        }
      >
        {/* Outer ring animation */}
        <div
          className={`absolute inset-0 rounded-full border-4 border-indigo-400/30 ${
            isRecording ? "animate-ping" : ""
          }`}
        />

        {/* Inner ring */}
        <div
          className={`absolute inset-2 rounded-full border-4 border-indigo-300/50 ${
            isRecording ? "animate-pulse" : ""
          }`}
        />

        {/* Icon */}
        {isRecording ? (
          <svg
            className="w-16 h-16 text-white transform transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        ) : (
          <svg
            className="w-16 h-16 text-white transform transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        )}
      </Button>

      {/* Timer and progress bar */}
      {isRecording && (
        <div className="w-full max-w-md space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / RECORDING_DURATION) * 100}%` }}
            />
          </div>
          <div className="text-center text-gray-600">
            {timeLeft}s {t("debate.remaining")}
          </div>
        </div>
      )}
    </div>
  );
};
