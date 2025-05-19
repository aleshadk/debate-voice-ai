import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/card/Card";
import { useDebateContext } from "@/contexts/DebateContext";

export const NextTopic = () => {
  const { t } = useTranslation();
  const { topicSuggestions } = useDebateContext();

  return (
    <Card>
      <h2 className="text-2xl font-medium text-indigo-600 mb-4">
        {t("debate.nextTopic")}
      </h2>
      <p className="text-gray-600 text-lg">
        {!topicSuggestions && t("debate.nextTopicPlaceholder")}
        {topicSuggestions &&
          topicSuggestions.map((s, i) => <span key={i}>${s}</span>)}
      </p>
    </Card>
  );
};
