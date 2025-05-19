import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button/Button";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      onClick={toggleLanguage}
      className="text-3xl"
      aria-label="Switch language"
    >
      {i18n.language === "en" ? "🇷🇺" : "🇬🇧"}
    </Button>
  );
};
