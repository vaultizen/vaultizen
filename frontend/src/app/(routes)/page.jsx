import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <>
      {/* Hero – pure CSS, no heavy images */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-indigo-900 to-slate-900 text-white p-8 md:p-12 mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-400/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] bg-center opacity-20" />

        <div className="relative z-10 max-w-2xl mx-auto text-center stagger-children">
          <span className="inline-block bg-white/10 backdrop-blur-sm text-white/90 text-[0.6rem] font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-white/20">
            ✦ Exclusive Collection
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight mt-3">
            AI Tools &amp; Templates
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400 text-3xl sm:text-4xl md:text-5xl mt-1">
              From ₹25
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-blue-100/80 max-w-md mx-auto leading-relaxed font-light">
            High‑quality prompts and captions, crafted to elevate your content.<br className="hidden sm:block" />
            Instant delivery, zero complexity.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link href="#products" className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-amber-400/30 hover:scale-105 transition-all duration-300">
              Explore Now →
            </Link>
            <Link href="/about" className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-6 py-2.5 rounded-full font-medium text-sm hover:bg-white/20 transition-all">
              Our Story
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/70">
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> 500+ happy
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> 50+ curated
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> 4.9★ average
            </span>
          </div>
        </div>
      </section>

      {/* Product Grid – fast lazy loading */}
      <section id="products" className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Premium Content Packs
          </h2>
          <p className="mt-1 text-base text-gray-500 max-w-xl mx-auto">
            Curated digital resources to accelerate your content creation.
          </p>
          <div className="mt-2 w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>

      {/* Bundle Promo */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 text-center mb-12 shadow-sm border border-white/50">
        <h3 className="text-xl font-bold text-gray-800">Ready to level up?</h3>
        <p className="text-gray-600 mt-1 max-w-md mx-auto text-sm">
          Grab our <span className="font-semibold text-blue-700">Ultimate AI Bundle</span> and get 400+ resources at an unbeatable price.
        </p>
        <Link
          href="/product/ultimate-ai-bundle-400"
          className="inline-block mt-3 bg-blue-700 text-white px-7 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-800 transition hover:scale-105 shadow-md"
        >
          View Bundle →
        </Link>
      </section>
    </>
  );
}