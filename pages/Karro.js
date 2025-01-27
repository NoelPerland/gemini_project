import { useState } from "react";
import { model } from "@/util/ai";

export default function FlashcardGame() {
  const [category, setCategory] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Psychology", "Programming", "History", "Ai"];

  async function generateFlashcards() {
    if (!category) return alert("Please select a category!");
    setLoading(true);
    setFlashcards([]);

    try {
      const result = await model.generateContent(
        `Generate 6 unika flashcards för kategorin "${category}". Varje kort ska ha en unik fråga på svenska, och svaret på frågan ska vara så kort men ge en bra förklaring. Formatet ska vara en JSON array och varje item ska ha en nyckel "question" och "answer" keys.`
      );

      const rawResponse = await result.response.text();

      let cards;
      try {
        // Ta bort markdown eller andra ogiltiga tecken
        const sanitizedResponse = rawResponse.replace(/```json|```/g, '').trim();
        
        // Försök att parsar svaret som JSON
        cards = JSON.parse(sanitizedResponse);
      } catch (error) {
        console.error("Invalid JSON response, fallback parsing:", error);
        cards = rawResponse
          .filter((line) => line.includes("**Question:**")) 
          .map((line) => {
            const questionMatch = line.match(/\*\*Question:\*\*\s*(.+)/);
            const answerMatch = line.match(/\*\*Answer:\*\*\s*(.+)/);

            return {
              question: questionMatch ? questionMatch[1] : "Unknown Question",
              answer: answerMatch ? answerMatch[1] : "Unknown Answer",
              userAnswer: "",
            };
          });
      }

      setFlashcards(cards);
    } catch (error) {
      console.error("Error generating flashcards:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleAnswerChange(index, event) {
    const updatedCards = [...flashcards];
    updatedCards[index].userAnswer = event.target.value;
    setFlashcards(updatedCards);
  }

  function highlightText(answer, userAnswer) {
    const answerWords = (answer || "").split(" ");
    const userAnswerWords = (userAnswer || "").split(" ");

    let correctCount = 0;

    // Jämför orden för att räkna hur många som är lika
    const highlightedAnswer = answerWords.map((word, index) => {
      const userWord = userAnswerWords[index];
      const isMatch = userWord && userWord.toLowerCase() === word.toLowerCase();
      if (isMatch) {
        correctCount++;
        return <span key={index} className="text-green-500">{word} </span>;
      } else {
        return <span key={index} className="text-red-500">{word} </span>;
      }
    });


    return { highlightedAnswer };
  }

  function checkAnswer(index) {
    const updatedCards = [...flashcards];
    const card = updatedCards[index];
    
    // Kontrollera om svaret är korrekt
    const userAnswer = card.userAnswer.trim().toLowerCase();
    const correctAnswer = card.answer.trim().toLowerCase();

    const { highlightedAnswer } = highlightText(correctAnswer, userAnswer);

    updatedCards[index].highlightedAnswer = highlightedAnswer; // Spara markerat svar

    setFlashcards(updatedCards);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-700 to-gray-900 text-white flex flex-col items-center py-16">
      <h1 className="text-3xl font-bold mb-4 text-center">Flashcard Game</h1>
      <p className="text-sm italic text-gray-300 mb-6 text-center">
        Learn and play with AI-generated flashcards!
      </p>
      <div className="flex gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`py-2 px-4 rounded-md text-sm font-medium ${
              category === cat
                ? "bg-purple-500 text-white"
                : "bg-gray-500 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <button
        className={`py-3 px-6 rounded-md text-lg font-semibold mb-8 ${
          loading
            ? "bg-purple-500 cursor-not-allowed"
            : "bg-purple-800 hover:bg-purple-900"
        }`}
        onClick={generateFlashcards}
        disabled={loading}
      >
        {loading ? "Generating Flashcards..." : "Generate Flashcards"}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {flashcards.map((card, index) => (
          <div
            key={index}
            className={`p-6 bg-gray-800 rounded-lg shadow-md cursor-pointer ${
              card.flipped ? "bg-blue-700" : "bg-gray-800"
            }`}
          >
            <h3 className="text-lg font-bold text-white text-center">
              {card.flipped ? card.answer : card.question}
            </h3>
            
            {/* Input fält för användarens svar */}
            {!card.flipped && (
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 rounded-md text-white"
                  value={card.userAnswer}
                  onChange={(e) => handleAnswerChange(index, e)}
                  onKeyDown={(e) => e.key === 'Enter' && checkAnswer(index)}
                  placeholder="Write your answer here..."
                />
                {card.isCorrect !== null && (
                  <div className="mt-2">
                    <p className={`text-sm ${card.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {card.isCorrect ? "Correct!" : ""}
                    </p>
                    <p className="text-sm text-gray-400">
                      {card.highlightedAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {flashcards.length === 0 && !loading && (
        <p className="text-gray-400 text-center mt-6">
          No flashcards yet. Select a category and click "Generate Flashcards".
        </p>
      )}
    </div>
  );
}
