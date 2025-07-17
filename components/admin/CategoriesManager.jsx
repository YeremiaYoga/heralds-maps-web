"use client";

import { useState } from "react";

export default function CategoriesManager() {
  const [categories, setCategories] = useState(["dungeon", "forest", "city"]);
  const [newCategory, setNewCategory] = useState("");

  const addCategory = () => {
    const trimmed = newCategory.trim().toLowerCase();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setNewCategory("");
    }
  };

  const removeCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
          className="flex-1 px-3 py-2 rounded bg-[#2e3f4f] text-white text-sm"
        />
        <button
          onClick={addCategory}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded text-sm font-semibold"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center bg-[#2e3f4f] px-4 py-2 rounded"
          >
            <span className="capitalize">{cat}</span>
            <button
              onClick={() => removeCategory(cat)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
