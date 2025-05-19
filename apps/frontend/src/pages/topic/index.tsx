import { Card } from "@/shared/ui/card/Card";
import { Button } from "@/shared/ui/button/Button";
import { useTranslation } from "react-i18next";
import { useDebateContext } from "@/contexts/DebateContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Page } from "@/shared/ui/page/Page";
import { Textarea } from "@/shared/ui/textarea/Textarea";
import { useCurrentLanguage } from "@/hooks/useCurrentLanguage";
import {
  DEFAULT_TOPIC_EN,
  DEFAULT_TOPIC_RU,
} from "@/shared/const/debate-topic";

export const TopicPage = () => {
  const language = useCurrentLanguage();
  const { setTopic, topic } = useDebateContext();
  const navigate = useNavigate();
  const [topicInput, setTopicInput] = useState(topic);
  const { t } = useTranslation();

  useEffect(() => {
    if (!topicInput) {
      setTopicInput(language === "ru" ? DEFAULT_TOPIC_RU : DEFAULT_TOPIC_EN);
    }
  }, []);

  const handleStart = () => {
    setTopic(topicInput);
    navigate("/record");
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopicInput(e.target.value);
  };

  return (
    <Page>
      <div className="max-w-3xl mx-auto space-y-12">
        <Card>
          <div className="space-y-3">
            <label
              htmlFor="topic"
              className="block text-lg font-medium text-indigo-600"
            >
              {t("debate.enterTopic")}
            </label>
            <Textarea
              id="topic"
              placeholder={t("debate.enterTopic")}
              value={topicInput}
              onChange={handleTopicChange}
            />
            <Button
              onClick={handleStart}
              disabled={!topicInput.trim()}
              className="w-full"
            >
              {t("debate.start")}
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  );
};
