import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LogoIntro from '@/components/LogoIntro';

export const metadata = {
  title: 'Vaultizen – Digital Resources. Real Results.',
  description: 'AI prompts, social media templates & more – starting at ₹25.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="dns-prefetch" href="https://picsum.photos" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-gray-50 antialiased">
        <LogoIntro />
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}