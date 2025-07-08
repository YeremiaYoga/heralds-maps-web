"use client";

import { useState, useRef } from "react";
import { maps as dummyProducts } from "@/data/maps";

export default function ProductManager() {
  const [products, setProducts] = useState(dummyProducts);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    type: "free",
    price: "",
    discount: "",
  });
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPrice =
      form.type === "paid" && form.discount
        ? (form.price * (1 - form.discount / 100)).toFixed(2)
        : form.price;

    setProducts([...products, { ...form, finalPrice }]);
    setForm({
      image: "",
      title: "",
      description: "",
      type: "free",
      price: "",
      discount: "",
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neon">Manage Products</h2>
        <button
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded font-semibold hover:brightness-110"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2b] text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded border border-gray-700"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-gray-300"
                required={!form.image}
              />
              <input
                name="title"
                placeholder="Title"
                className="w-full p-2 rounded bg-[#2e3f4f] text-white"
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 rounded bg-[#2e3f4f] text-white"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>
              <select
                name="type"
                className="w-full p-2 rounded bg-[#2e3f4f] text-white"
                value={form.type}
                onChange={handleChange}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
              {form.type === "paid" && (
                <>
                  <input
                    name="price"
                    type="number"
                    placeholder="Price (USD)"
                    className="w-full p-2 rounded bg-[#2e3f4f] text-white"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="discount"
                    type="number"
                    placeholder="Discount (%)"
                    className="w-full p-2 rounded bg-[#2e3f4f] text-white"
                    value={form.discount}
                    onChange={handleChange}
                  />
                </>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
      )}

      <table className="w-full mt-8 text-left border-collapse border border-[#2c3e50]">
        <thead className="bg-[#243447] text-white">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Title</th>
            <th className="p-3">Description</th>
            <th className="p-3">Type</th>
            <th className="p-3">Price</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Final Price</th>
            <th className="p-3">Dimensions</th>
            <th className="p-3">Grid Size</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => {
            const isFree = product.price === 0 || product.free;
            return (
              <tr key={idx} className="border-b border-gray-700 hover:bg-[#2e3e50]">
                <td className="p-3">
                  <img
                    src={product.image}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-semibold text-white">{product.title}</td>
                <td className="p-3 text-gray-300">{product.description || "-"}</td>
                <td className="p-3 capitalize text-gray-200">
                  {isFree ? "Free" : "Paid"}
                </td>
                <td className="p-3">
                  {!isFree ? `$${product.original?.toFixed(2)}` : "-"}
                </td>
                <td className="p-3">
                  {!isFree && product.discount ? product.discount : "-"}
                </td>
                <td className="p-3">
                  {!isFree ? `$${product.price?.toFixed(2)}` : "Free"}
                </td>
                <td className="p-3">
                  {product.dimensions
                    ? `${product.dimensions.width}×${product.dimensions.height}px`
                    : "-"}
                </td>
                <td className="p-3">{product.gridSize || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
