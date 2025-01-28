export default function ButtonComponent({ title, func }) {
  return (
    <button
      onClick={() => func(title)}
      value={title}
      className="btn-lg flex items-center p-10 justify-center rounded-xl  bg-white text-base font-semibold text-gray-700 hover:text-white hover:bg-purple-500  shadow-md w-1/4 focus:bg-purple-500 focus:text-white "
    >
      {title}
    </button>
  );
}
