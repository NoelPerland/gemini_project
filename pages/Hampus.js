import ButtonComponent from "@/components/ButtonComponent";
import { useState } from "react";
import { model } from "@/util/ai";
import { CgArrowDownO } from "react-icons/cg";
import { CgArrowUpO } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { IoReloadCircleOutline } from "react-icons/io5";

export default function Hampus() {
  const [promt, setPromt] = useState("");
  const [answer, setAnswer] = useState([]);
  const [show, setShow] = useState(false);

  function showMore() {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  function applyPromt(title) {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${title}. Measurment should be in l,dl,ml, teaspoon and tablespoon. Never generate the same meal twice in a row`
    );
  }

  async function sendPromt() {
    const result = await model.generateContent(promt);
    const data = JSON.parse(result.response.text());
    setAnswer(data);
    setShow(false);
  }

  function addCategory(e) {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${e.target.value}. Measurment should be in l,dl,ml, teaspoon and tablespoon.Never generate the same meal twice in a row`
    );
  }

  return (
    <div className="flex flex-col bg-gradient-to-b from-gray-600 via-gray-700 to-gray-950 px-20 py-40 gap-10">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-400 w-2/4 pb-2">
          Recipes
        </h1>
        <h2 className="text-center text-5xl text-white font-bold w-2/4 pb-20">
          What are you craving for?
        </h2>
        <div className="flex justify-center w-2/4">
          <input
            onChange={addCategory}
            type="text"
            className="bg-gray-100 h-20 p-5 w-96 rounded-l-lg text-gray-800 text-xl outline-none"
            placeholder="Food Categories"
          ></input>
          <button
            onClick={sendPromt}
            className="btn-lg rounded-r-lg h-20 bg-gray-800 text-xl text-white border-none hover:bg-gray-900"
          >
            Generate
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        {!show && (
          <button
            className="flex text-sm  opacity-50 justify-center items-center gap-2 border-2 border-gray-300 rounded-full p-2 text-gray-300 hover:text-white hover:white hover:opacity-100"
            onClick={showMore}
          >
            <p>More Categories</p>
            <CgArrowDownO className="text-xl" />
          </button>
        )}

        {show && (
          <button
            className="flex text-sm opacity-50 justify-center items-center gap-2 border-2 border-gray-300 rounded-full p-2 text-gray-300 hover:text-white hover:white hover:opacity-100"
            onClick={showMore}
          >
            <p>Show Less</p>
            <CgArrowUpO className="text-xl" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-center gap-5">
          <ButtonComponent title="Comfort Food" func={applyPromt} />
          <ButtonComponent title="Healthy Options" func={applyPromt} />
          <ButtonComponent title="Sweet Treats" func={applyPromt} />
          <ButtonComponent title="Savory Snacks" func={applyPromt} />
        </div>

        {show && (
          <div className="flex flex-col gap-5 ">
            <div className="flex justify-center gap-5">
              <ButtonComponent title="Fast Food" func={applyPromt} />
              <ButtonComponent
                title="International Cuisines"
                func={applyPromt}
              />
              <ButtonComponent title="Vegetarian" func={applyPromt} />
              <ButtonComponent title="Breakfast" func={applyPromt} />
            </div>
            <div className="flex justify-center gap-5">
              <ButtonComponent title="Seafood" func={applyPromt} />
              <ButtonComponent title="Light Bites" func={applyPromt} />
              <ButtonComponent title="Cheat Meals" func={applyPromt} />
              <ButtonComponent title="Late-Night Cravings" func={applyPromt} />
            </div>

            <div id="example" className="flex justify-center gap-5">
              <ButtonComponent title="Spicy Foods" func={applyPromt} />
              <ButtonComponent title="Grilled & BBQ" func={applyPromt} />
              <ButtonComponent title="Drinks & Smoothies" func={applyPromt} />
              <ButtonComponent title="Fine Dining" func={applyPromt} />
            </div>
          </div>
        )}
      </div>

      <hr />

      {answer.name && (
        <div className="flex flex-col bg-white text-gray-900 rounded-lg box-border">
          <button
            onClick={() => {
              sendPromt();
            }}
            className="flex bg-gray-200 justify-center text-4xl p-5 hover:bg-purple-500 hover:text-white rounded-t-lg"
          >
            <IoReloadCircleOutline />
          </button>
          <div className="flex justify-between p-5 items-center">
            <h2 className="text-4xl font-bold">{answer.name}</h2>
            <div className="flex flex-col p-5 items-end">
              <div className="rating justify-end pb-5">
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-purple-900"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-purple-900"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-purple-900"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-purple-900"
                />
                <input
                  type="radio"
                  name="rating-1"
                  className="mask mask-star bg-purple-900"
                />
              </div>
              <div className="flex flex-row gap-2">
                <p>{answer.portions} portions</p>
                <p>{answer.time}</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl p-5 bg-gray-100">{answer.description}</p>
            <h2 className="flex flex-col p-5 text-gray-900 text-xl font-semibold">
              Ingredients:
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
          <button
            onClick={() => {
              setAnswer([]);
            }}
            className="flex justify-center text-4xl p-5 hover:bg-purple-500 hover:text-white rounded-b-lg"
          >
            <CgCloseO />
          </button>
        </div>
      )}
    </div>
  );
}
