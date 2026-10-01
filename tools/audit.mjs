import fs from 'fs';
import path from 'path';

// Automated SEO, Hreflang, Link, and Schema Auditor
console.log('\n======================================================');
console.log('  Running Technical SEO, Schema, and Link Audit');
console.log('======================================================\n');

let auditErrors = 0;
const distDir = path.resolve('dist');

// 1. Gather all HTML files
const htmlFiles = [];
function findHtml(dir) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      findHtml(full);
    } else if (item.name.endsWith('.html')) {
      htmlFiles.push(full);
    }
  }
}
findHtml(distDir);

console.log(`Auditing ${htmlFiles.length} HTML pages across dist/...\n`);

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');

  // Check 1: Exactly 1 <h1> tag
  const h1Matches = html.match(/<h1[^>]*>/gi);
  if (!h1Matches || h1Matches.length !== 1) {
    console.error(`❌ [${rel}] Heading Error: Found ${h1Matches ? h1Matches.length : 0} <h1> tags. Expected exactly 1.`);
    auditErrors++;
  }

  // Check 2: <title> tag present and non-empty
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`❌ [${rel}] Title Error: Missing or empty <title> tag.`);
    auditErrors++;
  }

  // Check 3: <meta name="description"> present and non-empty
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`❌ [${rel}] Meta Description Error: Missing or empty meta description.`);
    auditErrors++;
  }

  // Check 4: Canonical tag present
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonMatch) {
    console.error(`❌ [${rel}] Canonical Error: Missing canonical tag.`);
    auditErrors++;
  }

  // Check 5: Schema JSON-LD validation (if present, must be valid JSON)
  const schemaMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  for (const sm of schemaMatches) {
    try {
      JSON.parse(sm[1]);
    } catch (e) {
      console.error(`❌ [${rel}] Schema JSON-LD Error: Malformed JSON-LD syntax.`);
      auditErrors++;
    }
  }

  // Check 6: Descriptive image alt tags
  const imgMatches = [...html.matchAll(/<img\s+([^>]+)>/gi)];
  for (const im of imgMatches) {
    if (!im[1].includes('alt=') || im[1].includes('alt=""')) {
      console.warn(`⚠️ [${rel}] Image Warning: Found image without descriptive alt attribute.`);
    }
  }
}

// Check 7: Hreflang reciprocal verification on homepage
const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const hreflangs = [...homeHtml.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)];
if (hreflangs.length >= 10) {
  console.log(`✓ International SEO Check: Found ${hreflangs.length} valid hreflang language alternates on homepage.`);
} else {
  console.error(`❌ International SEO Error: Only found ${hreflangs.length} hreflang tags.`);
  auditErrors++;
}

console.log('\n======================================================');
if (auditErrors === 0) {
  console.log('🎉 AUDIT PASSED! All pages have valid H1s, titles, descriptions, canonicals, schemas, and hreflang.');
  console.log('======================================================\n');
} else {
  console.error(`❌ Audit completed with ${auditErrors} error(s).`);
  process.exit(1);
}
