import { FaInstagram, FaTiktok, FaFacebook, FaYoutube } from "react-icons/fa";

import logo from "./assets/logo.png";

export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-5 items-center py-5 border-t border-neutral-950 px-2">
        <div className="flex gap-4 items-center">
          <img
            src={logo}
            alt="Logo"
            width={40}
            className="border border-neutral-600 rounded-full"
          />
          <span className="font-bold text-neutral-400">INAHEF 2024</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 col-span-3 text-center">
          © 2024 International Healthcare Engineering Forum. All rights
          reserved.
        </p>
        <div className="flex gap-4 items-center justify-end">
          <a
            href="https://www.instagram.com/ptpi_online"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Instagram</span>
            <FaInstagram className="text-neutral-400 hover:text-indigo-600 w-6 h-6" />
          </a>
          <a
            href="https://www.tiktok.com/@ptpi_online"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Tiktok</span>
            <FaTiktok className="text-neutral-400 hover:text-indigo-600 w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/groups/882372103603678/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Facebook</span>
            <FaFacebook className="text-neutral-400 hover:text-indigo-600 w-6 h-6" />
          </a>
          <a
            href="https://www.youtube.com/@seminarptpi2545"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Youtube</span>
            <FaYoutube className="text-neutral-400 hover:text-indigo-600 w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
