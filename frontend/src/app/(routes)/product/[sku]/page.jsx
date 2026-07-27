import { products } from '@/lib/products';
import ProductPageContent from '@/components/ProductPageContent';
import { notFound } from 'next/navigation';

// ✅ Generate static paths for all product SKUs (pre‑renders at build time)
export function generateStaticParams() {
  return products.map((product) => ({
    sku: product.sku,
  }));
}

// ✅ Generate dynamic metadata for SEO
export function generateMetadata({ params }) {
  const product = products.find((p) => p.sku === params.sku);
  if (!product) return {};

  return {
    title: `${product.name} – ₹${product.price} | Vaultizen`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [`${process.env.NEXT_PUBLIC_SITE_URL}${product.previewImage}`],
    },
  };
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.sku === params.sku);
  if (!product) notFound();

  // Render the client component with the product data
  return <ProductPageContent product={product} />;
}