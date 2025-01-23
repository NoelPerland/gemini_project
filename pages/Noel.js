import { useState } from "react";
import { model } from "@/util/ai";

export default function Noel() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendPrompt() {
    if (!prompt.trim()) return; // Prevent empty prompts
    setLoading(true);
    setAnswer("");

    try {
      const result = await model.generateContent(prompt);
      setAnswer(result.response.text()); // Update with AI response
    } catch (error) {
      console.error("Error generating response:", error);
      setAnswer("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-purple-500 text-white flex flex-col items-center py-10">
      <div className="max-w-3xl w-full bg-purple-800 rounded-lg shadow-xl py-8 px-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">
          Welcome to Gemini Chatbot
        </h1>
        <p className="text-sm italic text-purple-300 mb-6 text-center">
          *Almost as smart as ChatGPT
        </p>
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full p-3 border border-purple-500 rounded-md bg-purple-700 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            rows="4"
            placeholder="Type your question here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button
            className={`w-full py-3 rounded-md text-lg font-semibold transition-colors ${
              loading
                ? "bg-purple-600 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-400"
            }`}
            onClick={sendPrompt}
            disabled={loading}
          >
            {loading ? "Generating..." : "Send"}
          </button>
        </div>
        <div className="mt-6 bg-purple-700 p-5 rounded-md shadow-inner">
          <p className="whitespace-pre-wrap text-purple-200">
            {answer || "The response will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}
