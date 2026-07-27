'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function LogoIntro() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('vaultizenIntroShown');
    if (hasSeen) {
      setVisible(false);
      return;
    }

    const fadeTimer = setTimeout(() => setFadeOut(true), 2600);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem('vaultizenIntroShown', 'true');
    }, 3100);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/60 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-50/40 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Logo with animation */}
        <div className="relative w-64 h-28 md:w-80 md:h-32 lg:w-96 lg:h-40 animate-logo">
          <Image
            src="/logo.png"
            alt="Vaultizen"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>

        {/* Small loading spinner below logo */}
        <div className="mt-6">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </div>

      {/* Self-contained animations */}
      <style jsx>{`
        @keyframes logo {
          0% {
            opacity: 0;
            transform: perspective(800px) rotateX(20deg) rotateY(-15deg) scale(0.6) translateY(40px);
            filter: blur(8px);
          }
          60% {
            transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1.05) translateY(-5px);
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: perspective(800px) rotateX(0deg) rotateY(0deg) scale(1) translateY(0);
            filter: blur(0);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        .animate-logo {
          animation: logo 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}