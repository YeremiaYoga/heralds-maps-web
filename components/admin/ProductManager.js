"use client";

import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Eye, ChevronUp, ChevronDown } from "lucide-react";
import MapDetailModal from "@/components/admin/MapDetailModal";
import AddProductModal from "@/components/admin/AddProductModal";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    image: null,
    title: "",
    description: "",
    categories: "",
    width: "",
    height: "",
    gridSize: "",
    type: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/products`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        } else {
          console.error("Failed to fetch:", json.message);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("categories", JSON.stringify(form.categories));
      formData.append("width", form.width);
      formData.append("height", form.height);
      formData.append("gridSize", form.gridSize);
      formData.append("active", false); // default false
      formData.append("isFavorited", JSON.stringify([])); // default empty array
      formData.append("type", "map"); // default type
      formData.append("image", form.image);

      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setProducts([...products, data.data]);
        setShowModal(false);
        setForm({
          image: null,
          title: "",
          description: "",
          categories: [],
          width: "",
          height: "",
          gridSize: "",
          type: "",
        });
      } else {
        alert("Failed to add product: " + data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong");
    }
  };

  const toggleActive = (id) => {
    const now = new Date().toISOString();
    setProducts((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, active: !item.active, updated_at: now }
          : item
      )
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const renderSortIcon = (field) => {
    if (sortBy === field) {
      return sortOrder === "asc" ? (
        <ChevronUp className="inline w-4 h-4 ml-1" />
      ) : (
        <ChevronDown className="inline w-4 h-4 ml-1" />
      );
    } else {
      return <ChevronDown className="inline w-4 h-4 ml-1 text-gray-500" />;
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getValue = (p) => {
      switch (sortBy) {
        case "title":
        case "description":
        case "created_at":
        case "updated_at":
          return p[sortBy]?.toLowerCase() || "";
        case "active":
          return p.active ? 1 : 0;
        case "dimensions":
          return p.dimensions ? p.dimensions.width * p.dimensions.height : 0;
        case "gridSize":
          return p.gridSize || 0;
        case "favoriteCount":
          return p.isFavorited?.length || 0;
        default:
          return 0;
      }
    };
    const aVal = getValue(a);
    const bVal = getValue(b);
    if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">List Products</h2>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search title..."
            className="px-3 py-1 rounded bg-[#2e3f4f] text-sm text-white placeholder-gray-400 border border-[#2c3e50] focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black rounded-md font-semibold hover:brightness-110"
            onClick={() => setShowModal(true)}
          >
            + Add Product
          </button>
        </div>
      </div>

      {showModal && (
        <AddProductModal
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#2c3e50]">
          <table className="min-w-full table-auto text-sm text-white">
            <thead className="bg-[#22384e]">
              <tr>
                <th className="p-3 text-left">Image</th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  Title {renderSortIcon("title")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("description")}
                >
                  Description {renderSortIcon("description")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("active")}
                >
                  Active {renderSortIcon("active")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("dimensions")}
                >
                  Dimensions {renderSortIcon("dimensions")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("gridSize")}
                >
                  Grid Size {renderSortIcon("gridSize")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("favoriteCount")}
                >
                  Favorited {renderSortIcon("favoriteCount")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At {renderSortIcon("createdAt")}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("updatedAt")}
                >
                  Updated At {renderSortIcon("updatedAt")}
                </th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product, idx) => {
                const rowColor =
                  idx % 2 === 0 ? "bg-[#1c2a38]" : "bg-[#1a252f]";
                const favoriteCount = product.isFavorited?.length || 0;
                return (
                  <tr
                    key={product._id}
                    className={`${rowColor} border-b border-[#2c3e50]`}
                  >
                    <td className="p-3">
                      <img
                        src={`${API_BASE}/uploads/${product.image}`}
                        alt="Product"
                        className="w-14 h-14 object-cover rounded shadow"
                      />
                    </td>
                    <td className="p-3 font-medium max-w-[200px]">
                      {product.title}
                    </td>
                    <td className="p-3 text-gray-300 max-w-[250px] text-xs">
                      {product.description}
                    </td>
                    <td className="p-3">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.active}
                          onChange={() => toggleActive(product._id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white relative"></div>
                      </label>
                    </td>
                    <td className="p-3">
                      {product.dimensions
                        ? `${product.dimensions.width}×${product.dimensions.height}px`
                        : "-"}
                    </td>
                    <td className="p-3">{product.gridSize || "-"}</td>
                    <td className="p-3">{favoriteCount}</td>
                    <td className="p-3 text-xs text-gray-300">
                      {product.createdAt?.split("T")[0]}
                    </td>
                    <td className="p-3 text-xs text-gray-300">
                      {product.updatedAt?.split("T")[0]}
                    </td>
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
      )}

      {selectedMap && (
        <MapDetailModal
          map={selectedMap}
          onClose={() => setSelectedMap(null)}
        />
      )}
    </div>
  );
}
