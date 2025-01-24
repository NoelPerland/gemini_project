import ButtonComponent from "@/components/ButtonComponent";
import { useEffect, useState } from "react";
import { model } from "@/util/ai";

export default function Hampus() {
  const [searchCategory, setSearchCategory] = useState("");
  const [promt, setPromt] = useState("");
  const [answer, setAnswer] = useState([]);

  function applyPromt(title) {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${title}. Measurment should be in l,dl,ml, teaspoon and tablespoon.`
    );
  }

  async function sendPromt() {
    const result = await model.generateContent(promt);
    const data = JSON.parse(result.response.text());
    setAnswer(data);
    console.log(data);
  }

  function addCategory(e) {
    setSearchCategory(e.target.value);
  }

  function checkAndPrintCategory() {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${searchCategory}. Measurment should be in l,dl,ml, teaspoon and tablespoon.`
    );
    sendPromt();
  }

  return (
    <div className="flex flex-col py-20 gap-16 items-center justify-center bg-gradient-to-b from-gray-700 via-gray-700 to-gray-900 ">
      <div className="flex flex-col bg-gradient-to-b from-purple-400 via-purple-500 to-purple-800  p-10 rounded-lg gap-6 w-2/4 flex-wrap  shadow-lg shadow-gray-900">
        <div className="flex flex-col gap-6">
          <h1 className="text-6xl font-semibold text-center text-gray-900">
            Food Recommendations
          </h1>
          <p className="text-center text-2xl text-gray-800">
            What are you craving for?
          </p>
        </div>

        <hr />

        <div className="flex justify-between">
          <ButtonComponent title="Comfort Food" func={applyPromt} />
          <ButtonComponent title="Healthy Options" func={applyPromt} />
          <ButtonComponent title="Sweet Treats" func={applyPromt} />
          <ButtonComponent title="Savory Snacks" func={applyPromt} />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Fast Food" func={applyPromt} />
          <ButtonComponent title="International Cuisines" func={applyPromt} />
          <ButtonComponent title="Vegetarian" func={applyPromt} />
          <ButtonComponent title="Breakfast" func={applyPromt} />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Seafood" func={applyPromt} />
          <ButtonComponent title="Light Bites" func={applyPromt} />
          <ButtonComponent title="Cheat Meals" func={applyPromt} />
          <ButtonComponent title="Late-Night Cravings" func={applyPromt} />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Spicy Foods" func={applyPromt} />
          <ButtonComponent title="Grilled & BBQ" func={applyPromt} />
          <ButtonComponent title="Drinks & Smoothies" func={applyPromt} />
          <ButtonComponent title="Fine Dining" func={applyPromt} />
        </div>

        <hr />

        <div className="flex justify-between">
          <div className="flex gap-4">
            <input
              onChange={addCategory}
              type="text"
              className="bg-white px-4 rounded-lg text-gray-shadow-md shadow-gray-500"
              placeholder="Other Categories"
            ></input>
            <button
              onClick={checkAndPrintCategory}
              className="btn-lg rounded-xl bg-gray-800 text-lg text-white border-none shadow-md shadow-gray-900 hover:bg-gray-900"
            >
              Search
            </button>
          </div>
          <button
            onClick={sendPromt}
            className="btn-lg rounded-xl bg-gray-800 text-lg text-white border-none shadow-md shadow-gray-900 hover:bg-gray-900"
          >
            Generate
          </button>
        </div>
        <hr />
        {answer.name && (
          <div className="flex flex-col bg-white text-gray-900 rounded-lg">
            <div className="flex justify-between p-5 items-center">
              <h2 className="text-4xl font-bold">{answer.name}</h2>
              <div className="flex">
                <p className="p-5">{answer.portions} portions</p>
                <p className="p-5">{answer.time}</p>
              </div>
            </div>
            <div>
              <p className="text-xl p-5 bg-gray-100">{answer.description}</p>
              <h2 className="flex flex-col p-5 text-gray-900 text-xl font-semibold">
                ingredients:
              </h2>
            </div>

            <ul className="flex flex-col p-5 gap-1 bg-gray-100">
              {(() => {
                const items = [];
                for (let i = 0; i < answer.ingredients.length; i++) {
                  items.push(<li key={i}>- {answer.ingredients[i]}</li>);
                }
                return items;
              })()}
            </ul>

            <h2 className="flex flex-col p-5 text-gray-900 text-xl font-semibold">
              Instructions:
            </h2>

            <ul className="flex flex-col p-5 gap-1 bg-gray-100 rounded-b-lg">
              {(() => {
                const items = [];
                for (let i = 0; i < answer.steps.length; i++) {
                  items.push(
                    <li key={i}>
                      {i + 1} - {answer.steps[i]}
                    </li>
                  );
                }
                return items;
              })()}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
