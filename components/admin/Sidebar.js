"use client";

import {
  Home,
  BarChart,
  Package,
  Users,
  Settings,
  LogOut,
  CreditCard, 
} from "lucide-react";

const menuItems = [
  { label: "Home", icon: <Home size={18} /> },
  { label: "Dashboard", icon: <BarChart size={18} /> },
  { label: "Manage Products", icon: <Package size={18} /> },
  { label: "Manage User", icon: <Users size={18} /> },
  { label: "Subcription", icon: <CreditCard size={18} /> }, 
  { label: "Settings", icon: <Settings size={18} /> },
  { label: "Logout", icon: <LogOut size={18} /> },
];

export default function Sidebar({ selectedMenu, setSelectedMenu }) {
  return (
    <aside className="w-64 bg-[#1e3a4c] text-white p-6 space-y-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin</h2>
      <nav className="space-y-2">
        {menuItems.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => setSelectedMenu(label)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded transition font-medium 
              ${
                selectedMenu === label
                  ? "bg-yellow-500 text-black"
                  : "hover:bg-[#2e4f63]"
              }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
