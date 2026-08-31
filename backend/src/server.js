const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const College = require("./models/College");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

// Gemini AI setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend is healthy",
  });
});

// AI RAG Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;

    // Check question
    if (!question) {
      return res.status(400).json({
        message: "Question is required",
      });
    }

    // Get all college documents from MongoDB
    const collegeData = await College.find();

    // Check if database is empty
    if (collegeData.length === 0) {
      return res.json({
        answer: "Sorry, no college information is available yet.",
      });
    }

    // Convert question into searchable words
    const questionWords = question
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 2);

    // Score each document
    const scoredDocuments = collegeData.map((college) => {
      const text =
        `${college.title} ${college.content}`.toLowerCase();

      let score = 0;

      questionWords.forEach((word) => {
        if (text.includes(word)) {
          score++;
        }
      });

      return {
        college,
        score,
      };
    });

    // Select top 3 relevant documents
    const relevantDocuments = scoredDocuments
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.college);

    // No relevant information found
    if (relevantDocuments.length === 0) {
      return res.json({
        answer: "I do not have this information in the college database.",
      });
    }

    // Create context using only relevant documents
    const context = relevantDocuments
      .map(
        (college) =>
          `Title: ${college.title}\nInformation: ${college.content}`
      )
      .join("\n\n");

    // Ask Gemini using relevant context
    const response = await ai.models.generateContent({
   model: "gemini-3.6-flash",
      contents: `
You are a helpful college information assistant.

Answer ONLY using the provided college information.

If the answer is not available in the provided information, say exactly:
"I do not have this information in the college database."

College Information:
${context}

Question:
${question}
      `,
    });

    // Send AI answer
    res.json({
      answer: response.text,
    });
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      message: "Error processing your question",
      error: error.message,
    });
  }
});

// Get all college documents
app.get("/api/colleges", async (req, res) => {
  try {
    const colleges = await College.find();

    res.status(200).json({
      colleges,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching colleges",
      error: error.message,
    });
  }
});

// Seed multiple college information
app.post("/api/seed-college", async (req, res) => {
  try {
    const colleges = [
      {
        title: "College Location",
        content:
          "Matsya P.G. College is located in Bansur, Alwar, Rajasthan.",
      },
      {
        title: "University Affiliation",
        content:
          "Matsya P.G. College is affiliated with Raj Rishi Bhartrihari Matsya University, Alwar.",
      },
      {
        title: "Courses",
        content:
          "Matsya P.G. College offers undergraduate courses.",
      },
      {
        title: "College Information",
        content:
          "Matsya P.G. College is an educational institution located in Bansur, Alwar, Rajasthan.",
      },
    ];

    const result = await College.insertMany(colleges);

    res.status(201).json({
      message: "College information added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding college information",
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
