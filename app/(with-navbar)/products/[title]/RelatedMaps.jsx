"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { maps } from "@/data/maps";

export default function RelatedMaps({ currentTitle, categories }) {
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  let related = maps
    .filter((map) => map.title !== currentTitle)
    .map((map) => {
      const shared = map.categories.filter((cat) => categories.includes(cat));
      return { ...map, relevance: shared.length };
    })
    .filter((map) => map.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);

  if (related.length === 0) {
    related = maps.filter((map) => map.title !== currentTitle).slice(0, 6);
  }

  const totalPages = Math.ceil(related.length / itemsPerPage);
  const startIdx = page * itemsPerPage;
  const visibleMaps = related.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="mt-16">
      <h2 className="text-xl font-bold mb-4">Related Maps</h2>

      <div className="relative">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full disabled:opacity-40"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 p-2 rounded-full disabled:opacity-40"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10">
          {visibleMaps.map((map, idx) => (
            <Link
              key={idx}
              href={`/products/${encodeURIComponent(map.title)}`}
              className="bg-[#1b2838] rounded shadow hover:scale-105 transition-transform"
            >
              <div className="w-full aspect-video overflow-hidden rounded-t">
                <img
                  src={map.image}
                  alt={map.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
