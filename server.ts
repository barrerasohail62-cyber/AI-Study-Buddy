import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper function to get GoogleGenAI client lazily
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured in Settings > Secrets.");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Route: AI Study Assistant Chat / Explain / Summarize
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, history, mode, subject } = req.body;
      const ai = getGenAI();

      let systemInstruction = `You are AI Study Buddy, an intelligent, empathetic, and encouraging AI study tutor built specifically for students.
Your core principles:
- Explain complex concepts using clear, intuitive, and simple language with relatable real-world analogies.
- Encourage critical thinking and true comprehension rather than giving away bare answers.
- Structure responses clearly with bold key terms, bullet points, and clean section breaks.
- Include a friendly follow-up question or active-recall prompt at the very end to test the student's understanding.
- Keep tone supportive, educational, clear, and inspiring.`;

      if (mode === "explain") {
        systemInstruction += `\nSpecial task: Break down the topic using an 'ELI5' (Explain Like I'm 5) section, a concrete real-world example, and a 1-question quick comprehension check.`;
      } else if (mode === "summary") {
        systemInstruction += `\nSpecial task: Summarize the provided text/notes into: 1) Executive Summary (2 sentences), 2) Bulleted Key Takeaways, 3) 3 High-Yield Self-Testing Questions.`;
      } else if (mode === "revision-tips") {
        systemInstruction += `\nSpecial task: Provide 4 actionable, science-backed active recall techniques, study intervals, and mnemonic tricks for mastering this material.`;
      }

      if (subject) {
        systemInstruction += `\nTarget Academic Subject: ${subject}`;
      }

      let prompt = message;
      if (history && Array.isArray(history) && history.length > 0) {
        const conversationText = history
          .map((h: any) => `${h.sender === "user" ? "Student" : "AI Study Buddy"}: ${h.text}`)
          .join("\n");
        prompt = `Recent Conversation Context:\n${conversationText}\n\nStudent: ${message}`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text || "I'm sorry, I couldn't generate a response. Please try asking again!" });
    } catch (error: any) {
      console.error("AI Chat Error:", error);
      res.status(500).json({ error: error.message || "Failed to process AI request" });
    }
  });

  // API Route: Quiz Generator
  app.post("/api/ai/quiz", async (req, res) => {
    try {
      const { topic, difficulty = "Medium", count = 5 } = req.body;
      const ai = getGenAI();

      const numQuestions = Math.min(Math.max(Number(count) || 5, 1), 15);

      const prompt = `Generate a ${numQuestions}-question multiple choice study quiz on the topic: "${topic}".
Difficulty level: ${difficulty}.
Ensure questions test actual comprehension and core concepts.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              topic: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    correctAnswer: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                  required: ["question", "options", "correctAnswer", "explanation"],
                },
              },
            },
            required: ["questions"],
          },
        },
      });

      let quizData = { title: `${topic} Practice Quiz`, topic, questions: [] };
      if (response.text) {
        try {
          quizData = JSON.parse(response.text);
        } catch (e) {
          console.error("Failed to parse quiz JSON:", e);
        }
      }

      res.json(quizData);
    } catch (error: any) {
      console.error("AI Quiz Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate quiz" });
    }
  });

  // API Route: Flashcards Generator
  app.post("/api/ai/flashcards", async (req, res) => {
    try {
      const { topic, text, count = 6 } = req.body;
      const ai = getGenAI();

      const numCards = Math.min(Math.max(Number(count) || 6, 3), 12);
      const inputContent = text ? `Study Notes:\n${text}` : `Topic: ${topic}`;

      const prompt = `Create ${numCards} active-recall flashcards for studying:\n${inputContent}\nEach flashcard must feature a clear question or core term on the front, and a concise, memory-friendly answer on the back. Add a subject tag.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                front: { type: Type.STRING },
                back: { type: Type.STRING },
                tag: { type: Type.STRING },
              },
              required: ["front", "back"],
            },
          },
        },
      });

      let flashcards = [];
      if (response.text) {
        try {
          flashcards = JSON.parse(response.text);
        } catch (e) {
          console.error("Failed to parse flashcards JSON:", e);
        }
      }

      res.json({ flashcards });
    } catch (error: any) {
      console.error("AI Flashcard Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate flashcards" });
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Study Buddy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
