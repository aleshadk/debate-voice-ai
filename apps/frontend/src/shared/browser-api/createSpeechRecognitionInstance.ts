export function createSpeechRecognitionInstance(
  language: string
): SpeechRecognition | null {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    return null;
  }

  const instance = window.webkitSpeechRecognition
    ? new window.webkitSpeechRecognition()
    : new window.SpeechRecognition();

  instance.continuous = true;
  instance.interimResults = true;
  instance.lang = language;

  return instance;
}
