import { blogPosts } from '@/lib/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Blogs – Vaultizen | Insights on AI, Instagram & Digital Growth',
  description: 'Read expert articles on AI tools, Instagram growth, and how small creators can leverage technology.',
  openGraph: {
    title: 'Blogs – Vaultizen',
    description: 'Actionable insights for creators, marketers, and entrepreneurs.',
    url: 'https://vaultizen.com/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">Blogs</h1>
        <p className="mt-1 text-base text-gray-500 max-w-xl mx-auto">Insights, tips, and strategies for creators.</p>
        <div className="mt-2 w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-44 w-full bg-gray-200">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" unoptimized />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5 flex-wrap">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{post.title}</h2>
              <p className="text-gray-600 mt-1.5 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
              <span className="inline-block mt-3 text-blue-600 font-semibold text-sm group-hover:underline">Read More →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center bg-gray-50 rounded-xl p-6 border border-gray-200 animate-fade-in-up">
        <h3 className="text-lg font-bold text-gray-700">Full Articles Coming Soon</h3>
        <p className="text-gray-500 text-sm mt-1">We're curating in‑depth guides for each topic. Stay tuned!</p>
      </div>
    </div>
  );
}