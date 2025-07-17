"use client";

import { X } from "lucide-react";
import { maps } from "@/data/maps";

export default function UserDetailModal({ user, onClose, showPassword, togglePassword }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2b] text-white p-6 rounded-lg shadow-xl w-full max-w-2xl space-y-4">
        <div className="flex justify-between items-center border-b border-gray-600 pb-2">
          <h3 className="text-xl font-bold">User Detail</h3>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={`font-semibold ${user.subscribed ? "text-green-400" : "text-red-400"}`}>
              {user.subscribed ? "Subscribed" : "Not Subscribed"}
            </span>
          </p>
          <p>
            <strong>Password:</strong>{" "}
            <span className="bg-[#2e3f4f] px-2 py-1 rounded font-mono">
              {showPassword ? user.password : "•".repeat(user.password.length)}
            </span>
            <button onClick={togglePassword} className="ml-2 text-sm text-cyan-400 hover:underline">
              {showPassword ? "Hide" : "Show"}
            </button>
          </p>

          <div>
            <strong>Favorite Maps:</strong>
            {user.favorite.length === 0 ? (
              <p className="text-gray-400 mt-1">No favorites</p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {maps
                  .filter((map) => user.favorite.includes(map.id))
                  .map((map) => (
                    <li key={map.id} className="flex items-center gap-3 bg-[#263343] p-2 rounded">
                      <img
                        src={map.image}
                        alt={map.title}
                        className="w-16 h-16 object-cover rounded border border-gray-700"
                      />
                      <div>
                        <p className="font-semibold">{map.title}</p>
                        <p className="text-xs text-gray-400">
                          {map.categories?.join(", ")}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
