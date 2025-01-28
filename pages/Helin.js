import { useEffect, useState} from "react"
import { model, apiKey } from "@/util/ai"
import ButtonComponent from "@/components/ButtonComponent"


export default function moiveRec() {
    const [prompt, setPrompt] = useState("")
    const [answer, setAnswer] = useState("")

    async function sendPrompt() {
        const result = await model.generateContent(prompt)

        setAnswer(result.response.text());
    }

    //AI first interaction 
    async function sendOnPageLoad(introduction) {
        const result = await model.generateContent(introduction)
        setAnswer(result.response.text());
    }

    useEffect(() => {
          sendOnPageLoad("Introduce yourself briefly as a MovieMind, which should help the user find movie recommendations to watch");
        }, []);


        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-700 to-gray-900 p-4">
              <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="bg-purple-300 rounded-lg shadow-lg p-6 mb-6 mt-20">
                  <h2 className="text-3xl font-bold text-center text-black mb-2">MovieMind</h2>
                  <p className="text-center text-black font-bold">Find your next favorite movie with AI-powered suggestions</p>
                </div>
        
                {/* Main Content  */}
                <div className="bg-purple-300 rounded-lg shadow-lg p-6">

                  {/* Chat Display */}
                  <div className="min-h-[200px] max-h-[400px] overflow-y-auto mb-6 p-4 bg-gray-50 rounded-lg">
                    {answer ? (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 mt-8">
                        Loading initial response...
                      </div>
                    )}
                  </div>
        
                  {/* Input Area */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Ask for movie recommendations..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <button
                      onClick={sendPrompt}
                      className="px-6 py-2 bg-purple-950 text-white rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                    >
                        Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
)
}
 