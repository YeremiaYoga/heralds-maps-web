import { useMemo } from "react";

const maps = [
  {
    title: "Summer Forest Road Map",
    image: "/assets/dummy/summer_forest_road.webp",
    original: 9.99,
  },
  {
    title: "Desert Ruin Map",
    image: "/assets/dummy/desert_ruin.webp",
    original: 24.99,
  },
  {
    title: "Ruin Building within Swamp",
    image: "/assets/dummy/ruin_building_within_swamp.webp",
    original: 14.99,
  },
  {
    title: "Forest with a Small Lake",
    image: "/assets/dummy/forest_with_a_small_lake.webp",
    original: 19.99,
  },
  {
    title: "Magical Store within City",
    image: "/assets/dummy/magical_store_within_city.webp",
    original: 4.99,
  },
  {
    title:
      "Greek Style City Center with a Fountain as Middle Part Top Version 1",
    image:
      "/assets/dummy/greek_style_city_center_with_a_fountain_as_middle_part_top_version_1.webp",
    original: 39.99,
  },
];

// Format number to USD
function formatUSD(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export default function DiscountSection() {
  const selected = useMemo(() => {
    const shuffled = [...maps].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map((map) => {
      const discountPercent = Math.floor(Math.random() * 11) + 80; // 80-90%
      const price = (map.original * (1 - discountPercent / 100)).toFixed(2);
      return {
        ...map,
        discount: `-${discountPercent}%`,
        price: parseFloat(price),
      };
    });
  }, []);

  return (
    <div className="bg-[#5c2553] text-white px-8 py-6 mt-8 rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">New Release</h2>
          <p className="text-sm text-gray-200">
            Great deals on top maps this week
          </p>
        </div>
        <button className="bg-white text-[#5c2553] px-4 py-2 rounded font-semibold hover:brightness-95 transition">
          SEE ALL
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {selected.map((map, index) => (
          <div
            key={index}
            className="relative bg-[#1b2838] rounded overflow-hidden shadow-md hover:scale-[1.02] transition-transform duration-200"
          >
            <img
              src={map.image}
              alt={map.title}
              className="w-full h-40 object-cover"
            />

            <div className="absolute top-1 left-1 space-y-1">
              {map.free && (
                <div className="relative w-12">
                  <img
                    src="/assets/bubble_free.webp"
                    alt="Free"
                    className="w-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    FREE
                  </span>
                </div>
              )}

              {!map.free && map.discount && (
                <div className="relative w-12">
                  <img
                    src="/assets/bubble_discount.webp"
                    alt="Discount"
                    className="w-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                    {map.discount}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
