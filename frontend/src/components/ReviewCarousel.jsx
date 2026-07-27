'use client';

import { useState, useEffect, useRef } from 'react';

const renderStars = (rating) => {
  const full = '★'.repeat(rating);
  const empty = '☆'.repeat(5 - rating);
  return full + empty;
};

export default function ReviewCarousel({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="text-center text-gray-500 py-6">No reviews yet. Be the first!</div>;
  }

  // Always show 2 per slide on tablet/desktop, 1 on mobile (<640px)
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return 1;
    return 2;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const updateItems = () => setItemsPerSlide(getItemsPerSlide());
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const totalSlides = Math.ceil(reviews.length / itemsPerSlide);

  useEffect(() => {
    if (currentIndex >= totalSlides) setCurrentIndex(0);
  }, [totalSlides, currentIndex]);

  // Auto‑slide: 8 seconds
  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (totalSlides <= 1) return;
    autoPlayRef.current = setInterval(() => {
      if (!isTransitioning) {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    }, 8000);
    return () => clearInterval(autoPlayRef.current);
  }, [totalSlides, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goPrev = () => {
    if (isTransitioning) return;
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goNext = () => {
    if (isTransitioning) return;
    goToSlide((currentIndex + 1) % totalSlides);
  };

  // Width of the track = 100% * number of items / itemsPerSlide
  const trackWidth = reviews.length * (100 / itemsPerSlide);
  const translateX = -currentIndex * (100 / itemsPerSlide);

  const colorClasses = [
    'bg-gradient-to-br from-blue-500 to-indigo-600',
    'bg-gradient-to-br from-purple-500 to-pink-600',
    'bg-gradient-to-br from-green-500 to-teal-600',
    'bg-gradient-to-br from-amber-500 to-orange-600',
    'bg-gradient-to-br from-rose-500 to-red-600',
    'bg-gradient-to-br from-cyan-500 to-blue-600',
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Sliding track – no 3D */}
        <div
          className="flex transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform"
          style={{
            width: `${trackWidth}%`,
            transform: `translateX(${translateX}%)`,
            transition: isTransitioning
              ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : 'none',
          }}
        >
          {reviews.map((review, idx) => {
            const initials = review.name.split(' ').map(w => w[0]).join('').toUpperCase();
            const color = colorClasses[idx % colorClasses.length];
            return (
              <div
                key={idx}
                className="flex-shrink-0 px-2"
                style={{ flex: `0 0 ${100 / itemsPerSlide}%` }}
              >
                <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  {/* Avatar + Name + Rating */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-base ${color} shadow-md flex-shrink-0`}>
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-base truncate">{review.name}</p>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="tracking-wide text-amber-400 text-base">{renderStars(review.rating)}</span>
                        <span className="text-gray-400 font-medium">({review.rating}/5)</span>
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <blockquote className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed flex-1 italic">
                    “{review.comment}”
                  </blockquote>

                  {/* Badges */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.65rem] font-semibold">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">✓ Verified</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">★ Featured</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      {totalSlides > 1 && (
        <div className="flex flex-col items-center gap-3 mt-6">
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isTransitioning}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 w-8 h-2'
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={goPrev}
              disabled={isTransitioning}
              className="bg-white border border-gray-200 shadow-md rounded-full w-11 h-11 flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium text-gray-400 bg-white/80 px-4 py-1 rounded-full shadow-sm border border-gray-200/50">
              {currentIndex + 1} / {totalSlides}
            </span>
            <button
              onClick={goNext}
              disabled={isTransitioning}
              className="bg-white border border-gray-200 shadow-md rounded-full w-11 h-11 flex items-center justify-center hover:bg-gray-50 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <svg className="w-5 h-5 text-gray-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}