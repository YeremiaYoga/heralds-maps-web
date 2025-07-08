"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import HomeManager from "@/components/admin/HomeManager";
import ProductManager from "@/components/admin/ProductManager";
import UserManager from "@/components/admin/UserManager";

const menuComponents = {
  Home: <HomeManager />,
  Dashboard: <p className="text-gray-300">Welcome to your admin dashboard.</p>,
  "Manage Products": <ProductManager />,
  "Manage User": <UserManager />,
  Settings: <p className="text-gray-300">Update your admin settings here.</p>,
  Logout: <p className="text-red-400">You have been logged out.</p>,
};


export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialMenu = searchParams.get("menu") || "Home";
  const [selectedMenu, setSelectedMenu] = useState(initialMenu);

  useEffect(() => {
    router.replace(`/admin/dashboard/?menu=${encodeURIComponent(selectedMenu)}`);
  }, [selectedMenu]);

  return (
    <div className="min-h-screen flex bg-[#1b2838] text-white">
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">{selectedMenu}</h1>
        {menuComponents[selectedMenu] || (
          <p className="text-gray-400">Page not found.</p>
        )}
      </main>
    </div>
  );
}
