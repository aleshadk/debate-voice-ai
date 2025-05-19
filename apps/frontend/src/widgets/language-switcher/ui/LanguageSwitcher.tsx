import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/button/Button";

export const LanguageSwitcher = (props: { onSelect: () => void }) => {
  const { i18n } = useTranslation();

  const setLanguage = (lng: "en" | "ru") => {
    i18n.changeLanguage(lng);
    props.onSelect();
  };

  return (
    <div className="flex gap-4 w-full justify-center">
      <Button
        size="xl3"
        variant="default"
        onClick={() => setLanguage("en")}
        className="py-4 px-12"
      >
        🇬🇧
      </Button>
      <Button
        size="xl3"
        variant="default"
        onClick={() => setLanguage("ru")}
        className="py-4 px-12"
      >
        🇷🇺
      </Button>
    </div>
  );
};
