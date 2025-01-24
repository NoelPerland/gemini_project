import { model } from "@/util/ai";
import { useState } from "react";

export default function Irene() {
  const [answer, setAnswer] = useState(""); /*  */
  const [city, setCity] = useState("Stockholm");
  const [prompt, setPrompt] = useState("");
  function sendPrompt(category) {
    setPrompt(
      `Recomend me cultural places for ${city} in the category: ${category}. Provide a description of each place, and include the following data for each: what is the main interest of the place, price for entrance, and timetable `
    );
  }

  async function sendPrompt() {
    const result = await model.generateContent(prompt);
    const data = JSON.parse(result.response.text());
    setAnswer(data);
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl text-slate-600 font-bold text-center mb-6">
          Best Cultural Places
        </h2>
        <select
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select a city</option>
          <option value="Stockholm">Stockholm</option>
          <option value="Göteborg">Göteborg</option>
          <option value="Malmö">Malmö</option>
          <option value="Lund">Lund</option>
        </select>

        {city && (
          <div className="flex flex-col space-y-4">
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              onClick={() => sendPrompt("Daytime")}
            >
              Daytime Events
            </button>
            <button
              className="bg-slate-600 text-white px-4 py-2 rounded-lg shadow hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300
               cursor-pointer"
              onClick={() => sendPrompt("Nighttime")}
            >
              Nighttime Events
            </button>
            <button
              className="bg-white text-slate-800 px-4 py-2 rounded-lg shadow hover:bg-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-600 cursor-pointer"
              onClick={() => sendPrompt("Kids")}
            >
              Kids Activities
            </button>
          </div>
        )}

        {answer && (
          <pre className="bg-gray-100 p-4 mt-6 text-black border border-gray-300 rounded-lg overflow-auto">
            {answer.first}
          </pre>
        )}
        <button onClick={sendPrompt} className="text-black">
          generate
        </button>
      </div>
    </div>
  );
}
