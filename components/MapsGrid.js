const games = [
  {
    title: "Summer Forest Road Map",
    image: "/assets/dummy/summer_forest_road.webp",
    discount: "-33%",
    original: "Rp 135 999",
    price: "Rp 91 119",
  },
  {
    title: "Desert Ruin Map",
    image: "/assets/dummy/desert_ruin.webp",
    discount: "-20%",
    original: "Rp 499 999",
    price: "Rp 399 999",
  },
  {
    title: "Ruin Building within Swamp",
    image: "/assets/dummy/ruin_building_within_swamp.webp",
    discount: "-45%",
    original: "Rp 206 999",
    price: "Rp 113 849",
  },
  {
    title: "A Japanese City with the Adventurers Guild Japanese Style Preview",
    image: "/assets/dummy/a_japanese_city_with_the_adventurers_guild_japanese_style_preview.webp",
    discount: "-70%",
    original: "Rp 420 000",
    price: "Rp 126 000",
  },
  {
    title: "Forest with a Small Lake",
    image: "/assets/dummy/forest_with_a_small_lake.webp",
    discount: "-50%",
    original: "Rp 284 999",
    price: "Rp 142 499",
    live: true,
  },
  {
    title: "Magical Store within City",
    image: "/assets/dummy/magical_store_within_city.webp",
    discount: "-25%",
    original: "Rp 44 999",
    price: "Rp 33 749",
    free: true,
  },
  {
    title: "A Beach Without any Structure",
    image: "/assets/dummy/a_beach_without_any_structure.webp",
    discount: "-20%",
    original: "Rp 206 999",
    price: "Rp 165 599",
  },
  {
    title: "Greek Style City Center with a Fountain as Middle Part Top Version 1",
    image: "/assets/dummy/greek_style_city_center_with_a_fountain_as_middle_part_top_version_1.webp",
    discount: "-70%",
    original: "Rp 549 000",
    price: "Rp 164 700",
    free: true,
  },
  {
    title: "Spring Forest Road Map",
    image: "/assets/dummy/spring_forest_road.webp",
    discount: "-30%",
    original: "Rp 169 000",
    price: "Rp 118 300",
  },
  {
    title: "A Small Village Top Version 2",
    image: "/assets/dummy/a_small_village_top_version_2.webp",
    discount: "-50%",
    original: "Rp 115 999",
    price: "Rp 57 999",
  },
  {
    title: "Forest Opening",
    image: "/assets/dummy/forest_opening.webp",
    discount: "-15%",
    original: "Rp 130 999",
    price: "Rp 111 349",
    live: true,
  },
  {
    title: "Church within Forest",
    image: "/assets/dummy/church_within_forest.webp",
    price: "Rp 142 499",
    free: true,
  },
];


export default function MapsGrid() {
  return (
    <div className="px-8 py-8 bg-[#1b2838]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, idx) => (
          <div
            key={idx}
            className="bg-[#2a475e] shadow-md rounded overflow-hidden hover:scale-[1.02] transition-transform duration-200"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 text-white space-y-1">
              <h3 className="font-semibold text-sm">{game.title}</h3>

              {game.free ? (
                <span className="inline-block bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                  FREE
                </span>
              ) : game.discount ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-green-500 text-black px-2 text-xs rounded">
                    {game.discount}
                  </span>
                  <span className="text-xs line-through text-gray-300">
                    {game.original}
                  </span>
                  <span className="text-sm font-bold">{game.price}</span>
                </div>
              ) : (
                <div className="text-sm font-bold">{game.price}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
