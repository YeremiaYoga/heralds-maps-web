"use client";

import { useState, useRef } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { maps as dummyProducts } from "@/data/maps";
import MapDetailModal from "@/components/admin/MapDetailModal";

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
  const [selectedMap, setSelectedMap] = useState(null);
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

    setProducts([...products, { ...form, price: parseFloat(finalPrice) }]);
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
        <h2 className="text-3xl font-bold">Manage Products</h2>
        <button
          className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-md font-semibold hover:brightness-110"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>
      </div>

      {/* Modal Add Product */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2b] text-white p-6 rounded-lg shadow-xl w-full max-w-lg space-y-4">
            <h3 className="text-xl font-bold mb-2">Add New Product</h3>
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
                className="text-sm text-gray-300"
                required={!form.image}
              />
              <input
                name="title"
                placeholder="Title"
                className="w-full p-2 rounded bg-[#2e3f4f] text-white text-sm"
                value={form.title}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                rows={4}
                className="w-full p-2 rounded bg-[#2e3f4f] text-white"
                value={form.description}
                onChange={handleChange}
                required
              />
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

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#2c3e50]">
        <table className="min-w-full table-auto text-sm text-white">
          <thead className="bg-[#22384e]">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left text-sm">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Original</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Final</th>
              <th className="p-3 text-left">Dimensions</th>
              <th className="p-3 text-left">Grid Size</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => {
              const isFree = product.price === 0 || product.free;
              const rowColor = idx % 2 === 0 ? "bg-[#1c2a38]" : "bg-[#1a252f]";
              return (
                <tr
                  key={idx}
                  className={`${rowColor} border-b border-[#2c3e50]`}
                >
                  <td className="p-3">
                    <img
                      src={product.image}
                      alt="Product"
                      className="w-14 h-14 object-cover rounded shadow"
                    />
                  </td>
                  <td className="p-3 font-medium text-sm">{product.title}</td>
                  <td className="p-3 text-gray-300 max-w-[250px] text-xs">
                    {product.description}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isFree
                          ? "bg-green-700 text-green-100"
                          : "bg-yellow-700 text-yellow-100"
                      }`}
                    >
                      {isFree ? "Free" : "Paid"}
                    </span>
                  </td>
                  <td className="p-3">
                    {!isFree ? `$${product.original?.toFixed(2)}` : "-"}
                  </td>
                  <td className="p-3">
                    {!isFree && product.discount ? `${product.discount}%` : "-"}
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
                  <td className="p-3 text-right space-x-2">
                    <button
                      className="text-cyan-400 hover:text-cyan-300"
                      onClick={() => setSelectedMap(product)}
                    >
                      <Eye size={16} />
                    </button>
                    <button className="text-blue-400 hover:text-blue-300">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedMap && (
        <MapDetailModal
          map={selectedMap}
          onClose={() => setSelectedMap(null)}
        />
      )}
    </div>
  );
}
