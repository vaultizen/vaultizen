import { blogPosts } from '@/lib/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} – Vaultizen Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 animate-fade-in-up">
      <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-5 text-sm">← Back to Blogs</Link>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium text-xs">{post.category}</span>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">{post.title}</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl">{post.excerpt}</p>
      </div>
      <div className="relative w-full aspect-video bg-gray-200 rounded-2xl overflow-hidden mb-8">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1200px" unoptimized />
      </div>
      <div className="prose prose-lg prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-10 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">Published on {post.date} • Category: {post.category}</p>
        <Link href="/blog" className="inline-block mt-3 text-blue-600 hover:underline font-medium text-sm">← Read more articles</Link>
      </div>
    </article>
  );
}