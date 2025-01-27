import ButtonComponent from "@/components/ButtonComponent";
import { useEffect, useState } from "react";
import { model } from "@/util/ai";
import { CgArrowDownO } from "react-icons/cg";
import { CgArrowUpO } from "react-icons/cg";

export default function Hampus() {
  const [searchCategory, setSearchCategory] = useState("");
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
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${e.target.value}. Measurment should be in l,dl,ml, teaspoon and tablespoon.`
    );
  }

  return (
    <div className="flex flex-col py-20 gap-16 items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 ">
      <div className="flex box-border w-3/6 items-center justify-center bg-gradient-to-b from-purple-500  rounded-lg to-purple-900 p-10 shadow-lg shadow-gray-900">
        <div className="flex flex-col bg-purple-400 p-10 rounded-lg gap-5 ">
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl font-bold text-center text-gray-900">
              Recipes
            </h1>
            <hr />
            <p className="text-center text-2xl text-gray-800 font-bold">
              What are you craving for?
            </p>
          </div>

          <div className="flex justify-between">
            <ButtonComponent title="Comfort Food" func={applyPromt} />
            <ButtonComponent title="Healthy Options" func={applyPromt} />
            <ButtonComponent title="Sweet Treats" func={applyPromt} />
            <ButtonComponent title="Savory Snacks" func={applyPromt} />
          </div>
          {show && (
            <div className="flex flex-col gap-5 ">
              <div className="flex justify-between">
                <ButtonComponent title="Fast Food" func={applyPromt} />
                <ButtonComponent
                  title="International Cuisines"
                  func={applyPromt}
                />
                <ButtonComponent title="Vegetarian" func={applyPromt} />
                <ButtonComponent title="Breakfast" func={applyPromt} />
              </div>
              <div className="flex justify-between">
                <ButtonComponent title="Seafood" func={applyPromt} />
                <ButtonComponent title="Light Bites" func={applyPromt} />
                <ButtonComponent title="Cheat Meals" func={applyPromt} />
                <ButtonComponent
                  title="Late-Night Cravings"
                  func={applyPromt}
                />
              </div>

              <div id="example" className="flex justify-between">
                <ButtonComponent title="Spicy Foods" func={applyPromt} />
                <ButtonComponent title="Grilled & BBQ" func={applyPromt} />
                <ButtonComponent title="Drinks & Smoothies" func={applyPromt} />
                <ButtonComponent title="Fine Dining" func={applyPromt} />
              </div>
            </div>
          )}
          <div className="flex justify-center">
            {!show && (
              <button className="flex justify-center" onClick={showMore}>
                <CgArrowDownO className="text-4xl " />
              </button>
            )}

            {show && (
              <button className="flex justify-center " onClick={showMore}>
                <CgArrowUpO className="text-4xl" />
              </button>
            )}
          </div>
          <hr />
          <div className="flex justify-between ">
            <div className="flex gap-4">
              <input
                onChange={addCategory}
                type="text"
                className="bg-white  px-4 rounded-lg text-gray-900 shadow-md shadow-gray-700"
                placeholder="Other Categories"
              ></input>
            </div>
            <button
              onClick={sendPromt}
              className="btn-lg rounded-xl bg-gray-800 text-lg text-white border-none shadow-md shadow-gray-700 hover:bg-gray-900"
            >
              Generate
            </button>
          </div>

          {answer.name && (
            <div className="flex flex-col bg-white text-gray-900 rounded-lg box-border">
              <div className="flex justify-between p-5 items-center">
                <h2 className="text-4xl font-bold">{answer.name}</h2>
                <div className="flex flex-col p-5">
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
    </div>
  );
}
