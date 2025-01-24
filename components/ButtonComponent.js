export default function ButtonComponent({ title, func }) {
  return (
    <button
      onClick={() => func(title)}
      value={title}
      className="btn bg-white text-lg text-gray-900 hover:text-white border-none shadow-lg"
    >
      {title}
    </button>
  );
}
