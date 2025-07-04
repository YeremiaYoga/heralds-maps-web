"use client";

import { useState, useRef } from "react";

const dummyProducts = [
  {
    title: "Summer Forest Road Map",
    image: "/assets/dummy/summer_forest_road.webp",
    type: "paid",
    price: 13.59,
    discount: 33,
    finalPrice: 9.11,
  },
  {
    title: "Desert Ruin Map",
    image: "/assets/dummy/desert_ruin.webp",
    type: "paid",
    price: 49.99,
    discount: 20,
    finalPrice: 39.99,
  },
  {
    title: "Ruin Building within Swamp",
    image: "/assets/dummy/ruin_building_within_swamp.webp",
    type: "paid",
    price: 20.69,
    discount: 45,
    finalPrice: 11.38,
  },
  {
    title: "Forest with a Small Lake",
    image: "/assets/dummy/forest_with_a_small_lake.webp",
    type: "paid",
    price: 28.49,
    discount: 50,
    finalPrice: 14.25,
  },
  {
    title: "Magical Store within City",
    image: "/assets/dummy/magical_store_within_city.webp",
    type: "free",
    price: 0,
    discount: 0,
    finalPrice: 0,
  },
  {
    title:
      "Greek Style City Center with a Fountain as Middle Part Top Version 1",
    image:
      "/assets/dummy/greek_style_city_center_with_a_fountain_as_middle_part_top_version_1.webp",
    type: "free",
    price: 0,
    discount: 0,
    finalPrice: 0,
  },
];

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Products</h2>
        <button
          className="px-4 py-2 bg-[#FFD700] text-black rounded font-semibold hover:brightness-95"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1b2838] text-white p-6 rounded w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full text-sm text-gray-300"
                  required={!form.image}
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <input
                name="title"
                placeholder="Title"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
                value={form.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
                value={form.description}
                onChange={handleChange}
                required
              ></textarea>

              <select
                name="type"
                className="w-full p-2 rounded bg-[#2a2a2a] text-white"
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
                    className="w-full p-2 rounded bg-[#2a2a2a] text-white"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                  <input
                    name="discount"
                    type="number"
                    placeholder="Discount (%)"
                    className="w-full p-2 rounded bg-[#2a2a2a] text-white"
                    value={form.discount}
                    onChange={handleChange}
                  />
                </>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 rounded font-semibold hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="w-full mt-8 text-left border-collapse">
        <thead>
          <tr className="text-gray-300 border-b border-gray-600">
            <th className="p-2">Image</th>
            <th className="p-2">Title</th>
            <th className="p-2">Description</th>
            <th className="p-2">Type</th>
            <th className="p-2">Price</th>
            <th className="p-2">Discount</th>
            <th className="p-2">Final Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={idx} className="border-b border-gray-700">
              <td className="p-2">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.description || "-"}</td>
              <td className="p-2 capitalize">{product.type}</td>
              <td className="p-2">
                {product.type === "paid" ? `$${product.price}` : "-"}
              </td>
              <td className="p-2">
                {product.type === "paid" && product.discount
                  ? `${product.discount}%`
                  : "-"}
              </td>
              <td className="p-2">
                {product.type === "paid" ? `$${product.finalPrice}` : "Free"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
