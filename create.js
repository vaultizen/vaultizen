const fs = require('fs');
const path = require('path');

// All paths relative to the current working directory (Vaultizen)
const files = [
  // Frontend
  'frontend/src/app/(routes)/page.jsx',
  'frontend/src/app/(routes)/product/[sku]/page.jsx',
  'frontend/src/app/(routes)/about/page.jsx',
  'frontend/src/app/(routes)/privacy/page.jsx',
  'frontend/src/app/(routes)/terms/page.jsx',
  'frontend/src/app/(routes)/disclaimer/page.jsx',
  'frontend/src/app/layout.jsx',
  'frontend/src/app/globals.css',
  'frontend/src/components/Header.jsx',
  'frontend/src/components/Footer.jsx',
  'frontend/src/components/ProductCard.jsx',
  'frontend/src/lib/products.js',
  'frontend/public/logo.png',
  'frontend/public/images/.gitkeep',
  'frontend/.env.local',
  'frontend/package.json',
  'frontend/tailwind.config.js',
  'frontend/postcss.config.js',
  'frontend/next.config.js',

  // Backend
  'backend/src/config/index.js',
  'backend/src/services/supabase.js',
  'backend/src/services/token.js',
  'backend/src/services/email.js',
  'backend/src/controllers/webhookController.js',
  'backend/src/controllers/downloadController.js',
  'backend/src/routes/webhook.js',
  'backend/src/routes/download.js',
  'backend/src/server.js',
  'backend/.env',
  'backend/package.json',
  'backend/.gitignore',

  // Database
  'database/schema.sql',

  // Assets
  'assets/products/.gitkeep',
  'assets/previews/.gitkeep',

  // Docs
  'docs/SETUP.md',
];

// Create each file and its parent directories
files.forEach(relativePath => {
  const fullPath = path.join(process.cwd(), relativePath);
  const dir = path.dirname(fullPath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${relativePath.replace(/[^/]*$/, '')}`);
  }

  // Create the file (empty) if it doesn't exist
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, '', 'utf8');
    console.log(`📄 Created file: ${relativePath}`);
  } else {
    console.log(`⏩ Skipped (already exists): ${relativePath}`);
  }
});

console.log('\n✅ All Vaultizen files and folders have been generated!');
console.log('👉 Next steps:');
console.log('  cd frontend && npm install');
console.log('  cd ../backend && npm install');
console.log('  Then add your logo, images, and .zip files to the appropriate folders.');