"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! Ask me anything about your college.",
    },
  ]);

  const handleSend = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question.trim();

    const userMessage = {
      role: "user",
      text: userQuestion,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: userQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Something went wrong"
        );
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "bot",
          text: data.answer,
        },
      ]);
    } catch (error) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "bot",
          text: "Sorry, I am unable to process your question right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex justify-center items-center p-5">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">
          College RAG Chatbot
        </h1>

        <p className="text-center text-gray-400 mb-6">
          Ask anything about your college
        </p>

        <div className="h-96 overflow-y-auto border border-zinc-700 rounded-lg p-4 mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  message.role === "user"
                    ? "bg-blue-600 p-3 rounded-lg max-w-xs"
                    : "bg-zinc-700 p-3 rounded-lg max-w-xs"
                }
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-700 p-3 rounded-lg">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            disabled={loading}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Ask your question..."
            className="flex-1 p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}
