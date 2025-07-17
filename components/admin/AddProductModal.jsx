"use client";

import { useRef } from "react";

export default function AddProductModal({ form, setForm, onSubmit, onClose }) {
  const fileInputRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2b] text-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
        <h3 className="text-xl font-bold mb-2">Add New Product</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="w-full h-40 object-cover rounded border border-gray-700"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="text-sm text-gray-300"
            required
          />

          <input
            name="title"
            placeholder="Title"
            className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={3}
            className="w-full p-2 rounded bg-[#2e3f4f] text-white"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
            required
          >
            <option value="">Select type</option>
            <option value="free">Free</option>
            <option value="subscribe">Subscribe</option>
          </select>

          <select
            name="categories"
            value={form.categories}
            onChange={(e) => setForm({ ...form, categories: e.target.value })}
            className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
          >
            <option value="">Select category</option>
            <option value="dungeon">Dungeon</option>
            <option value="forest">Forest</option>
            <option value="city">City</option>
            <option value="desert">Desert</option>
            <option value="interior">Interior</option>
          </select>

          <div className="grid grid-cols-2 gap-2">
            <input
              name="width"
              placeholder="Width (px)"
              type="number"
              className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
              value={form.width}
              onChange={(e) => setForm({ ...form, width: e.target.value })}
            />
            <input
              name="height"
              placeholder="Height (px)"
              type="number"
              className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
              value={form.height}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
          </div>

          {/* Grid Size */}
          <input
            name="gridSize"
            placeholder="Grid Size"
            type="number"
            className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
            value={form.gridSize}
            onChange={(e) => setForm({ ...form, gridSize: e.target.value })}
            required
          />

          {/* Submit Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded font-semibold hover:bg-green-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
