import { Card } from "@/shared/ui/card/Card";
import { useTranslation } from "react-i18next";
import { useDebateContext } from "@/contexts/DebateContext";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { SpeechRecognition } from "@/features/debate/speech-recognition/SpeechRecognition";
import { Page } from "@/shared/ui/page/Page";
import { Button } from "@/shared/ui/button/Button";
import { Loader } from "@/shared/ui/loader/Loader";

export const RecordPage = () => {
  const [finalTranscript, setFinalStranscript] = useState("");
  const { t } = useTranslation();
  const { topic, startDebate, hasResults, isLoading, reset } =
    useDebateContext();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (hasResults) {
      navigate("/results");
    }
  }, [hasResults]);

  const handleTranscriptStart = useCallback(() => {
    reset();
    setTranscript("");
    setFinalStranscript("");
  }, [reset, setTranscript, setFinalStranscript]);

  const handleTranscriptChange = useCallback(
    (value: string) => {
      setTranscript(value);
    },
    [setTranscript]
  );

  const handleTranscriptEnd = useCallback(
    (value: string) => {
      setFinalStranscript(value);
    },
    [setFinalStranscript]
  );

  const processRecord = () => {
    startDebate(finalTranscript);
  };

  return (
    <Page>
      {isLoading && <Loader></Loader>}
      <div className="max-w-3xl mx-auto space-y-12">
        <Card>
          <h2 className="text-xl font-medium text-indigo-600 mb-4">
            {t("debate.currentTopic")}
          </h2>
          <p className="text-gray-600 text-lg">{topic}</p>
        </Card>

        <SpeechRecognition
          handleTranscriptStart={handleTranscriptStart}
          handleTranscriptChange={handleTranscriptChange}
          handleTranscriptEnd={handleTranscriptEnd}
        />

        <div className="flex justify-center">
          <Button
            size="lg"
            variant="primary"
            disabled={finalTranscript === ""}
            onClick={processRecord}
            className="py-4 px-16"
          >
            {t("debate.process")}
          </Button>
        </div>

        <Card>
          <h2 className="text-xl font-medium text-indigo-600 mb-4">
            {t("debate.recognizedSpeech")}
          </h2>
          <p className="text-gray-600 text-lg">
            {transcript ? transcript : t("debate.recognizedSpeechPlaceholder")}
          </p>
        </Card>
      </div>
    </Page>
  );
};
