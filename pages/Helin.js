import { useEffect, useState} from "react"
import { model, apiKey } from "@/util/ai"
import ButtonComponent from "@/components/ButtonComponent"


export default function moiveRec() {
    const [prompt, setPromt] = useState("")
    const [answer, setAnswer] = useState("")

    async function sendPromt() {
        const result = await model.generateContent(prompt)

        setAnswer(result.response.text());
    }

    //AI first interaction 
    async function sendOnPageLoad(introduction) {
        const result = await model.generateContent(introduction)
        setAnswer(result.response.text());
    }

    useEffect(() => {
          sendOnPageLoad("Introduce yourself briefly as a movie recommendation, which should help the user find movie recommendations to watch");
        }, []);



    return (
    <div>
        <h2>Movie Recommendations</h2>
        
        <input className="border border-gray-400" type="text" 
        onChange={(e) => setPromt(e.target.value) } />  

        <button onClick={sendPromt}>Send</button>

        <p>{answer}</p>
        
    </div>
)
}
 