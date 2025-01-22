export default function ButtonComponent({ title }) {
  return (
    <button className="btn bg-white text-lg text-gray-900  hover:text-white">
      {title}
    </button>
  );
}
