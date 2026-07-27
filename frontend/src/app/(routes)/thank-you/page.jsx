import Link from 'next/link';
import { products } from '@/lib/products';

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold text-green-600">🎉 Thank You!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your order is confirmed. Check your email for the download link.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        (If you don’t see it, check your spam folder.)
      </p>

      {/* Upsell section */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold">Ready for more?</h2>
        <p className="text-gray-600">Upgrade to our Ultimate Bundle at 50% off – only for today!</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products
            .filter((p) => p.price > 500)
            .map((p) => (
              <div key={p.sku} className="border rounded-xl p-4 bg-gray-50">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-sm text-gray-600">₹{p.price}</p>
                <Link
                  href={`/product/${p.sku}`}
                  className="inline-block mt-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Get Upsell
                </Link>
              </div>
            ))}
        </div>
      </div>

      <Link href="/" className="inline-block mt-8 text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  );
}