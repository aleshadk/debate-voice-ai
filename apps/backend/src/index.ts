import "dotenv/config";
import express from "express";
import cors from "cors";
import { AnalyzeDebateAnswerSchema } from "./schemas/analyze-debate-answer.schema";
import { analyzeDebatesViaClaude } from "./services/analyze-debates-via-claude";

const app = express();
const port = process.env.PORT || 3000;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(
  cors({
    origin: "https://aleshadk.github.io",
  })
);
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

  const result = await analyzeDebatesViaClaude(params.data);
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
