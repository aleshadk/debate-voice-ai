import { Card } from "@/shared/ui/card/Card";
import { Button } from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import { useDebateContext } from "@/contexts/DebateContext";
import { Page } from "@/shared/ui/page/Page";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ResultsPage = () => {
  const { t } = useTranslation();
  const { feedback, topicSuggestions, setTopic, hasResults, reset } =
    useDebateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasResults) {
      reset();
      navigate("/topic");
    }
  }, []);

  const handleStartOver = () => {
    window.location.reload();
  };

  const handleTopicSelected = (topic: string) => {
    reset();
    setTopic(topic);
    navigate("/topic");
  };

  return (
    <Page>
      <div className="max-w-3xl mx-auto space-y-12">
        <Card>
          <h2 className="text-2xl font-medium text-indigo-600 mb-4">
            {t("debate.feedback")}
          </h2>
          <p className="text-gray-600 text-lg">{feedback}</p>
        </Card>

        <Card>
          <h2 className="text-2xl font-medium text-indigo-600 mb-4">
            {t("debate.nextTopic")}
          </h2>
          <div className="space-y-2">
            {topicSuggestions?.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 transition-colors duration-200 cursor-pointer"
                onClick={() => handleTopicSelected(suggestion)}
              >
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex justify-center">
          <Button
            onClick={handleStartOver}
            className="bg-red-500 hover:bg-red-600"
          >
            {t("debate.startOver")}
          </Button>
        </div>
      </div>
    </Page>
  );
};
