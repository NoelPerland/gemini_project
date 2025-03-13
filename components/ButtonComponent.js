export default function ButtonComponent({ title, func }) {
  return (
    <button
      onClick={() => func(title)}
      value={title}
      className=" lg:btn-lg font-title  flex flex-wrap lg:flex-nowrap items-center lg:py-20 justify-center rounded-xl  bg-white text-sm lg:text-2xl font-semibold text-gray-600 hover:text-gray-800 hover:bg-purple-500  shadow-lg lg:w-1/4 focus:bg-purple-500 focus:text-gray-800"
    >
      {title}
    </button>
  );
}
