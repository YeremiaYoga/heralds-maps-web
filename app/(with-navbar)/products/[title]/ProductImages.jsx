"use client";
import { useState, useEffect } from "react";
import { maps } from "@/data/maps";

export default function ProductImages({ product }) {
  const [mainImage, setMainImage] = useState(product.image);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const shuffled = maps
      .filter((map) => map.image !== product.image)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    setThumbnails(shuffled.map((m) => m.image));
  }, [product]);

  return (
    <div className="w-full md:w-2/3 space-y-4">
      <div className="w-full aspect-video rounded-lg shadow-[0_0_10px_5px_rgba(255,255,255,0.1)]">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 bg-black/50 p-2 rounded-xl">
        {[product.image, ...thumbnails].map((img, idx) => (
          <div
            key={idx}
            onClick={() => setMainImage(img)}
            className={`w-24 h-16 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
              mainImage === img ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
