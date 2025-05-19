import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/card/Card";

export const NextTopic = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <h2 className="text-2xl font-medium text-indigo-600 mb-4">
        {t("debate.nextTopic")}
      </h2>
      <p className="text-gray-600 text-lg">
        {t("debate.nextTopicPlaceholder")}
      </p>
    </Card>
  );
};
