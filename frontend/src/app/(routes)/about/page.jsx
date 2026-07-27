export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Hero section – smaller */}
      <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl mb-8 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">About Vaultizen</h1>
        <p className="mt-1 text-base text-gray-600 max-w-2xl mx-auto">
          Digital resources that transform the way you create.
        </p>
      </div>

      {/* Main content – larger font size */}
      <div className="prose prose-lg prose-blue max-w-none">
        <p className="text-lg text-gray-700 leading-relaxed">
          <strong>Vaultizen</strong> is a premium digital resource hub designed for creators, marketers, and entrepreneurs who want to save time and produce better content. We offer a curated collection of AI prompts, social media templates, and productivity tools – all at affordable prices.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-4">
          Our journey began with a simple belief: high‑quality digital tools should be accessible to everyone, not just large agencies. Every product we create is tested for real‑world impact, crafted with care, and delivered instantly – so you can focus on what truly matters: creating and growing.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">What We Offer</h3>
        <ul className="text-lg space-y-2">
          <li><span className="text-blue-600 font-semibold">AI Prompt Packs</span> – Spark creativity with hundreds of tested prompts for ChatGPT, Claude, and more.</li>
          <li><span className="text-blue-600 font-semibold">Social Media Templates</span> – Ready‑to‑use caption hooks and content structures that drive engagement.</li>
          <li><span className="text-blue-600 font-semibold">Marketing Toolkits</span> – All‑in‑one bundles with prompts, checklists, and strategic guides.</li>
          <li><span className="text-blue-600 font-semibold">Instant Delivery</span> – Get your files immediately after purchase, with secure 24‑hour download links.</li>
        </ul>

        <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Why Choose Vaultizen?</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          We stand out because we care about quality and your success. Our products are not generic – they’re designed to solve real creative challenges. We also believe in transparency: what you see is what you get, with no hidden costs or subscriptions.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mt-3">
          Thousands of creators and businesses trust Vaultizen to accelerate their content workflow. Whether you’re a solopreneur, a startup, or a seasoned marketer, our resources are built to scale with you.
        </p>

        {/* Values cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">Quality First</h3>
            <p className="text-sm text-gray-600 mt-1">Every product is hand‑reviewed for excellence.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">Instant Delivery</h3>
            <p className="text-sm text-gray-600 mt-1">Get your files within seconds of purchase.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800">Affordable</h3>
            <p className="text-sm text-gray-600 mt-1">Premium resources at prices that work for you.</p>
          </div>
        </div>

        {/* Testimonial / Trust */}
        <div className="bg-gray-50 p-6 rounded-xl text-center mt-6 border border-gray-100">
          <p className="text-lg font-medium text-gray-700">
            “We believe in making high‑quality digital tools accessible to everyone.”
          </p>
          <p className="mt-1 text-sm text-gray-500">– The Vaultizen Team</p>
        </div>

        {/* Stats – larger font */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-center">
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-700">500+</p>
            <p className="text-sm text-gray-500">Happy Customers</p>
          </div>
          <div className="p-4 border-l border-r border-gray-200">
            <p className="text-3xl font-bold text-blue-700">50+</p>
            <p className="text-sm text-gray-500">Digital Products</p>
          </div>
          <div className="p-4">
            <p className="text-3xl font-bold text-blue-700">4.9★</p>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}