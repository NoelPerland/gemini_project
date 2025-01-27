export default function ButtonComponent({ title, func }) {
  return (
    <button
      onClick={() => func(title)}
      value={title}
      className="btn-lg flex items-center p-10 justify-center  rounded-xl border-4 border-purple-300 bg-white text-base font-semibold text-gray-700 hover:text-white hover:bg-gray-800  shadow-md shadow-gray-700 w-1/5 hover:border-gray-600"
    >
      {title}
    </button>
  );
}
