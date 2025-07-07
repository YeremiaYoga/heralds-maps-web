export default function ProductInfo({ product }) {
  return (
    <div className="w-full md:w-1/3 p-6 rounded-lg bg-black/70 text-white shadow-lg space-y-6">
      <div>
        <h2 className="text-sm font-bold text-center border-b border-gray-600 pb-1 mb-3 uppercase tracking-wide">
          Description
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Quiet, green, and deceptively peaceful, this forest road is a classic
          setting for countless adventures. Whether it’s the start of a long
          journey, the site of a tense standoff, or the perfect place for an
          ambush, this map offers a flexible space for exploration and combat.
          Easy to drop into nearly any campaign, and to return to in different
          seasons.
        </p>
      </div>

      <div>
        <h2 className="text-sm font-bold text-center border-b border-gray-600 pb-1 mb-3 uppercase tracking-wide">
          Info
        </h2>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">Grid tiles</span>
            <span>18 × 22</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Grid size</span>
            <span>140 pixels per tile</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Image dimensions</span>
            <span>2520 × 3080</span>
          </div>
        </div>
      </div>

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

      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200">
        Download Now
      </button>
    </div>
  );
}
