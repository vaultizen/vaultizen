import { productReviews } from './reviews';

export const products = [
  {
    sku: 'insta-captions-5',
    name: 'InstaCaption 5‑Pack',
    price: 25,
    originalPrice: 499,
    description: 'Boost engagement with 5 proven caption hooks.',
    tagline: '5 ready‑to‑use AI captions – only ₹25',
    previewImage: '/products/insta-captions-5/saved.png', // ✅ using saved.png
    video: '/products/insta-captions-5/video.mp4',
    features: ['5 unique captions', 'Editable TXT', 'Instant download'],
    faqs: [
      { q: 'How do I use these captions?', a: 'Copy any hook from the TXT file, paste it into your Instagram post, and add your specific content.' },
      { q: 'Can I edit the captions?', a: 'Yes – all files are in editable TXT format.' },
      { q: 'Are these captions unique?', a: 'Absolutely – AI‑generated and hand‑reviewed.' },
    ],
    reviews: productReviews['insta-captions-5'],
  },
  {
    sku: 'ai-prompts-15',
    name: 'AI Prompt 15‑Pack',
    price: 49,
    originalPrice: 999,
    description: '15 high‑converting AI prompts for marketers.',
    tagline: 'Generate content faster – ₹49',
    previewImage: '/products/ai-prompts-15/saved.png', // ✅ using saved.png
    video: '/products/ai-prompts-15/video.mp4',
    features: ['15 AI prompts', 'Works with ChatGPT', 'Instant download'],
    faqs: [
      { q: 'Can I use these prompts with other AI tools?', a: 'Yes – they work with ChatGPT, Claude, Gemini, and more.' },
      { q: 'Are the prompts reusable?', a: 'Absolutely – use them as many times as you like.' },
      { q: 'What kind of prompts are included?', a: 'Social media, blog ideas, email copy, and creative writing.' },
    ],
    reviews: productReviews['ai-prompts-15'],
  },
  {
    sku: 'content-kit-50',
    name: 'Content Kit 50',
    price: 99,
    originalPrice: 1999,
    description: '30 prompts + 10 captions + 10 more resources.',
    tagline: '50 social media tools – ₹99',
    previewImage: '/products/content-kit-50/saved.png', // ✅ using saved.png
    video: '/products/content-kit-50/video.mp4',
    features: ['30 prompts', '10 captions', 'Bonus resources'],
    faqs: [
      { q: 'What is included in the bonus?', a: 'A checklist for content planning and a list of trending hashtags.' },
      { q: 'Can I use this for multiple brands?', a: 'Yes – the license allows you to use for your own projects and clients.' },
      { q: 'Is this a one‑time purchase?', a: 'Yes – pay once, use forever.' },
    ],
    reviews: productReviews['content-kit-50'],
  },
  {
    sku: 'pro-toolkit-130',
    name: 'Pro Marketing Toolkit',
    price: 499,
    originalPrice: 4999,
    description: '100 prompts + 30 captions for serious growth.',
    tagline: 'Level up your marketing – ₹499',
    previewImage: '/products/pro-toolkit-130/saved.png', // ✅ using saved.png
    video: '/products/pro-toolkit-130/video.mp4',
    features: ['100 AI prompts', '30 captions', 'Pro strategies'],
    faqs: [
      { q: 'Is this suitable for agencies?', a: 'Yes – it’s built for agencies and power users.' },
      { q: 'Do you offer updates?', a: 'Yes – you get free updates for 6 months.' },
      { q: 'Can I share this with my team?', a: 'The license is for a single user – contact us for team pricing.' },
    ],
    reviews: productReviews['pro-toolkit-130'],
  },
  {
    sku: 'ultimate-ai-bundle-400',
    name: 'Ultimate AI Bundle',
    price: 999,
    originalPrice: 9999,
    description: '300 prompts + 100 captions – the complete arsenal.',
    tagline: '400 resources for ₹999',
    previewImage: '/products/ultimate-ai-bundle-400/saved.png', // ✅ using saved.png
    video: '/products/ultimate-ai-bundle-400/video.mp4',
    features: ['300 prompts', '100 captions', 'Bonus case studies'],
    faqs: [
      { q: 'What makes this bundle “ultimate”?', a: 'It’s our largest collection – covers every niche and platform.' },
      { q: 'Do I get commercial rights?', a: 'Yes – you can use the output for any client work.' },
      { q: 'How do I access the files?', a: 'Instant download via the link we email you after purchase.' },
    ],
    reviews: productReviews['ultimate-ai-bundle-400'],
  },
  {
    sku: 'elite-creator-suite',
    name: 'Elite Creator Suite',
    price: 1999,
    originalPrice: 19999,
    description: '500+ premium resources + masterclass + lifetime updates.',
    tagline: 'The ultimate toolkit for serious creators – ₹1999',
    previewImage: '/products/elite-creator-suite/saved.png', // ✅ using saved.png
    video: '/products/elite-creator-suite/video.mp4',
    features: [
      '500+ AI prompts (all niches)',
      '200+ social media captions',
      '50+ Canva templates',
      '10+ marketing frameworks',
      'Exclusive masterclass video',
      'Lifetime updates & new content',
      'Commercial license included',
    ],
    faqs: [
      { q: 'What is included in the Elite Creator Suite?', a: 'You get 500+ AI prompts, 200+ captions, 50+ Canva templates, 10+ marketing frameworks, an exclusive masterclass video, and lifetime updates.' },
      { q: 'Do I get commercial rights?', a: 'Yes – you can use everything for client work, agencies, and commercial projects.' },
      { q: 'How do I receive updates?', a: 'You’ll get access to a private update hub where new resources are added every month.' },
      { q: 'Can I share this with my team?', a: 'The license is for a single user. For team or enterprise licenses, please contact us.' },
      { q: 'Is there a refund policy?', a: 'Due to the digital nature of the product, all sales are final. However, if you face any technical issues, our support team will help you.' },
    ],
    reviews: productReviews['elite-creator-suite'],
  },
  // ===== NEW PRODUCT =====
  {
    sku: 'ai-ultimate-collection-2026',
    name: 'AI Ultimate Collection 2026',
    price: 299,
    originalPrice: 4999,
    description: 'The ultimate AI toolkit for 2026 – 200+ prompts, 50+ templates, and exclusive resources.',
    tagline: 'Master AI in 2026 – ₹299',
    previewImage: '/products/ai-ultimate-collection-2026/saved.png', // ✅ using saved.png
    video: '/products/ai-ultimate-collection-2026/video.mp4',
    features: [
      '200+ AI prompts for every niche',
      '50+ Canva templates',
      'Exclusive 2026 trend guide',
      'Commercial license included',
      'Lifetime updates & new content',
    ],
    faqs: [
      { q: 'What is included in the AI Ultimate Collection 2026?', a: 'You get 200+ AI prompts, 50+ Canva templates, a trend guide for 2026, commercial license, and lifetime updates.' },
      { q: 'Do I get commercial rights?', a: 'Yes – you can use everything for client work, agencies, and commercial projects without restrictions.' },
      { q: 'How do I receive updates?', a: 'You’ll get access to a private update hub where new prompts and templates are added every month.' },
      { q: 'Is this a one‑time purchase?', a: 'Yes – pay once and get lifetime access to the current collection and all future updates.' },
      { q: 'What makes this collection “ultimate”?', a: 'It’s our most comprehensive pack, covering 20+ industries and use cases, designed to future‑proof your AI workflow.' },
    ],
    reviews: productReviews['ai-ultimate-collection-2026'],
  },
];