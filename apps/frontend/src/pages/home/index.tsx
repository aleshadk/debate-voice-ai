import { Card } from "@/shared/ui/card/Card";
import { Page } from "@/shared/ui/page/Page";
import { LanguageSwitcher } from "@/widgets/language-switcher/ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Page>
      <h1 className="text-4xl text-center sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
        {t("debate.title")}
      </h1>
      <Card>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          {t("debate.description")}
        </p>
      </Card>
      <div className="flex justify-center">
        <div className="w-1/2 text-xl mt-6">
          <LanguageSwitcher onSelect={() => navigate("/topic")} />
        </div>
      </div>
    </Page>
  );
};
