import { AnalyzeDebateAnswerDTO } from "../schemas/analyze-debate-answer.schema";

function createPromt(data: AnalyzeDebateAnswerDTO): string {
  return `
    You are an AI debate coach helping users improve their arguments.

    Given a topic and the user's answer, return:
    1. Constructive feedback
    2. Three follow-up questions to deepen or challenge the answer

    ❗️Respond in JSON. Do not use markdown. No triple backticks. Like this:
    {
      "feedback": "...",
      "topicSuggestions": ["...", "...", "..."]
    }

    Topic: ${data.topic}
    User's answer: ${data.userAnswer}
    Respond in ${data.language}
    `.trim();
}

function extractJsonFromClaudeText(text: string): any {
  const cleaned = text
    .replace(/^\s*```json/, "")
    .replace(/^\s*```/, "")
    .replace(/\s*```$/, "")
    .trim();

  return JSON.parse(cleaned);
}

export async function analyzeDebatesViaClaude(data: AnalyzeDebateAnswerDTO) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 1000,
      temperature: 0.7,
      messages: [{ role: "user", content: createPromt(data) }],
    }),
  });

  const json = await res.json();

  try {
    const parsed = extractJsonFromClaudeText(json.content?.[0]?.text);

    if (typeof parsed.feedback !== "string") {
      throw new Error("Incorrect LLM response in field 'feedback'");
    }

    if (
      !Array.isArray(parsed.topicSuggestions) ||
      parsed.topicSuggestions.some((q: unknown) => typeof q !== "string")
    ) {
      throw new Error("Incorrect LLM response in field 'topicSuggestions'");
    }

    return parsed;
  } catch (e) {
    console.error("Error parsed LLM response");
    throw new Error("Failed to parse Claude's response");
  }
}
