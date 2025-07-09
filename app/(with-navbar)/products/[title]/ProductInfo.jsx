"use client";

import { useRouter } from "next/navigation";

export default function ProductInfo({ product }) {
  const isFree = product.price === 0 || product.free;
  const router = useRouter();

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

  return (
    <div className="w-full md:w-1/3 p-6 rounded-lg bg-black/70 text-white shadow-lg flex flex-col justify-between">
      <div className="space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-sm font-bold text-center border-b border-gray-600 pb-1 mb-3 uppercase tracking-wide">
            Description
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description || "No description provided."}
          </p>
        </div>

        {/* Info */}
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

        {/* Categories */}
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

      {/* Download Button */}
      <div className="mt-6">
        <button
          onClick={handleDownloadClick}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
        >
          Download Now
        </button>
      </div>
    </div>
  );
}
