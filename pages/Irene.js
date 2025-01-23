
import { model } from "@/util.ai";
import {useState} from react


export default function AItraveller() {
    const [prompt, setpromt] = useState("")
    const [answer,setAnswer] = useState("")



    async function sendPrompt() {
        const result = await model.generateContent(prompt);
        setAnswer(result.response.text())
    }



  return (
    <div>
      <h2>YOUR TRAVELL AI</h2>
      <input className="border border-gray-500" onChange="(e)=> setButton(e.target.value"></input>
      <button onClick={sendPrompt}>Send</button>
      <p>{answer}</p>
    </div>
  );
}