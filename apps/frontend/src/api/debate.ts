import { API_CONFIG } from "../config/api";

// TODO: move to packages
export interface AnalyzeDebateAnswerDTO {
  topic: string;
  userAnswer: string;
  language?: "en" | "ru" | "es";
}

export interface AnalyzeDebateAnswerResponseDTO {
  feedback: string;
  topicSuggestions: string[];
}

export const analyzeDebateAnswer =
  (): Promise<AnalyzeDebateAnswerResponseDTO> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          feedback:
            "Ваш ответ содержит интересные наблюдения о естественной склонности современных детей к технологиям, но имеет несколько проблем. Во-первых, вы используете сарказм и преувеличения ('рождаются с планшетом в руках', 'естественный отбор'), что ослабляет серьезность аргументации. Во-вторых, вы не рассматриваете потенциальные негативные последствия неограниченного использования гаджетов, такие как влияние на развитие мозга, социальные навыки или физическое здоровье. В-третьих, вы предлагаете крайнюю позицию (полное отсутствие ограничений) без рассмотрения возможных компромиссов. Сильный аргумент должен учитывать разные стороны проблемы и опираться на конкретные факты, а не только на эмоциональные утверждения.",
          topicSuggestions: [
            "Как вы считаете, какое влияние может оказать неограниченное использование гаджетов на развитие ключевых социальных навыков у детей?",
            "Можно ли найти баланс между полным запретом и полной свободой в использовании гаджетов? Как бы вы определили разумные границы?",
            "Какие конкретные преимущества для образования и развития детей вы видите в использовании современных технологий, которые перевешивают потенциальные риски?",
          ],
        });
      }, 1000);
    });
  };

export const analyzeDebateAnswer2 = async (
  data: AnalyzeDebateAnswerDTO
): Promise<AnalyzeDebateAnswerResponseDTO> => {
  const response = await fetch(
    `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ANALYZE_ANSWER}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to analyze debate answer");
  }

  return response.json();
};
