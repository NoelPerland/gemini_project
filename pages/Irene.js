import { model } from "@/util/ai";
import { useState } from "react";

export default function Irene() {
  const [answer, setAnswer] = useState(""); // Change initial state to a string
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 m-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-[600px] h-[400px] m-20">
        <h2 className="text-2xl text-slate-600 font-bold text-center mb-6">
          Best Cultural Tips
        </h2>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select a city</option>
          <option value="Stockholm">Stockholm </option>
          <option value="Göteborg">Göteborg </option>
          <option value="Malmö">Malmö </option>
          <option value="Lund">Lund </option>
        </select>

        {city && (
          <div className="flex flex-col space-y-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              onClick={() => sendPrompt(city, "Daytime")}
            >
              Daytime Events
            </button>
            <button
              className="bg-slate-600 text-white px-4 py-2 rounded-lg shadow hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer"
              onClick={() => sendPrompt(city, "Nightime")}
            >
              Nightime Events
            </button>
            <button
              className="bg-white text-slate-800 px-4 py-2 rounded-lg shadow hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-600 cursor-pointer"
              onClick={() => sendPrompt(city, "Kids")}
            >
              Kids Activities
            </button>
          </div>
        )}

        {answer.length > 0 && ( // Corrected typo
          <pre className="bg-gray-100 p-4 mt-6 text-black border border-gray-300 rounded-lg overflow-auto">
            {answer}
          </pre>
        )}

        <div className="bg-gray-800 p-2 rounded-md">
          <button onClick={generateAnswer} className="text-white">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
