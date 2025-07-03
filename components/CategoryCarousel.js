const categories = [
  { title: "FOREST", img: "/assets/dummy/spring_forest_road.webp" },
  { title: "RUINS", img: "/assets/dummy/desert_ruin.webp" },
  { title: "VILLAGE", img: "/assets/dummy/a_small_village_bottom_version_2.webp" },
  { title: "CITY", img: "/assets/dummy/apartment_within_city.webp" },
];

export default function CategoryCarousel() {
  return (
    <div className="px-8 py-6">
      <h2 className="text-white text-xl font-bold mb-4">Browse by Category</h2>
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="min-w-[260px] h-[180px] rounded-lg overflow-hidden relative snap-start cursor-pointer group"
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 via-orange-500/50 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="bg-white text-black font-bold px-3 py-1 text-sm rounded">
                {cat.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
