"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const plans = [
  {
    title: "Fantasy Maps",
    image: "/assets/dummy/summer_forest_road.webp",
    price: 25,
    features: [
      "6,000+ high-res battle maps",
      "New releases every week",
      "Each pack includes 20+ variations",
      "New animated map each month",
    ],
  },
  {
    title: "Fantasy Scenes",
    image: "/assets/dummy/desert_ruin.webp",
    price: 25,
    features: [
      "2000+ painted scenes",
      "200+ animated scenes",
      "New releases every week",
      "Each pack comes with 10+ variations",
    ],
  },
  {
    title: "Fantasy Tokens",
    image: "/assets/dummy/magical_store_within_city.webp",
    price: 25,
    features: [
      "400+ customizable tokens",
      "Includes original fantasy frames",
      "New releases every week",
      "Access to Token Builder",
    ],
  },
];

export default function SubscribePage() {
  const router = useRouter();

  const handleSubscribe = (plan) => {
    router.push(`/checkout?plan=${plan}`);
  };

  return (
    <div className="min-h-screen py-12 px-4  text-white">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12">Become a Subscriber</h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-[#1b1e27] rounded-lg overflow-hidden shadow-xl flex flex-col border-2 border-amber-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={plan.image}
                alt={plan.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                  {plan.title}
                </h2>
                <ul className="space-y-2 text-sm text-gray-300">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>✔️</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-lg font-bold mb-3">${plan.price} / month</p>
                <button
                  onClick={() => handleSubscribe(plan.title)}
                  className="w-full py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
