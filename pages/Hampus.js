import ButtonComponent from "@/components/ButtonComponent";
import { useEffect, useState } from "react";
import { model } from "@/util/ai";
import ModalComponent from "@/components/ModalComponent";
import { CgArrowDownO } from "react-icons/cg";
import { CgArrowUpO } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { IoReloadCircleOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";

export default function Hampus() {
  const [promt, setPromt] = useState("");
  const [answer, setAnswer] = useState([]);
  const [show, setShow] = useState(false);
  const [inputTitle, setInputTitle] = useState("Food Categories");
  const [showModal, setShowModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

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
    setInputTitle(title);
  }

  async function sendPromt() {
    setIsLoading(true);
    const result = await model.generateContent(promt);
    const data = JSON.parse(result.response.text());
    setAnswer(data);
    setShow(false);
    //Update history:
    const newHistory = [...history];
    newHistory.push(data.name);
    setHistory(newHistory);
    setIsLoading(false);
  }

  function addCategory(e) {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${e.target.value}. Measurment should be in l,dl,ml, teaspoon and tablespoon.Never generate the same meal twice in a row`
    );
  }
  function openModal() {
    if (!showModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history"));
    setHistory(data);
  }, []);

  useEffect(() => {
    if (history.length > 0)
      localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <div className="flex flex-col font-sans bg-white to-gray-950 px-20 py-40 gap-10">
      <div className="flex flex-col items-stretch text-center">
        <h1 className="text-xl font-bold text-center text-gray-400 pb-2">
          Recipes
        </h1>
        <h2 className="text-center font-title text-6xl text-gray-800 font-bold mb-40 drop-shadow-lg">
          What are you craving for?
        </h2>
        <div className="font-title">
          <input
            onChange={addCategory}
            type="text"
            className="bg-gray-100 w-2/5 h-20 p-5 rounded-l-lg text-gray-800 text-xl outline-none"
            placeholder={inputTitle}
          ></input>
          <button
            onClick={sendPromt}
            className="btn-lg rounded-r-lg font-title h-20 bg-gray-800 text-xl text-white border-none hover:bg-gray-900"
          >
            {isLoading ? "Loading..." : "Generate"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-20">
        <div className="flex justify-center gap-5">
          <ButtonComponent title="Comfort Food" func={applyPromt} />
          <ButtonComponent title="Healthy Options" func={applyPromt} />
          <ButtonComponent title="Sweet Treats" func={applyPromt} />
          <ButtonComponent title="Savory Snacks" func={applyPromt} />
        </div>

        {show && (
          <div className="flex flex-col gap-5">
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

      <div className="flex justify-center gap-5">
        {!show && (
          <button
            className="flex font-title text-sm justify-center items-center gap-2 border-2 border-gray-500 rounded-full p-5  text-gray-500 hover:text-gray-800"
            onClick={showMore}
          >
            <p>More Categories</p>
            <CgArrowDownO className="text-xl" />
          </button>
        )}

        {show && (
          <button
            className="flex font-title text-sm justify-center items-center gap-2 border-2 border-gray-500 rounded-full p-5 text-gray-500 hover:text-gray-800"
            onClick={showMore}
          >
            <p>Show Less</p>
            <CgArrowUpO className="text-xl" />
          </button>
        )}

        <button
          className="flex font-title text-sm justify-center items-center gap-2 border-2 border-gray-500 rounded-full p-5 text-gray-500 hover:text-gray-800"
          onClick={openModal}
        >
          <p>History</p>
          <FaHistory className="text-xl" />
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <ModalComponent showModal={openModal} history={history} />
        </div>
      )}

      {answer.name && (
        <div className="flex flex-col bg-white text-gray-900 rounded-lg box-border shadow-xl">
          <button
            onClick={() => {
              sendPromt();
            }}
            className="flex bg-gray-100 justify-center text-4xl p-5 hover:bg-purple-500 hover:text-white rounded-t-lg"
          >
            <IoReloadCircleOutline />
          </button>
          <div className="flex justify-between p-5 items-center">
            <h2 className="text-5xl font-title">{answer.name}</h2>
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
            <p className="text-xl px-5 py-10 bg-gray-100">
              {answer.description}
            </p>
            <h2 className="flex flex-col px-5 py-10 text-gray-900 text-3xl font-semibold">
              Ingredients:
            </h2>
          </div>

          <ul className="flex flex-col px-5 py-10 gap-1 bg-gray-100 text-2xl">
            {(() => {
              const items = [];
              for (let i = 0; i < answer.ingredients.length; i++) {
                items.push(<li key={i}>- {answer.ingredients[i]}</li>);
              }
              return items;
            })()}
          </ul>

          <h2 className="flex flex-col px-5 py-10 text-gray-900 text-3xl font-semibold">
            Instructions:
          </h2>

          <ul className="flex flex-col px-5 py-10 gap-1 bg-gray-100 rounded-b-lg text-2xl">
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
            className="flex bg-gray-200 justify-center text-4xl p-5 hover:bg-purple-500 hover:text-white rounded-b-lg"
          >
            <CgCloseO />
          </button>
        </div>
      )}
    </div>
  );
}
