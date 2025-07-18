"use client";

import { maps } from "@/data/maps";

export default function MapsGrid() {
  // Filter hanya map yang aktif
  const activeMaps = maps.filter((map) => map.active);

  return (
    <div className="px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeMaps.map((map, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-r from-[#FFD700]/20 to-[#1b2838] shadow-lg rounded overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="relative">
              <img
                src={map.image}
                alt={map.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-1 left-1">
                <div className="relative w-14">
                  <img
                    src={
                      map.type === "free"
                        ? "/assets/bubble_free.webp"
                        : "/assets/bubble_subscribe.webp"
                    }
                    alt={map.type === "free" ? "Free" : "Subscribe"}
                    className="w-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                    {map.type === "free" ? "Free" : "Subscribe"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 text-white flex flex-col justify-between space-y-2 min-h-[90px]">
              <h3 className="font-semibold text-sm text-[#cfcfcf]">
                {map.title}
              </h3>

              {map.categories && map.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {map.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-blue-800/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
