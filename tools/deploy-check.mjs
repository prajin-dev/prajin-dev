import fs from 'fs';
import path from 'path';

// Production Deployment Pre-Flight Validation
// Usage: node tools/deploy-check.mjs

console.log('\n======================================================');
console.log('  Running Pre-Flight Deployment Health Check');
console.log('======================================================\n');

let hasErrors = false;

// 1. Verify dist exists and has content
if (!fs.existsSync('dist') || !fs.existsSync('dist/index.html')) {
  console.error('❌ dist/ directory or dist/index.html is missing. Run "npm run build" first.');
  process.exit(1);
}

// 2. Scan all text files in dist/ for leftover tokens
const tokenRegex = /\{\{[A-Z0-9_]+\}\}/g;
let tokenCount = 0;

function checkDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const f of files) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      checkDir(full);
    } else {
      const ext = path.extname(f.name).toLowerCase();
      if (['.html', '.css', '.js', '.json', '.xml', '.txt'].includes(ext)) {
        const text = fs.readFileSync(full, 'utf8');
        const matches = text.match(tokenRegex);
        if (matches) {
          console.error(`❌ File ${full} contains unresolved placeholder(s): ${matches.join(', ')}`);
          tokenCount++;
          hasErrors = true;
        }
      }
    }
  }
}

checkDir('dist');

if (tokenCount === 0) {
  console.log('✓ Placeholder Check: Zero unresolved {{TOKEN}} placeholders found in dist/.');
}

// 3. Verify XML Sitemap
if (fs.existsSync('dist/sitemap.xml')) {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  if (sitemap.includes('<urlset') && sitemap.includes('</urlset>')) {
    console.log('✓ Sitemap Check: dist/sitemap.xml is valid and present.');
  } else {
    console.error('❌ Sitemap Check: dist/sitemap.xml appears malformed.');
    hasErrors = true;
  }
} else {
  console.error('❌ Sitemap Check: dist/sitemap.xml missing.');
  hasErrors = true;
}

// 4. Verify robots.txt
if (fs.existsSync('dist/robots.txt')) {
  const robots = fs.readFileSync('dist/robots.txt', 'utf8');
  if (robots.includes('User-agent:')) {
    console.log('✓ Robots.txt Check: dist/robots.txt is present and configured.');
  } else {
    console.error('❌ Robots.txt Check: dist/robots.txt appears invalid.');
    hasErrors = true;
  }
} else {
  console.error('❌ Robots.txt Check: dist/robots.txt missing.');
  hasErrors = true;
}

// 5. Verify Host configuration files
const requiredHostFiles = ['dist/_headers', 'dist/_redirects', 'dist/vercel.json', 'dist/netlify.toml'];
for (const hf of requiredHostFiles) {
  if (fs.existsSync(hf)) {
    console.log(`✓ Host Config Check: ${hf} exists.`);
  } else {
    console.error(`❌ Host Config Check: ${hf} missing.`);
    hasErrors = true;
  }
}

// 6. Verify Critical HTML Pages
const requiredRoutes = [
  'dist/index.html',
  'dist/about/index.html',
  'dist/process/index.html',
  'dist/faq/index.html',
  'dist/contact/index.html',
  'dist/404.html',
  'dist/services/website-development/index.html',
  'dist/work/kalasam-jaikrishna-industries/index.html',
  'dist/blog/how-much-does-a-business-website-cost-in-2026/index.html',
  'dist/markets/websites-for-businesses-in-usa/index.html',
  'dist/ar/index.html',
  'dist/ta/index.html',
  'dist/hi/index.html'
];

for (const r of requiredRoutes) {
  if (fs.existsSync(r)) {
    console.log(`✓ Route Check: ${r} verified.`);
  } else {
    console.error(`❌ Route Check: ${r} missing.`);
    hasErrors = true;
  }
}

console.log('\n======================================================');
if (hasErrors) {
  console.error('❌ Pre-Flight Deployment Checks FAILED with issues above.');
  process.exit(1);
} else {
  console.log('🎉 ALL CHECKS PASSED! Your site is 100% ready for deployment.');
  console.log('======================================================\n');
}
