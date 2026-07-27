'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const savings = hasDiscount ? product.originalPrice - product.price : 0;
  const discountPercent = hasDiscount ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <Link href={`/product/${product.sku}`} className="group block">
      <div className="relative glass-card rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
        {hasDiscount && (
          <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse-soft">
            {discountPercent}% OFF
          </div>
        )}
        <div className="relative aspect-video w-full bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={product.previewImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNsaGhoBAAChwEY7k0/gAAAAABJRU5ErkJggg=="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <h3 className="mt-3 text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-extrabold text-blue-700">₹{product.price}</span>
            {hasDiscount && (
              <>
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                <span className="text-[0.6rem] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">Save ₹{savings}</span>
              </>
            )}
          </div>
          <span className="bg-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-semibold group-hover:bg-blue-800 transition-all duration-300 shadow-md group-hover:shadow-lg">
            View
          </span>
        </div>
      </div>
    </Link>
  );
}