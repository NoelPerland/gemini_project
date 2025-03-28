import { useEffect, useState } from "react";
import { model } from "@/util/ai";

//Components
import ButtonComponent from "@/components/ButtonComponent";
import ModalComponent from "@/components/ModalComponent";

//Icons:
import { CgArrowDownO } from "react-icons/cg";
import { CgArrowUpO } from "react-icons/cg";
import { CgCloseO } from "react-icons/cg";
import { IoReloadCircleOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";

export default function Hampus() {
  //states
  const [promt, setPromt] = useState("");
  const [inputTitle, setInputTitle] = useState("Category or Meal");
  const [favoritePopup, setFavoritePopup] = useState("hidden");

  //states []
  const [answer, setAnswer] = useState([]);
  const [history, setHistory] = useState([""]);
  const [answerHistory, setAnswerHistory] = useState([""]);
  const [favorites, setFavorites] = useState([]);

  //state Booleans
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    console.log("favorites array", favorites);
  }, [favorites]);

  //Toggle show state
  function showMore() {
    if (!show) {
      setShow(true);
    } else {
      setShow(false);
    }
  }

  //apply promt when clicking with selected category
  function applyPromt(title) {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${title}. Measurment should be in l,dl,ml, teaspoon and tablespoon. Never generate the same meal twice in a row`
    );
    //apply selected category to placeholder (input text-field)
    setInputTitle(title);
  }

  //Get api data
  async function sendPromt() {
    if (inputTitle !== "Category or Meal") {
      //apply loader to generate button
      setIsLoading(true);

      //get data
      const result = await model.generateContent(promt);
      const data = JSON.parse(result.response.text());
      setAnswer(data);

      //Hide extended categories
      setShow(false);

      //Update history:
      if (history.length > 0) {
        const newHistory = [...history];
        newHistory.push(data.name);
        setHistory(newHistory);

        const newAnswerHistory = [...answerHistory];
        newAnswerHistory.push(data);
        setAnswerHistory(newAnswerHistory);
      } else {
        const newHistory = [];
        newHistory.push(data.name);
        setHistory(newHistory);

        const newAnswerHistory = [];
        newAnswerHistory.push(data);
        setAnswerHistory(newAnswerHistory);
      }

      //remove loader from generate button
      setIsLoading(false);
      //Hide history modal if open
      setShowModal(false);
      //Show recipe
      setShowRecipe(true);
    } else {
      alert("Select or type category or meal first!");
    }
  }

  //set food category through text input
  function addCategory(e) {
    setPromt(
      `Provide a valid json output without backticks at the start and end (very important). Provide the following data - name, desciptsion, time, ingredients(array), steps(array) and portions (No other external objects,arrays or keys can be provided!) Give me one meal within the category ${e.target.value}. Measurment should be in l,dl,ml, teaspoon and tablespoon.Never generate the same meal twice in a row`
    );
    setInputTitle(e.target.value);
  }

  //apply selected history recipe to be recovered and displayed
  function recoverHistory(index) {
    //hide history modal
    setShowModal(false);
    //apply loader to generate button
    setIsLoading(true);
    //get history data
    setAnswer(answerHistory[index]);
    //remove loader from generate button
    setIsLoading(false);
    //show recipe
    setShowRecipe(true);
  }

  function recoverFavorite(index) {
    //hide favorite modal
    setShowFavorites(false);
    //apply loader to generate button
    setIsLoading(true);
    setAnswer(favorites[index]);
    //remove loader from generate button
    setIsLoading(false);
    //show recipe
    setShowRecipe(true);
  }

  //open history modal
  function openModal() {
    if (!showModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }

  function closeFavorite() {
    if (!showFavorites) {
      setShowFavorites(true);
    } else {
      setShowFavorites(false);
    }
  }

  //get localstarage on page load
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(data);

    const data2 = JSON.parse(localStorage.getItem("answerHistory")) || [];
    setAnswerHistory(data2);

    const data3 = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(data3);
  }, []);

  //update local storange
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("history", JSON.stringify(history));
      localStorage.setItem("answerHistory", JSON.stringify(answerHistory));
    }
  }, [history]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  //Update Favorites

  function updateFavorites() {
    setFavoritePopup("fixed");
    if (!favorites.includes(answer)) {
      const newArray = [...favorites, answer];
      setFavorites(newArray);
      setIsFavorite(true);
    } else {
      const newArray = favorites.map((favorite) => favorite !== answer);
      setFavorites(newArray);
      setIsFavorite(false);
    }
    setTimeout(() => {
      setFavoritePopup("hidden");
    }, 2000);
  }

  return (
    <>
      <div className="flex justify-end bg-white pr-5 pt-5">
        <MdFavoriteBorder
          className="text-gray-800 text-5xl"
          onClick={() => setShowFavorites(!showFavorites)}
        />
      </div>

      {showFavorites && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <ModalComponent
            showModal={closeFavorite}
            array={favorites}
            recover={recoverFavorite}
            title="Favorites"
            fallback="Add favorites to display them here!"
            modalType="favorites"
          />
        </div>
      )}

      <div className="flex flex-col font-sans bg-white to-gray-950 p-5 lg:p-10 lg:px-20  py-11 lg:py-32 gap-10">
        <div className="flex flex-col items-stretch text-center">
          <h1 className="text-xl font-bold text-center text-gray-400 pb-2">
            Recipes
          </h1>
          <h2 className="text-center font-title text-4xl lg:text-7xl text-gray-800 font-bold mb-16 lg:mb-40 drop-shadow-lg">
            What are you craving for?
          </h2>
          <div className="flex justify-center font-title">
            <input
              onChange={addCategory}
              type="text"
              className="bg-gray-100 w-3/5 lg:w-2/5 h-16 lg:h-20  p-5 rounded-l-lg text-gray-800 text-sm lg:text-2xl outline-none"
              placeholder={inputTitle}
            ></input>
            <button
              onClick={sendPromt}
              className="flex rounded-r-lg font-title h-16 lg:h-20 items-center justify-center p-5  bg-gray-800  text-sm lg:text-xl text-white border-none hover:bg-gray-900"
            >
              {isLoading ? "Loading..." : "Generate"}
            </button>
          </div>
        </div>

        {!showRecipe && (
          <>
            <div className="flex flex-col gap-5 mt-16 lg:mt-40">
              <div className="flex flex-wrap justify-center gap-5">
                <ButtonComponent title="Comfort Food" func={applyPromt} />
                <ButtonComponent title="Healthy Options" func={applyPromt} />
                <ButtonComponent title="Sweet Treats" func={applyPromt} />

                {show && (
                  <>
                    <ButtonComponent title="Savory Snacks" func={applyPromt} />
                    <ButtonComponent title="Fast Food" func={applyPromt} />
                    <ButtonComponent
                      title="International Cuisines"
                      func={applyPromt}
                    />
                    <ButtonComponent title="Vegetarian" func={applyPromt} />
                    <ButtonComponent title="Breakfast" func={applyPromt} />
                    <ButtonComponent title="Seafood" func={applyPromt} />
                    <ButtonComponent title="Light Bites" func={applyPromt} />
                    <ButtonComponent title="Cheat Meals" func={applyPromt} />
                    <ButtonComponent
                      title="Late-Night Cravings"
                      func={applyPromt}
                    />

                    <ButtonComponent title="Spicy Foods" func={applyPromt} />
                    <ButtonComponent title="Grilled & BBQ" func={applyPromt} />
                    <ButtonComponent
                      title="Drinks & Smoothies"
                      func={applyPromt}
                    />
                    <ButtonComponent title="Fine Dining" func={applyPromt} />
                  </>
                )}
              </div>
            </div>

            <hr />

            <div className="flex justify-center gap-5">
              {!show && (
                <button
                  className="flex font-title text-sm justify-center items-center gap-2 border-2 border-gray-500 rounded-full p-5  text-gray-500 hover:text-gray-800"
                  onClick={showMore}
                >
                  <p>Show More</p>
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
          </>
        )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <ModalComponent
              showModal={openModal}
              array={history}
              recover={recoverHistory}
              title="History: "
              fallback="Nothing here! make a search..."
              modalType="history"
            />
          </div>
        )}

        {showRecipe && (
          <div className="flex flex-col bg-white text-gray-900 rounded-lg box-border shadow-xl shadow-gray-500 mt-20 lg:mt-32">
            <button
              onClick={() => {
                setShowRecipe(false);
                setAnswer([]);
              }}
              className="flex w-full text-base bg-purple-500 justify-center lg:text-4xl p-5 hover:bg-purple-800 text-white rounded-t-lg"
            >
              <CgCloseO />
            </button>
            <div className="flex justify-center p-5 items-center bg-purple-300">
              <h2 className="flex flex-wrap text-2xl lg:py-5 lg:text-6xl font-title text-center">
                {answer.name}
              </h2>
            </div>
            <div className="flex text-white bg-purple-200 border-b-4 border-purple-300 border-dashed lg:hidden px-5 justify-between font-bold py-5">
              <p className="bg-gray-600 p-2 rounded-lg">
                {answer.portions} portions
              </p>
              <p className="bg-gray-600 p-2 rounded-lg">{answer.time}</p>
            </div>
            <div>
              <p className="text-md lg:text-2xl px-5 py-5 lg:py-10 bg-purple-200">
                {answer.description}
              </p>
              <h2 className="flex bg-purple-300 flex-col px-5 py-5 lg:py-10 text-gray-900 text-xl lg:text-3xl font-semibold">
                Ingredients:
              </h2>
            </div>

            <ul className="flex flex-col px-5 py-5 lg:py-10 gap-1 bg-purple-200 text-md lg:text-2xl">
              {(() => {
                const items = [];
                for (let i = 0; i < answer.ingredients.length; i++) {
                  items.push(<li key={i}>- {answer.ingredients[i]}</li>);
                }
                return items;
              })()}
            </ul>

            <h2 className="flex bg-purple-300 flex-col px-5 py-5 lg:py-10 text-gray-900 text-xl lg:text-3xl font-semibold">
              Instructions:
            </h2>

            <ul className="flex flex-col px-5 py-5 lg:py-10 gap-1 bg-purple-200 text-md lg:text-2xl">
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
            <div className="flex bg-purple-500 rounded-b-lg">
              <button
                className="flex w-1/2 text-base bg-purple-500 justify-center lg:text-4xl p-5 hover:bg-purple-800 text-white rounded-bl-lg"
                onClick={updateFavorites}
              >
                <MdFavoriteBorder />
              </button>
              <button
                onClick={() => {
                  setShowRecipe(false);
                  setAnswer([]);
                }}
                className="flex w-1/2 text-base bg-purple-600 justify-center lg:text-4xl p-5 hover:bg-purple-800 text-white rounded-br-lg"
              >
                <CgCloseO />
              </button>
            </div>
          </div>
        )}
        <div
          className={`${favoritePopup} left-1/4 w-2/4 text-center top-10 text-xl bg-white shadow-lg shadow-gray-400 p-10 text-gray-600 rounded-lg`}
        >
          {isFavorite ? "Added to favorites" : "Removed from favorites"}
        </div>
      </div>
    </>
  );
}
