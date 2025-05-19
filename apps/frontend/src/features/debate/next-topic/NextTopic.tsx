import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/card/Card";
import { useDebateContext } from "@/contexts/DebateContext";

export const NextTopic = () => {
  const { t } = useTranslation();
  const { topicSuggestions, setTopic } = useDebateContext();

  return (
    <Card>
      <h2 className="text-2xl font-medium text-indigo-600 mb-4">
        {t("debate.nextTopic")}
      </h2>
      <div className="space-y-2">
        {!topicSuggestions && (
          <p className="text-gray-600 text-lg">
            {t("debate.nextTopicPlaceholder")}
          </p>
        )}
        {topicSuggestions && (
          <div className="grid gap-2">
            {topicSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left p-3 rounded-lg bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 transition-colors duration-200 cursor-pointer"
                onClick={() => {
                  setTopic(suggestion);
                }}
              >
                <span className="text-gray-700">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
