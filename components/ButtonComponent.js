export default function ButtonComponent({ title, func }) {
  return (
    <button
      onClick={() => func(title)}
      value={title}
      className="font-title  flex flex-wrap lg:flex-nowrap items-center w-full py-5 lg:w-1/4  lg:py-20 justify-center rounded-xl lg:bg-white text-sm lg:text-2xl font-semibold text-gray-600 hover:text-gray-800 hover:bg-purple-500  shadow-lg shadow-gray-400  focus:bg-purple-500 focus:text-gray-800"
    >
      {title}
    </button>
  );
}
