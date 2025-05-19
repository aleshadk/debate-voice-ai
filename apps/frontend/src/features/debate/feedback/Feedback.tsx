import { useTranslation } from "react-i18next";
import { Card } from "@/shared/ui/card/Card";

export const Feedback = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-indigo-600">
        {t("debate.feedback")}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium text-indigo-600 mb-4">
            {t("debate.strengths")}
          </h3>
          <p className="text-gray-600 text-lg">
            {t("debate.strengthsPlaceholder")}
          </p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-medium text-indigo-600 mb-4">
            {t("debate.improvements")}
          </h3>
          <p className="text-gray-600 text-lg">
            {t("debate.improvementsPlaceholder")}
          </p>
        </Card>
      </div>
    </div>
  );
};
