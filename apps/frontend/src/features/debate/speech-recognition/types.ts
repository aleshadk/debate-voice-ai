export interface UseSpeechRecognitionProps {
  language: string;
  duration: number;
  handleTranscriptStart: () => void;
  onTranscriptEnd: (transcript: string) => void;
  onTranscriptChange?: (transcript: string) => void;
  onError?: (error: string) => void;
}
