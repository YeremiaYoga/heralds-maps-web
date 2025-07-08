"use client";
import { useState } from "react";
import Link from "next/link";
import { maps } from "@/data/maps";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const allCategories = Array.from(
    new Set(maps.flatMap((map) => map.categories))
  ).sort();

  const filteredMaps = maps.filter((map) => {
    const matchesQuery = map.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory
      ? map.categories.includes(selectedCategory)
      : true;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen text-white px-8 py-10">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded bg-[#1b2838] text-white border border-gray-600 focus:outline-none"
        >
          <option value="">All Categories</option>
          {allCategories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search maps..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded bg-[#1b2838] text-white border border-gray-600 focus:outline-none w-full sm:w-64"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMaps.map((map) => (
          <Link
            key={map.title}
            href={`/products/${encodeURIComponent(map.title)}`}
            className="group relative overflow-hidden rounded-lg shadow-md bg-[#1b2838] transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img
                src={map.image}
                alt={map.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold leading-tight">{map.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredMaps.length === 0 && (
        <p className="mt-6 text-gray-400 text-sm">No maps found.</p>
      )}
    </div>
  );
}
