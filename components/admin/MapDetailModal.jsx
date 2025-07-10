"use client";

import users from "@/data/users";

export default function MapDetailModal({ map, onClose }) {
  if (!map) return null;

  const favoritedByUsers = users.filter((user) =>
    map.isFavorited?.includes(user.id)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6 backdrop-blur-sm">
      <div className="bg-[#101820] text-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl relative border border-[#2a3b4c]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          title="Close"
        >
          ✕
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Preview */}
          <div className="flex-1 overflow-hidden border border-[#3a4a5c] rounded-lg shadow-md">
            <img
              src={map.image}
              alt={map.title}
              className="w-full h-auto max-h-[600px] object-contain rounded-md"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-yellow-400">
                {map.title}
              </h2>
              <p className="mt-2 text-gray-300 leading-relaxed text-sm">
                {map.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-t border-[#2a3b4c] pt-4">
              <div>
                <span className="text-gray-400">Active:</span>{" "}
                <span
                  className={`font-semibold ${
                    map.active ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {map.active ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Dimensions:</span>{" "}
                <span>
                  {map.dimensions
                    ? `${map.dimensions.width} × ${map.dimensions.height}px`
                    : "-"}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Grid Size:</span>{" "}
                <span>{map.gridSize ? `${map.gridSize}px / tile` : "-"}</span>
              </div>
              {map.dimensions && map.gridSize && (
                <div>
                  <span className="text-gray-400">Grid Tiles:</span>{" "}
                  <span className="text-cyan-400 font-semibold">
                    {`${Math.round(map.dimensions.width / map.gridSize)} × ${Math.round(
                      map.dimensions.height / map.gridSize
                    )}`}
                  </span>
                </div>
              )}
              <div className="sm:col-span-2">
                <span className="text-gray-400">Categories:</span>{" "}
                <span>{map.categories?.join(", ") || "-"}</span>
              </div>
            </div>

            {/* Favorited By */}
            <div className="pt-4 border-t border-[#2a3b4c]">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">
                Favorited By:
              </h4>
              {favoritedByUsers.length > 0 ? (
                <ul className="list-disc pl-5 space-y-1 text-sm text-white">
                  {favoritedByUsers.map((user) => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No users have favorited this map.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
