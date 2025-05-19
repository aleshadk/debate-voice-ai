import { createSpeechRecognitionInstance } from "@/shared/browser-api/createSpeechRecognitionInstance";
import { useState, useEffect, useRef, useCallback } from "react";
import { useSpeechRecognitionTimeout } from "./useSpeechRecognitionTimeout";
import { UseSpeechRecognitionProps } from "../types";
import { useSpeechRecognitionTranscription } from "./useSpeechRecognitionTranscription";

export const useSpeechRecognition = ({
  duration,
  language,
  handleTranscriptStart,
  onTranscriptEnd,
  onTranscriptChange,
  onError,
}: UseSpeechRecognitionProps) => {
  const { transcript, cleanUp, updateTranscript, finalTranscriptRef } =
    useSpeechRecognitionTranscription();
  const { startTimer, stopTimer, timeLeft, timeoutSignalKey } =
    useSpeechRecognitionTimeout();

  const [isRecording, setIsRecording] = useState(false);
  const instanceRef = useRef<SpeechRecognition | null>(null);

  // TODO: optimize useSpeechRecognitionTranscription to prevent emitting with same value
  useEffect(() => {
    onTranscriptChange?.(transcript);
  }, [transcript, onTranscriptChange]);

  const stopRecording = useCallback(
    (emitEvent = false) => {
      if (!instanceRef.current) {
        return;
      }

      if (emitEvent) {
        onTranscriptEnd(finalTranscriptRef.current);
      }

      stopTimer();
      setIsRecording(false);
      instanceRef.current.stop();
      instanceRef.current = null;
    },
    [
      stopTimer,
      setIsRecording,
      instanceRef,
      finalTranscriptRef,
      onTranscriptEnd,
    ]
  );

  const startRecording = useCallback(() => {
    if (!instanceRef.current) return;

    try {
      cleanUp();
      startTimer(duration);
      handleTranscriptStart();
      instanceRef.current.start();
      setIsRecording(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      onError?.("Failed to start recognition");
    }
  }, [
    instanceRef,
    cleanUp,
    startTimer,
    handleTranscriptStart,
    setIsRecording,
    duration,
    onError,
  ]);

  useEffect(() => {
    const instance = createSpeechRecognitionInstance(language);

    if (!instance) {
      onError?.("Speech recognition is not supported in this browser.");
      return;
    }

    if (instanceRef.current) {
      stopRecording();
      cleanUp();
    }

    instance.onresult = (event: SpeechRecognitionEvent) => {
      let combinedTranscript = "";

      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        combinedTranscript += result[0].transcript;

        if (result.isFinal) {
          isFinal = true;
        }
      }

      updateTranscript(combinedTranscript, isFinal);
    };

    instance.onerror = (event: SpeechRecognitionErrorEvent) => {
      stopRecording();
      onError?.(event.error);
    };

    instance.onend = () => {
      stopRecording(true);
    };

    instanceRef.current = instance;

    return () => {
      instance.stop();
    };
  }, [
    duration,
    language,
    onTranscriptChange,
    onTranscriptEnd,
    onError,
    cleanUp,
    updateTranscript,
    stopRecording,
  ]);

  useEffect(() => {
    if (timeoutSignalKey) {
      stopRecording();
    }
  }, [timeoutSignalKey, stopRecording]);

  return {
    isRecording,
    timeLeft,
    startRecording,
    stopRecording,
  };
};
