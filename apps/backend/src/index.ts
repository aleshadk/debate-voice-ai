import "dotenv/config";
import express from "express";
import cors from "cors";
import { AnalyzeDebateAnswerSchema } from "./schemas/analyze-debate-answer.schema";
import { analyzeDebatesViaClaude } from "./services/analyze-debates-via-claude";

const app = express();
const port = process.env.PORT || 3000;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json());

app.post("/api/analyze-answer", async (req, res) => {
  const params = AnalyzeDebateAnswerSchema.safeParse(req.body);

  if (!params.success) {
    res.status(400).json({
      error: "Invalid request body",
      details: params.error.flatten(),
    });

    return;
  }

  const result = await analyzeDebatesViaClaude({
    language: "ru",
    topic: "Стоит ли ограничивать детей в использовании гаджетов",
    userAnswer:
      "Нет, ограничивать детей в использовании гаджетов не нужно. Современные дети буквально рождаются с планшетом в руках — зачем мешать естественному отбору? Даже младенцы интуитивно свайпают экраны, а школьники могут обойти родительский контроль быстрее, чем ты найдёшь кнопку включения. Гаджеты — это их язык, их среда, их сила. Вместо того чтобы забирать устройства, лучше смириться: они всё равно научатся, просто без тебя.",
  });

  res.send(result);
});

app.get("/", async (req, res) => {
  res.send(
    `I'm ok. Anthropic API_KEY exists: ${ANTHROPIC_API_KEY !== undefined}`
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
