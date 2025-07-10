"use client";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";
import { maps as allMaps } from "@/data/maps";

const ITEMS_PER_PAGE = 3;

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function MapsCarousel() {
  const [pageIndex, setPageIndex] = useState(0);
  const [shuffledMaps, setShuffledMaps] = useState([]);

  useEffect(() => {
    const filtered = allMaps.filter((map) => map.active);
    setShuffledMaps(shuffleArray(filtered));
  }, []);

  const totalPages = Math.ceil(shuffledMaps.length / ITEMS_PER_PAGE);

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
  }, [shuffledMaps]);

  const currentMaps = shuffledMaps.slice(
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

        <div className="w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentMaps.map((map, index) => (
              <Tilt
                key={map.id || index}
                tiltMaxAngleX={-10}
                tiltMaxAngleY={-10}
                perspective={800}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareBorderRadius="12px"
                transitionSpeed={8000}
                scale={0.95}
                className="rounded overflow-hidden shadow-lg"
              >
                <div className="relative group">
                  <div className="w-full aspect-[3/4] relative">
                    <img
                      src={map.image}
                      alt={map.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#FFD700]/20 to-[#1b2838] text-white text-sm p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-sm">{map.title}</h3>
                    </div>
                  </div>
                </div>
              </Tilt>
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
