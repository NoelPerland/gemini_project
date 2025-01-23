import ButtonComponent from "@/components/ButtonComponent";
import { useEffect, useState } from "react";
import { model } from "@/util/ai";

export default function Hampus() {
  // const [category, setCategory] = useState("");
  const [promt, setPromt] = useState("");
  const [answer, setAnswer] = useState("");

  function applyPromt(title) {
    setPromt(
      `Give me three meals within the category ${title}. Describe each one with one sentence underneath the meal title`
    );
  }

  async function sendPromt() {
    const result = await model.generateContent(promt);

    setAnswer(result.response.text());
  }

  useEffect(() => {
    sendPromt;
  }, [promt]);

  return (
    <div className="flex flex-col my-36 gap-16 items-center justify-center">
      <div className="flex flex-col gap-6">
        <h1 className="text-6xl font-semibold text-start">
          Food recommendations
        </h1>
        <p className="text-start text-2xl text-gray-300">
          What are you craving for?
        </p>
      </div>

      <div className="flex flex-col  bg-gray-700 p-10 rounded-lg gap-6 w-2/4 flex-wrap">
        <div className="flex justify-between">
          <ButtonComponent title="Comfort Food" func={applyPromt} />
          <ButtonComponent title="Healthy Options" func={applyPromt} />
          <ButtonComponent title="Sweet Treats" func={applyPromt} />
          <ButtonComponent title="Savory Snacks" func={applyPromt} />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Fast Food" func={applyPromt} />
          <ButtonComponent title="International Cuisines" func={applyPromt} />
          <ButtonComponent title="Vegetarian/Vegan" func={applyPromt} />
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
        <p>{answer}</p>
      </div>
    </div>
  );
}
