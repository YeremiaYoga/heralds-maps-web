export default function Header() {
  return (
    <header className="bg-[#171a21] text-white px-8 py-4 flex justify-between items-center">
      <div className="font-bold text-xl">MAPS</div>
      <nav className="space-x-6 text-sm">
        <a href="#">Patreon</a>
        <a href="#" className="hover:text-blue-400">
          Login
        </a>
      </nav>
    </header>
  );
}
