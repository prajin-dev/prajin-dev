import fs from 'fs';
import path from 'path';
import { renderHead, renderHeader, renderFooter, getRootRel } from './layout.mjs';
import { generateSchemaGraph } from './schema.mjs';

const markets = JSON.parse(fs.readFileSync('src/data/markets.json', 'utf8'));
const cases = JSON.parse(fs.readFileSync('src/data/cases.json', 'utf8'));
const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));

export function generateMarketPages() {
  for (const m of markets) {
    const pagePath = `/markets/${m.slug}/`;
    const rootRel = getRootRel(pagePath);
    const relatedCase = cases.find(c => c.slug === m.caseReference);

    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Markets', path: '/#services' },
      { name: m.country, path: pagePath }
    ];

    const schema = generateSchemaGraph({
      pageType: 'WebPage',
      pagePath,
      pageTitle: `${m.title} — Prajin Dezaa`,
      pageDesc: m.metaDesc,
      breadcrumbs,
      services
    });

    const bodyContent = `
    <main id="main-content">
      <div class="page-header">
        <div class="wrap">
          <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
            <a href="${rootRel}">Home</a>
            <span class="sep">/</span>
            <span class="curr">${m.country}</span>
          </nav>
          <div class="badge"><i></i> Serving Clients Across ${m.country}</div>
          <h1 style="max-width:24ch; margin-bottom:16px;">${m.h1}</h1>
          <p class="lead" style="font-size:20px; max-width:68ch;">
            Senior full-stack engineering, bespoke web development, and custom B2B software designed for <strong>${m.demonym}</strong> businesses.
          </p>
          <div class="cta" style="margin-top:24px;">
            <a class="btn p mag" href="${rootRel}contact/">Discuss your project in ${m.currency} →</a>
            <a class="btn mag" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, I'm reaching out from ${m.country} regarding web development.`)}" target="_blank" rel="noopener">WhatsApp inquiry ↗</a>
          </div>
        </div>
      </div>

      <div class="page-body">
        <div class="wrap content-grid">
          <div class="prose">
            <h2>High-Performance Digital Engineering for ${m.country}</h2>
            <p>${m.intro}</p>
            <p>${m.localContext}</p>

            <h2>Why ${m.demonym} Companies Partner with Prajin Dezaa</h2>
            <ul>
              <li><strong>Direct Senior Communication:</strong> Speak directly with the software engineer building your product, eliminating agency bureaucracy and misunderstandings.</li>
              <li><strong>Core Web Vitals Excellence:</strong> Guaranteed 95+ mobile Lighthouse scores, ensuring superior user engagement and Google search rankings.</li>
              <li><strong>Timezone Flexibility:</strong> Dedicated communication windows aligned with ${m.demonym} business hours.</li>
              <li><strong>Transparent Milestone Pricing:</strong> Fixed quotes quoted in ${m.currency} or USD equivalents with zero hidden retainers.</li>
            </ul>

            ${relatedCase ? `
            <div class="card" style="padding:32px; margin:40px 0; background:var(--glass);">
              <p class="tag" style="margin-bottom:8px;">Relevant Production Case Study</p>
              <h3 style="font-size:24px; margin-bottom:12px;">${relatedCase.name}</h3>
              <p style="color:var(--mut); margin-bottom:16px;">${relatedCase.solution}</p>
              <a href="${rootRel}work/${relatedCase.slug}/" class="btn p s mag">Explore case study (${relatedCase.displayUrl}) →</a>
            </div>
            ` : ''}

            <h2>Common Projects Built for ${m.demonym} Clients</h2>
            <p>
              I deliver corporate websites for manufacturers and professional service firms, mobile-first e-commerce platforms with regional currency calculations, and bespoke cloud portals for wholesale distributors.
            </p>
          </div>

          <aside>
            <div class="card" style="padding:28px; position:sticky; top:110px;">
              <h3 style="font-size:20px; margin-bottom:12px;">Work with Prajin Dezaa</h3>
              <p style="font-size:14px; color:var(--mut); margin-bottom:20px;">
                Ready to build or upgrade your digital platform in ${m.country}? Let's schedule an initial discovery call.
              </p>
              <a class="btn p mag" style="width:100%; margin-bottom:12px;" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, let's talk about my project in ${m.country}.`)}" target="_blank" rel="noopener">Chat on WhatsApp</a>
              <a class="btn mag" style="width:100%;" href="${rootRel}contact/">Send Inquiry Form</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
    `;

    const html = renderHead({
      title: `${m.title} | Prajin Dezaa`,
      metaDesc: m.metaDesc,
      pagePath,
      schemaJson: schema
    }) + renderHeader(pagePath) + bodyContent + renderFooter(pagePath);

    const outPath = `markets/${m.slug}/index.html`;
    fs.mkdirSync(path.dirname(path.join('src', outPath)), { recursive: true });
    fs.writeFileSync(path.join('src', outPath), html.trim() + '\n', 'utf8');
    console.log(`Generated: src/${outPath}`);
  }
}
