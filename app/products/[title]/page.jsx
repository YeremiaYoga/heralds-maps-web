"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { maps } from "@/data/maps";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import RelatedMaps from "./RelatedMaps";

import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const title = decodeURIComponent(params.title);
  const index = maps.findIndex((map) => map.title === title);
  const product = maps[index];

  if (!product) return notFound();

  const prevProduct = maps[index - 1];
  const nextProduct = maps[index + 1];

  const goToProduct = (map) => {
    if (map) {
      router.push(`/products/${encodeURIComponent(map.title)}`);
    }
  };

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.push("/products")}
            className="text-xl hover:text-gray-400 flex items-center"
            title="Back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold truncate">
            {product.title}
          </h1>
        </div>

        <div className="absolute top-0 right-0 mt-2 mr-2 flex gap-4 z-10">
          {prevProduct && (
            <button
              onClick={() => goToProduct(prevProduct)}
              className="flex items-center gap-2 hover:text-white text-gray-300 text-sm"
              title="Previous"
            >
              <ArrowLeft className="w-5 h-5" />
              <img
                src={prevProduct.image}
                alt={prevProduct.title}
                className="w-20 h-12 object-cover rounded shadow"
              />
            </button>
          )}

          {nextProduct && (
            <button
              onClick={() => goToProduct(nextProduct)}
              className="flex items-center gap-2 hover:text-white text-gray-300 text-sm"
              title="Next"
            >
              <img
                src={nextProduct.image}
                alt={nextProduct.title}
                className="w-20 h-12 object-cover rounded shadow"
              />
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-10 mt-6">
          <ProductImages product={product} />
          <ProductInfo product={product} />
        </div>
        <RelatedMaps
          currentTitle={product.title}
          categories={product.categories}
        />
      </div>
    </main>
  );
}
