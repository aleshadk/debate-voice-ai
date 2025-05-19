import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: {
        common: {
          checkBackend: string;
          response: string;
          language: string;
        };
        debate: {
          goToRecord: string;
          topic: string;
          process: string;
          enterTopic: string;
          recordResponse: string;
          stopRecording: string;
          recognizedSpeech: string;
          recognizedSpeechPlaceholder: string;
          feedback: string;
          strengths: string;
          strengthsPlaceholder: string;
          improvements: string;
          improvementsPlaceholder: string;
          nextTopic: string;
          nextTopicPlaceholder: string;
          remaining: string;
          startOver: string;
        };
      };
    };
  }
}
