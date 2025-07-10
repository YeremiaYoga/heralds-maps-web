"use client";

import { useEffect, useState } from "react";
import users from "@/data/users";
import { maps } from "@/data/maps";
import Link from "next/link";

export default function FavoritesPage() {
  const [favoriteMaps, setFavoriteMaps] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    if (!storedUsername) return;

    const currentUser = users.find((u) => u.name === storedUsername);

    if (currentUser && currentUser.favorite.length > 0) {
      const favorites = maps.filter((map) =>
        currentUser.favorite.includes(map.id)
      );
      setFavoriteMaps(favorites);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Maps</h1>

      {favoriteMaps.length === 0 ? (
        <p className="text-gray-400">
          {username
            ? "You don't have any favorite maps yet."
            : "Please login to see your favorite maps."}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteMaps.map((map) => (
            <div
              key={map.id}
              className="bg-[#1b2838] rounded-lg shadow hover:scale-[1.02] transition-transform duration-200 overflow-hidden"
            >
              <img
                src={map.image}
                alt={map.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-yellow-300 mb-2">
                  {map.title}
                </h3>
                <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                  {map.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {map.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-800/80 text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
