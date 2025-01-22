import { useEffect, useState } from "react";

export default function AIHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history"));

    setHistory(data);
  }, []);

  return (
    <div>
      <h2>AI History</h2>

      {history.map((item) => {
        return (
          <div>
            <p>prompt: {item.prompt}</p>
            <p>answer: {item.answer}</p>
          </div>
        );
      })}
    </div>
  );
}
