import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-amber-400/10 pt-10 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image src="/logo.png" alt="Vaultizen" width={160} height={44} className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 mt-2 max-w-xs leading-relaxed">
              Digital Resources. Real Results. – Empowering creators with affordable AI tools.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Legal</h4>
            <ul className="text-sm space-y-1.5">
              <li><Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-amber-400 transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/disclaimer" className="hover:text-amber-400 transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Company</h4>
            <ul className="text-sm space-y-1.5">
              <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-amber-400 transition-colors">Contact</Link></li>
            </ul>
            <div className="flex gap-3 mt-3">
              <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-110 hover:shadow-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-110 hover:shadow-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M19.5 4l-6.768 6.768"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all hover:scale-110 hover:shadow-glow">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-8 pt-4 border-t border-gray-800 text-gray-500">
          © {new Date().getFullYear()} Vaultizen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}