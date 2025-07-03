"use client";
import { useEffect, useState } from "react";

const maps = [
  {
    title: "Summer Forest Road Map",
    image: "/assets/dummy/summer_forest_road.webp",
    discount: "-33%",
    original: "Rp 135 999",
    price: "Rp 91 119",
  },
  {
    title: "Desert Ruin Map",
    image: "/assets/dummy/desert_ruin.webp",
    discount: "-20%",
    original: "Rp 499 999",
    price: "Rp 399 999",
  },
  {
    title: "Ruin Building within Swamp",
    image: "/assets/dummy/ruin_building_within_swamp.webp",
    discount: "-45%",
    original: "Rp 206 999",
    price: "Rp 113 849",
  },
  {
    title: "Forest with a Small Lake",
    image: "/assets/dummy/forest_with_a_small_lake.webp",
    discount: "-50%",
    original: "Rp 284 999",
    price: "Rp 142 499",
    live: true,
  },
  {
    title: "Magical Store within City",
    image: "/assets/dummy/magical_store_within_city.webp",
    discount: "-25%",
    original: "Rp 44 999",
    price: "Rp 33 749",
    free: true,
  },
  {
    title:
      "Greek Style City Center with a Fountain as Middle Part Top Version 1",
    image:
      "/assets/dummy/greek_style_city_center_with_a_fountain_as_middle_part_top_version_1.webp",
    discount: "-70%",
    original: "Rp 549 000",
    price: "Rp 164 700",
    free: true,
  },
];

const ITEMS_PER_PAGE = 3;

export default function MapsCarousel() {
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.ceil(maps.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextPage();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentMaps = maps.slice(
    pageIndex * ITEMS_PER_PAGE,
    pageIndex * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <div className="py-6">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevPage}
          className="bg-[#2a475e] p-2 rounded hover:bg-[#bdc6ca]"
        >
          ◀
        </button>

        <div className="w-[960px]">
          <div className="grid grid-cols-3 gap-6">
            {currentMaps.map((map, index) => (
              <div
                key={index}
                className="relative group rounded overflow-hidden shadow-lg hover:scale-[1.03] transition-transform duration-200"
              >
                <div className="w-full aspect-[3/4] relative">
                  <img
                    src={map.image}
                    alt={map.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-sm">{map.title}</h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="bg-green-500 text-black px-2 rounded text-xs">
                        {map.discount}
                      </span>
                      <span className="line-through text-xs text-gray-300">
                        {map.original}
                      </span>
                      <span className="text-sm font-bold">{map.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextPage}
          className="bg-[#2a475e] p-2 rounded hover:bg-[#1b3a4a]"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
