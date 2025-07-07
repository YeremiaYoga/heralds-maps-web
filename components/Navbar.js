import Link from "next/link";
export default function Navbar() {
  return (
    <header className="bg-[#222122] text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/heraldsmaps_logo.webp"
              alt="Herald Maps Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-2xl">HERALDS MAPS</span>
          </Link>
        </div>

        <nav className="space-x-6 text-sm">
          <a href="#">Patreon</a>
          <a href="#" className="hover:text-blue-400">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
