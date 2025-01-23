import ButtonComponent from "@/components/ButtonComponent";
import { useState } from "react";

export default function Hampus() {
  // const [category, setCategory] = useState("");
  const [promt, setPromt] = useState("");

  function applyPromt(title) {
    setPromt(
      `Give me three meals within the category ${title}. Describe each one with one sentence underneath the mealtitle`
    );
  }

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
          <ButtonComponent title="Healthy Options" />
          <ButtonComponent title="Sweet Treats" />
          <ButtonComponent title="Savory Snacks" />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Fast Food" />
          <ButtonComponent title="International Cuisines" />
          <ButtonComponent title="Vegetarian/Vegan" />
          <ButtonComponent title="Breakfast" />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Seafood" />
          <ButtonComponent title="Light Bites" />
          <ButtonComponent title="Cheat Meals" />
          <ButtonComponent title="Late-Night Cravings" />
        </div>
        <div className="flex justify-between">
          <ButtonComponent title="Spicy Foods" />
          <ButtonComponent title="Grilled & BBQ" />
          <ButtonComponent title="Drinks & Smoothies" />
          <ButtonComponent title="Fine Dining" />
        </div>
        <p>{promt}</p>
      </div>
    </div>
  );
}
