"use client";

import { useRef, useState } from "react";

export default function HomeManager() {
  const fileInputRef = useRef(null);
  const [banner, setBanner] = useState(
    "/assets/dummy/a_japanese_temple_version_3.webp"
  ); // default image
  const [preview, setPreview] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (preview) {
      setBanner(preview);
      setPreview("");
      alert("Banner has been updated (mock save).");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Homepage Banner</h2>

      <div className="relative w-full h-[180px] rounded overflow-hidden border border-gray-700">
        <img
          src={preview || banner}
          alt="Homepage Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center gap-4">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUploadClick}
          className="px-4 py-2 bg-[#FFD700] text-black rounded font-semibold hover:brightness-95 transition"
        >
          Change Image
        </button>
        {preview && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 rounded font-semibold hover:bg-green-700 transition"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}
