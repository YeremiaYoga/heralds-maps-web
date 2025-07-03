export default function SubNav() {
  return (
    <div className="bg-[#2a475e] px-8 py-2 flex flex-wrap items-center gap-6 text-white text-sm">
      <a href="#" className="hover:underline">
        Home
      </a>
      <a href="#">Live Gallery</a>
      <a href="#">All Produtc</a>
      <a href="#">Tutorials</a>
      <a href="#">Info & FAQ</a>
      <input
        type="text"
        placeholder="Search"
        className="ml-auto px-2 py-1 rounded bg-[#1b2838] text-white border border-gray-500"
      />
    </div>
  );
}
