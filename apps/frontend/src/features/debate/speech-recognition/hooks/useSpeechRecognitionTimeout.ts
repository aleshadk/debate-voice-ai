import { useState, useEffect, useRef, useCallback } from "react";

export const useSpeechRecognitionTimeout = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeoutSignalKey, setTimeoutSignalKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
      setTimeLeft(0);
    }
  }, [timerRef]);

  const startTimer = useCallback(
    (duration: number) => {
      stopTimer();
      setTimeLeft(duration);
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimeoutSignalKey((key) => key + 1);
            stopTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [stopTimer]
  );

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  return {
    timeLeft,
    timeoutSignalKey,
    startTimer,
    stopTimer,
  };
};
