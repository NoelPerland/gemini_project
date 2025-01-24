export default function ButtonComponent({ title, func }) {
  return (
    <button
      onClick={() => func(title)}
      value={title}
      className="btn-lg rounded-xl bg-white text-lg text-gray-900 hover:text-white hover:bg-gray-900 border-none shadow-md shadow-gray-500 w-1/5"
    >
      {title}
    </button>
  );
}
