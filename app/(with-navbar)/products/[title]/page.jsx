"use client";

import { useParams, notFound, useRouter } from "next/navigation";
import { maps } from "@/data/maps";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import RelatedMaps from "./RelatedMaps";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <main className="min-h-screen text-white px-6 py-10 ">
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        {prevProduct ? (
          <button
            onClick={() => goToProduct(prevProduct)}
            className="flex items-center gap-3 group text-gray-400 hover:text-white transition"
            title="Previous Map"
          >
            <ChevronLeft className="w-5 h-5" />
            <img
              src={prevProduct.image}
              alt={prevProduct.title}
              className="w-20 h-12 object-cover rounded shadow-md border border-gray-600"
            />
            <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px] group-hover:underline">
              {prevProduct.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextProduct && (
          <button
            onClick={() => goToProduct(nextProduct)}
            className="flex items-center gap-3 group text-gray-400 hover:text-white transition"
            title="Next Map"
          >
            <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px] group-hover:underline">
              {nextProduct.title}
            </span>
            <img
              src={nextProduct.image}
              alt={nextProduct.title}
              className="w-20 h-12 object-cover rounded shadow-md border border-gray-600"
            />
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/products")}
            className="text-xl hover:text-gray-400 flex items-center"
            title="Back to Products"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight truncate 0">
            {product.title}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
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
