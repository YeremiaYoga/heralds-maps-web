export default function SelectMenu({ tabs, selected, onSelect }) {
  return (
    <aside className="w-full md:w-64 space-y-2">
      {Object.entries(tabs).map(([key, { label }]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`w-full text-left px-4 py-2 rounded-lg transition 
            ${
              selected === key
                ? "bg-[#1a1f2b] text-white font-semibold"
                : "bg-[#10151c] text-gray-300 hover:bg-[#1f2a38]"
            }`}
        >
          {label}
        </button>
      ))}
    </aside>
  );
}
