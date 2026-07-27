'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { products } from '@/lib/products';

export default function Header() {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith('/product/');
  const [scrolled, setScrolled] = useState(false);

  // Extract product name from URL slug
  let productName = '';
  if (isProductPage) {
    const slug = pathname.split('/').pop();
    const product = products.find((p) => p.sku === slug);
    if (product) productName = product.name;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tickerText = "Limited Time Offer – Grab this deal before it ends! Up to 70% off on all digital packs • ";

  const AnnouncementBar = () => (
    <div className="bg-blue-900 text-white overflow-hidden whitespace-nowrap py-2 text-sm md:text-base font-semibold shadow-md border-b border-blue-700/50">
      <div className="inline-block animate-marquee">{tickerText.repeat(8)}</div>
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200/30'
      }`}
    >
      {isProductPage && <AnnouncementBar />}
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              alt="Vaultizen"
              width={300}
              height={80}
              className="h-10 w-auto md:h-14 lg:h-16 drop-shadow-sm"
              priority
            />
          </Link>
          {/* Product name – refined, classy, professional */}
          {isProductPage && productName && (
            <>
              <span className="hidden sm:inline text-gray-300 text-2xl font-light">|</span>
              <span className="hidden sm:inline bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent text-base md:text-xl font-semibold tracking-wide truncate max-w-[200px] md:max-w-xs">
                {productName}
              </span>
            </>
          )}
        </div>

        {!isProductPage && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-blue-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-700 after:transition-all hover:after:w-full">Home</Link>
            <Link href="/#products" className="text-gray-600 hover:text-blue-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-700 after:transition-all hover:after:w-full">Products</Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-700 after:transition-all hover:after:w-full">Blogs</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-700 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-700 after:transition-all hover:after:w-full">About</Link>
          </nav>
        )}

        {!isProductPage && (
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </header>
  );
}