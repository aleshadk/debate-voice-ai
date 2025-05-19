import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      common: {
        checkBackend: string;
        response: string;
        language: string;
      };
      debate: {
        title: string;
        enterTopic: string;
        description: string;
        recordResponse: string;
        stopRecording: string;
        timeRemaining: string;
        feedback: {
          title: string;
          strengths: string;
          improvements: string;
        };
        recognizedSpeech: string;
        recognizedSpeechPlaceholder: string;
        strengths: string;
        strengthsPlaceholder: string;
        improvements: string;
        improvementsPlaceholder: string;
        nextTopic: string;
        nextTopicPlaceholder: string;
      };
    };
  }
}
