import { useMemo } from "react";
import { maps } from "@/data/maps";

export default function DiscountSection() {
  // Ambil 3 maps bertipe subscribe secara acak
  const selected = useMemo(() => {
    const subscribeMaps = maps.filter((map) => map.type === "subscribe");
    const shuffled = [...subscribeMaps].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, []);

  return (
    <div className="bg-[#5c2553] text-white px-8 py-6 mt-8 rounded-md shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">New Release</h2>
          <p className="text-sm text-gray-200">
            Exclusive maps available for subscribers
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

            <div className="absolute top-1 left-1">
              <div className="relative w-12">
                <img
                  src="/assets/bubble_subscribe.webp"
                  alt="Subscribe"
                  className="w-full"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                  Subscribe
                </span>
              </div>
            </div>

          
          </div>
        ))}
      </div>
    </div>
  );
}
