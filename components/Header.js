import Link from "next/link";
import {
  FaHome,
  FaComments,
  FaUtensils,
  FaPlane,
  FaInfoCircle,
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="flex items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-400">
            MyGeminiApp
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-6">
          <li>
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link
              href="/Noel"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <FaComments /> Chatbot
            </Link>
          </li>
          <li>
            <Link
              href="/Hampus"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <FaUtensils /> Recipes
            </Link>
          </li>
          <li>
            <Link
              href="/Irene"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <FaPlane /> Travel
            </Link>
          </li>
          <li>
            <Link
              href="/About"
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <FaInfoCircle /> About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
