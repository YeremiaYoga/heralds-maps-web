"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, StarOff } from "lucide-react";

export default function ProductInfo({ product }) {
  const isFree = product.price === 0 || product.free;
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);

  const gridTiles =
    product.dimensions && product.gridSize
      ? {
          x: Math.round(product.dimensions.width / product.gridSize),
          y: Math.round(product.dimensions.height / product.gridSize),
        }
      : null;

  const handleDownloadClick = () => {
    router.push(`/subscribe?productId=${product._id || product.id || ""}`);
  };

  const handleFavoriteToggle = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <div className="w-full md:w-1/3 p-6 rounded-lg bg-black/70 text-white shadow-lg flex flex-col justify-between">
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-bold text-center border-b border-gray-600 pb-1 mb-3 uppercase tracking-wide">
            Description
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description || "No description provided."}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-center border-b border-gray-600 pb-1 mb-3 uppercase tracking-wide">
            Info
          </h2>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Grid tiles</span>
              <span>{gridTiles ? `${gridTiles.x} × ${gridTiles.y}` : "-"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Grid size</span>
              <span>
                {product.gridSize ? `${product.gridSize} px / tile` : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Image dimensions</span>
              <span>
                {product.dimensions
                  ? `${product.dimensions.width} × ${product.dimensions.height}`
                  : "-"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.categories?.map((cat, idx) => (
            <span
              key={idx}
              className="bg-gray-700 px-3 py-1 rounded-full text-xs text-white"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={handleDownloadClick}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 flex-1 mr-2"
        >
          Download Now
        </button>
        <button
          onClick={handleFavoriteToggle}
          className="text-yellow-400 hover:text-yellow-300 transition p-2 bg-black/40 border-1 border-white/50 rounded-lg"
          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        >
          {isFavorited ? (
            <Star className="w-6 h-6 fill-current" />
          ) : (
            <StarOff className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
