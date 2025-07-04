"use client";

const menuItems = ["Home", "Dashboard", "Manage Products", "Settings", "Logout"];

export default function Sidebar({ selectedMenu, setSelectedMenu }) {
  return (
    <aside className="w-64 bg-[#2a475e] p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin</h2>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedMenu(item)}
            className={`block w-full text-left px-4 py-2 rounded hover:bg-[#3a5a70] transition ${
              selectedMenu === item ? "bg-[#3a5a70]" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
