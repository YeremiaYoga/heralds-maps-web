"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [username, setUsername] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-[#222122] text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/heraldsmaps_logo.webp"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="font-bold text-2xl">HERALDS MAPS</span>
        </Link>

        <nav className="relative space-x-6 text-sm">
          <a href="#">Patreon</a>

          {username ? (
            <div className="inline-block relative">
              <button
                onClick={toggleMenu}
                className="hover:text-blue-400 flex items-center gap-1"
              >
                {username}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#333] border border-gray-600 rounded shadow-lg z-10">
                  <Link
                    href="/account"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 hover:bg-[#444]"
                  >
                    Manage Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#444]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hover:text-blue-400">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
