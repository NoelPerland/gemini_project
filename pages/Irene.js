import { model } from "@/util/ai";
import { useState } from "react";

export default function Irene() {
  const [answer, setAnswer] = useState("");
  const [city, setCity] = useState("Stockholm");
  const [prompt, setPrompt] = useState("");

  function sendPrompt(city, category) {
    setPrompt(
      `Provide a valid JSON output without backticks, extra tokens, or marks at the start or end. Generate exactly one object, with one key-value pair. The key must describe the object's position  as a string. The value should be an object containing a recommendation for a cultural place in ${city} under the category "${category}". Include the following fields: 
- "description": A brief description of the place.
- "mainInterest": The primary attraction or theme of the place.
- "price": Entry fee (if any).
- "timetable": Operating hours.`
    );
  }

  async function generateAnswer() {
    if (!prompt) {
      console.error("Prompt is empty. Please select a category first.");
      return;
    }
    try {
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      const data = JSON.parse(responseText);
      const formattedAnswer = Object.entries(data)
        .map(
          ([key, value]) =>
            `Recommendation (${key}):
  - Description: ${value.description}
  - Main Interest: ${value.mainInterest}
  - Price: ${value.price}
  - Timetable: ${value.timetable}`
        )
        .join("\n\n");
      setAnswer(formattedAnswer);
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("An error occurred. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 via-gray-700 to-gray-950">
      <div className="bg-gradient-to-b from-purple-500 via-purple-700 to-purple-900  text-white flex flex-col items-center mx-40 rounded-lg">
        <div className="bg-purple-400 shadow-md rounded-lg p-8 w-[600px] h-[400px] m-20">
          <h2 className="text-3xl text-whi font-bold text-center mb-6">
            Best Cultural Tips For You
          </h2>
          <select
            className="text-slate-800 w-full border border-gray-800 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-slate-400 mr-2 bg-purple-300"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select a city</option>
            <option value="Stockholm">Stockholm </option>
            <option value="Göteborg">Göteborg </option>
            <option value="Malmö">Malmö </option>
            <option value="Lund">Lund </option>
          </select>

          {city && (
            <div className="flex flex-col space-y-4 justify-center">
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
                onClick={() => sendPrompt(city, "Daytime")}
              >
                Daytime Events
              </button>
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
                onClick={() => sendPrompt(city, "Nightime")}
              >
                Nightime Events
              </button>
              <button
                className="bg-slate-200 text-slate-800 px-4 py-2 rounded-xl shadow hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-600 cursor-pointer"
                onClick={() => sendPrompt(city, "Kids")}
              >
                Kids Activities
              </button>
            </div>
          )}

          {answer.length > 0 && (
            <pre className="bg-gray-100 p-4 mt-6 text-black border border-gray-300 rounded-lg overflow-auto">
              {answer}
            </pre>
          )}
          <div className="flex items-center justify-center">
            <button
              onClick={generateAnswer}
              className="btn-lg rounded-xl bg-white text-lg text-gray-900 hover:text-white hover:bg-gray-900 border-none shadow-md shadow-gray-500 w-1/5 mt-4 flex items-center justify-center"
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
