import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/card/Card";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { LanguageSwitcher } from "@/features/debate/language-switcher/LanguageSwitcher";
import { SpeechRecognition } from "@/features/debate/speech-recognition/SpeechRecognition";
import { Feedback } from "@/features/debate/feedback/Feedback";
import { NextTopic } from "@/features/debate/next-topic/NextTopic";
import { useCallback, useState } from 'react';

export const DebateWidget = () => {
  const { t } = useTranslation();
  const [transcript, setTranscript] = useState("");

  const handleTranscriptChange = useCallback((value: string) => {
    setTranscript(value);
  }, [setTranscript]);

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {/* Header with language switcher */}
      <div className="flex justify-between items-center">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          {t("debate.title")}
        </h1>
        <LanguageSwitcher />
      </div>

      {/* Project description */}
      <Card>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          {t("debate.description")}
        </p>
      </Card>

      {/* Topic input */}
      <Card>
        <div className="space-y-3">
          <label
            htmlFor="topic"
            className="block text-lg font-medium text-indigo-600"
          >
            {t("debate.enterTopic")}
          </label>
          <Textarea id="topic" placeholder={t("debate.enterTopic")} />
        </div>
      </Card>

      {/* Voice recording button */}
      <SpeechRecognition handleTranscriptChange={handleTranscriptChange} />

      {/* Recognized speech */}
      <Card>
        <h2 className="text-xl font-medium text-indigo-600 mb-4">
          {t("debate.recognizedSpeech")}
        </h2>
        <p className="text-gray-600 text-lg">
          {transcript ? transcript :t("debate.recognizedSpeechPlaceholder")}
        </p>
      </Card>

      {/* Feedback section */}
      <Feedback />

      {/* Next debate topic */}
      <NextTopic />
    </div>
  );
};
