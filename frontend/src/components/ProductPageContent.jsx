'use client';

import Image from 'next/image';
import { useState, useEffect, lazy, Suspense, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const ReviewCarousel = dynamic(
  () => import('@/components/ReviewCarousel'),
  { ssr: false, loading: () => <div className="text-center text-gray-400 py-8">Loading reviews...</div> }
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    const expiry = Date.now() + 30 * 60 * 1000;
    const interval = setInterval(() => {
      const distance = expiry - Date.now();
      if (distance < 0) { setTimeLeft('Expired'); clearInterval(interval); return; }
      const m = String(Math.floor((distance / 60000))).padStart(2, '0');
      const s = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
      setTimeLeft(`${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-3 p-2.5 rounded-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-gray-200/60 shadow-sm flex items-center justify-center gap-3 transition-all hover:shadow-md">
      <span className="text-gray-600 text-sm font-medium tracking-wide flex items-center gap-1.5">
        <span className="text-base">⏱️</span> Offer ends in
      </span>
      <span className="text-2xl font-mono font-bold text-amber-600 tracking-wider animate-pulse-soft">
        {timeLeft}
      </span>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button className="w-full flex items-center justify-between py-2.5 text-left font-medium text-gray-800 hover:text-blue-700 transition-colors" onClick={() => setIsOpen(!isOpen)}>
        <span className="text-sm md:text-base">{question}</span>
        <span className="text-lg font-light text-blue-600 bg-blue-50 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 transform" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      {isOpen && <div className="pb-3 text-gray-600 text-sm md:text-base leading-relaxed pr-4">{answer}</div>}
    </div>
  );
};

const GlossyBuyButton = ({ product, className = '', large = false, href = null }) => {
  if (href) {
    return (
      <a
        href={href}
        className={`relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-4 overflow-hidden group ${
          large ? 'py-5 px-8 rounded-2xl text-xl md:text-2xl' : 'py-3 px-6 rounded-xl text-base md:text-lg'
        } ${className}`}
      >
        <span>Buy Now</span>
        <span className={`font-extrabold text-amber-200 ${large ? 'text-3xl md:text-4xl' : 'text-xl'}`}>₹{product.price}</span>
        {product.originalPrice && (
          <span className={`text-white/60 line-through ${large ? 'text-base' : 'text-xs'}`}>₹{product.originalPrice}</span>
        )}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </a>
    );
  }

  return (
    <form action="https://superprofile.in/checkout" method="POST" className={className}>
      <input type="hidden" name="product_id" value={product.sku} />
      <input type="hidden" name="amount" value={product.price} />
      <input type="hidden" name="currency" value="INR" />
      <input type="hidden" name="success_url" value={`${process.env.NEXT_PUBLIC_SITE_URL}/thank-you`} />
      <input type="hidden" name="cancel_url" value={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${product.sku}`} />
      <button
        type="submit"
        className={`relative w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-4 overflow-hidden group ${
          large ? 'py-5 px-8 rounded-2xl text-xl md:text-2xl' : 'py-3 px-6 rounded-xl text-base md:text-lg'
        }`}
      >
        <span>Buy Now</span>
        <span className={`font-extrabold text-amber-200 ${large ? 'text-3xl md:text-4xl' : 'text-xl'}`}>₹{product.price}</span>
        {product.originalPrice && (
          <span className={`text-white/60 line-through ${large ? 'text-base' : 'text-xs'}`}>₹{product.originalPrice}</span>
        )}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>
  );
};

export default function ProductPageContent({ product }) {
  const [videoSrc, setVideoSrc] = useState('');
  const [mainImageSrc, setMainImageSrc] = useState('');
  const [extraImages, setExtraImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  const [buyLink, setBuyLink] = useState(null);
  const [buyLinkLoading, setBuyLinkLoading] = useState(true);

  useEffect(() => {
    const fetchBuyLink = async () => {
      try {
        const res = await fetch(`/api/buy-link/${product.sku}`);
        if (res.ok) {
          const data = await res.json();
          setBuyLink(data.buyLink);
        } else {
          setBuyLink(product.buyLink || null);
        }
      } catch {
        setBuyLink(product.buyLink || null);
      } finally {
        setBuyLinkLoading(false);
      }
    };
    fetchBuyLink();
  }, [product.sku, product.buyLink]);

  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const previewSection = document.getElementById('product-preview');
      if (previewSection) {
        const rect = previewSection.getBoundingClientRect();
        setShowSticky(rect.top < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const allImages = [mainImageSrc, ...extraImages].filter(Boolean);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };
  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  const handleLightboxClick = (e) => {
    if (e.target.closest('.close-btn') || e.target.closest('.counter')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 2) goPrev();
    else goNext();
  };

  // Asset token fetch
  useEffect(() => {
    const fetchAssetToken = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
          console.error('NEXT_PUBLIC_BACKEND_URL is not set');
          setLoading(false);
          return;
        }

        const tokenRes = await fetch(`${backendUrl}/asset-token/${product.sku}`);
        if (!tokenRes.ok) throw new Error('Token fetch failed');
        const tokenData = await tokenRes.json();
        const token = tokenData.token;
        const baseUrl = `${backendUrl}/asset/${product.sku}`;

        setVideoSrc(`${baseUrl}/video?token=${token}`);
        setMainImageSrc(`${baseUrl}/image?token=${token}`);

        const extra = [];
        for (let i = 1; i <= 6; i++) {
          extra.push(`${baseUrl}/image${i}?token=${token}`);
        }
        setExtraImages(extra);
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch asset token', e);
        setVideoSrc(product.video);
        setMainImageSrc(product.previewImage);
        setExtraImages(Array(6).fill('/images/placeholder.png'));
        setLoading(false);
      }
    };
    fetchAssetToken();
  }, [product.sku]);

  const handleVideoContextMenu = (e) => e.preventDefault();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 relative z-10">
          {/* Video */}
          <div className="md:col-span-3 bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-0">
            <div className="w-full aspect-video">
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                autoPlay
                loop
                muted
                preload="metadata"
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={handleVideoContextMenu}
                className="w-full h-full object-cover"
                poster={mainImageSrc}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Product Info */}
          <div className="md:col-span-2 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">🔥 Best Seller</span>
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">94% OFF</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                  {product.name}
                </span>
                <span className="block text-sm md:text-base font-medium text-gray-500 mt-1.5 relative">
                  {product.tagline}
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-60" />
                </span>
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-600 leading-relaxed">{product.description}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 bg-gray-50/80 rounded-lg px-2.5 py-1 border border-gray-100">
                    <span className="text-green-500 text-base">✔</span> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-3 p-3 rounded-xl bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-gray-200/60 shadow-sm">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-3xl md:text-4xl font-extrabold text-blue-700">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-base md:text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Save ₹{product.originalPrice - product.price}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Instant download • 24‑hour link • Secure checkout</p>
              </div>
            </div>
            <div>
              <CountdownTimer />
              {!buyLinkLoading ? (
                <GlossyBuyButton product={product} className="mt-3" href={buyLink} />
              ) : (
                <div className="mt-3 h-12 rounded-xl bg-gray-200 animate-pulse" />
              )}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-600">
                <span className="flex items-center gap-1.5 bg-gray-100/80 px-3 py-1 rounded-full border border-gray-200/50 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  <span>Instant</span>
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100/80 px-3 py-1 rounded-full border border-gray-200/50 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 1 0 0-8c-2 0-4 1.33-6 4z" />
                  </svg>
                  <span>Lifetime</span>
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100/80 px-3 py-1 rounded-full border border-gray-200/50 shadow-sm">
                  <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span>Secure</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Preview Grid */}
      <div id="product-preview" className="p-6 border-t border-gray-200">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 w-1 h-6 rounded-full" />
          What You'll Get
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {extraImages.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                src={src}
                alt={`${product.name} preview ${idx + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 33vw"
                loading="lazy"
                unoptimized
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="p-6 border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 md:p-6">
            {product.faqs.map((faq, idx) => <FAQItem key={idx} question={faq.q} answer={faq.a} />)}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Customer Reviews</h2>
        <Suspense fallback={<div className="text-center text-gray-400 py-8">Loading reviews...</div>}>
          <ReviewCarousel reviews={product.reviews} />
        </Suspense>
      </div>

      {/* Big CTA */}
      <div className="p-6 md:p-10 border-t border-gray-200 bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #93c5fd 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm mb-4">
            <span className="text-yellow-400 text-sm">★</span> 4.9/5 from 500+ customers
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-2 text-gray-600 text-sm md:text-base max-w-lg mx-auto">
            Join thousands of happy customers. Get instant access to <strong className="text-blue-700">{product.name}</strong>.
          </p>

          <div className="mt-5 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-lg md:text-xl font-bold bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-gray-200/60">
              <span className="text-blue-700">₹{product.price}</span>
              <span className="text-gray-400 line-through">₹{product.originalPrice}</span>
              <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-bold">Save ₹{product.originalPrice - product.price}</span>
            </div>
            {!buyLinkLoading ? (
              <GlossyBuyButton product={product} large className="max-w-sm w-full" href={buyLink} />
            ) : (
              <div className="h-16 w-full max-w-sm rounded-2xl bg-gray-200 animate-pulse" />
            )}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 mt-1">
              <span className="flex items-center gap-1">⚡ Instant download</span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="flex items-center gap-1">🔒 24‑hour secure link</span>
              <span className="w-px h-3 bg-gray-300" />
              <span className="flex items-center gap-1">💳 Secure checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky button */}
      <div
        className={`fixed bottom-0 left-0 w-full p-3 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-2xl transition-transform duration-500 z-50 ${
          showSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
            <span className="font-bold text-gray-800">{product.name}</span>
            <span className="line-through text-gray-400">₹{product.originalPrice}</span>
            <span className="text-blue-600 font-bold">₹{product.price}</span>
          </div>
          {!buyLinkLoading ? (
            <GlossyBuyButton product={product} className="flex-1 max-w-sm ml-auto" href={buyLink} />
          ) : (
            <div className="flex-1 max-w-sm ml-auto h-12 rounded-xl bg-gray-200 animate-pulse" />
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={handleLightboxClick}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="close-btn absolute top-4 right-4 md:top-8 md:right-8 text-white text-3xl md:text-4xl font-light hover:scale-110 transition z-10"
          >
            ✕
          </button>
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
            <Image
              src={allImages[lightboxIndex]}
              alt={`Product preview ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
          </div>
          <div className="absolute left-4 text-white/30 text-5xl md:text-6xl hidden md:block pointer-events-none">‹</div>
          <div className="absolute right-4 text-white/30 text-5xl md:text-6xl hidden md:block pointer-events-none">›</div>
          <div className="counter absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light bg-black/40 px-4 py-1 rounded-full pointer-events-none">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}