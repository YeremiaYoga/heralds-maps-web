"use client";

const maps = [
  {
    title: "Summer Forest Road Map",
    image: "/assets/dummy/summer_forest_road.webp",
    discount: "-33%",
    original: 13.59,
    price: 9.11,
    categories: ["Forest", "Road"],
  },
  {
    title: "Desert Ruin Map",
    image: "/assets/dummy/desert_ruin.webp",
    discount: "-20%",
    original: 49.99,
    price: 39.99,
    categories: ["Desert", "Ruins"],
  },
  {
    title: "Ruin Building within Swamp",
    image: "/assets/dummy/ruin_building_within_swamp.webp",
    discount: "-45%",
    original: 20.69,
    price: 11.38,
    categories: ["Swamp", "Ruins"],
  },
  {
    title: "A Japanese City with the Adventurers Guild Japanese Style Preview",
    image: "/assets/dummy/a_japanese_city_with_the_adventurers_guild_japanese_style_preview.webp",
    discount: "-70%",
    original: 42.0,
    price: 12.6,
    categories: ["City", "Japanese", "Guild"],
  },
  {
    title: "Forest with a Small Lake",
    image: "/assets/dummy/forest_with_a_small_lake.webp",
    discount: "-50%",
    original: 28.49,
    price: 14.25,
    live: true,
    categories: ["Forest", "Lake"],
  },
  {
    title: "Magical Store within City",
    image: "/assets/dummy/magical_store_within_city.webp",
    price: 0,
    free: true,
    categories: ["City", "Store", "Magic"],
  },
  {
    title: "A Beach Without any Structure",
    image: "/assets/dummy/a_beach_without_any_structure.webp",
    discount: "-20%",
    original: 20.69,
    price: 16.56,
    categories: ["Beach", "Open"],
  },
  {
    title: "Greek Style City Center with a Fountain as Middle Part Top Version 1",
    image: "/assets/dummy/greek_style_city_center_with_a_fountain_as_middle_part_top_version_1.webp",
    price: 0,
    free: true,
    categories: ["City", "Greek", "Fountain"],
  },
  {
    title: "Spring Forest Road Map",
    image: "/assets/dummy/spring_forest_road.webp",
    discount: "-30%",
    original: 16.9,
    price: 11.83,
    categories: ["Forest", "Spring", "Road"],
  },
  {
    title: "A Small Village Top Version 2",
    image: "/assets/dummy/a_small_village_top_version_2.webp",
    discount: "-50%",
    original: 11.59,
    price: 5.79,
    categories: ["Village", "Top View"],
  },
  {
    title: "Forest Opening",
    image: "/assets/dummy/forest_opening.webp",
    discount: "-15%",
    original: 13.09,
    price: 11.13,
    live: true,
    categories: ["Forest", "Clearing"],
  },
  {
    title: "Church within Forest",
    image: "/assets/dummy/church_within_forest.webp",
    price: 0,
    free: true,
    categories: ["Church", "Forest"],
  },
];


export default function MapsGrid() {
  return (
    <div className="px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-r from-[#FFD700]/20 to-[#1b2838] shadow-lg rounded overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            <div className="relative">
              <img
                src={map.image}
                alt={map.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-1 left-1 space-y-1">
                {map.free && (
                  <div className="relative w-14">
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
                  <div className="relative w-14">
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

            <div className="p-4 text-white flex flex-col justify-between space-y-2 min-h-[90px]">
              <h3 className="font-semibold text-sm text-[#cfcfcf]">{map.title}</h3>

              {/* CATEGORY BUBBLES */}
              {map.categories && map.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {map.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-blue-800/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}