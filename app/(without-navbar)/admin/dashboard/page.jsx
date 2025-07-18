"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Sidebar from "@/components/admin/Sidebar";
import HomeManager from "@/components/admin/HomeManager";
import ProductManager from "@/components/admin/ProductManager";
import UserManager from "@/components/admin/UserManager";
import Subcription from "@/components/admin/Subcription";
import CategoriesManager from "@/components/admin/CategoriesManager";
import { isAdminLoggedIn } from "@/lib/checkAdminSession";

const getMenuComponent = (menu) => {
  switch (menu) {
    case "Home":
      return <HomeManager />;
    case "Dashboard":
      return <p className="text-gray-300">Welcome to your admin dashboard.</p>;
    case "Manage Products":
      return <ProductManager />;
    case "Manage User":
      return <UserManager />;
    case "Subcription":
      return <Subcription />;
    case "Manage Categories":
      return <CategoriesManager />;
    case "Settings":
      return <p className="text-gray-300">Update your admin settings here.</p>;
    case "Logout":
      return <p className="text-red-400">You have been logged out.</p>;
    default:
      return <p className="text-gray-400">Page not found.</p>;
  }
};

export default function AdminDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialMenu = searchParams.get("menu") || "Home";

  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(initialMenu);

  useEffect(() => {
    const checkSession = () => {
      const valid = isAdminLoggedIn();
      console.log("Session valid?", valid);
      if (!valid) {
        requestAnimationFrame(() => {
          router.replace("/admin/login");
        });
      } else {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

 useEffect(() => {
    if (!loading && selectedMenu) {
      router.replace(
        `/admin/dashboard/?menu=${encodeURIComponent(selectedMenu)}`
      );
    }
  }, [loading, selectedMenu]);

  // ✅ Tetap render loading jika masih loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#1b2838] text-white">
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">{selectedMenu}</h1>
        {getMenuComponent(selectedMenu)}
      </main>
    </div>
  );
}
