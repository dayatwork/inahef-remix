import { Link } from "@remix-run/react";
import { ArrowRight, LogInIcon } from "lucide-react";
import logo from "~/assets/logo.png";

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto w-full py-4 px-4 flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            width={64}
            className="border border-neutral-600 rounded-full"
          />
          <span className="text-white font-bold text-xl">INAHEF 2024</span>
        </Link>
        <nav className="flex gap-6 text-sm font-semibold">
          <Link to="/about-inahef" className="hover:text-indigo-400 transition">
            About INAHEF
          </Link>
          <Link
            to="/for-exhibitor"
            className="hover:text-indigo-400 transition"
          >
            For Exhibitor
          </Link>
          <Link to="/for-visitor" className="hover:text-indigo-400 transition">
            For Visitor
          </Link>
        </nav>
      </div>
      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2.5 text-sm">
          <p>16-18 of September, 2024</p>
          <span className="w-2 h-2 bg-white rounded-xs rotate-45"></span>
          <p>Jakarta, Indonesia</p>
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <Link
            to="/app/home"
            className="relative flex items-center px-4 py-2 rounded-lg leading-none text-sm font-semibold bg-black group-hover:text-indigo-400 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-3 -rotate-6 group-hover:rotate-0 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            Grab your tickets
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <Link
          to="/login"
          className="h-10 w-10 flex items-center justify-center rounded-full border border-neutral-800 bg-black hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all"
        >
          <span className="sr-only">Log in</span>
          <LogInIcon className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}
