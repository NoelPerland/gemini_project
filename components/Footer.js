import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <nav className="flex flex-col md:flex-row justify-between gap-8">
        {/* Navigation Links */}
        <ul className="flex flex-col md:flex-row gap-6">
          <li>
            <Link href="/home" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/About" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/support" className="hover:text-gray-400">
              Support
            </Link>
          </li>
          <li>
            <Link href="/work-with-us" className="hover:text-gray-400">
              Work with us
            </Link>
          </li>
        </ul>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> Arenavägen 61
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt /> +46763333333
          </p>
        </div>
      </nav>
    </footer>
  );
}
