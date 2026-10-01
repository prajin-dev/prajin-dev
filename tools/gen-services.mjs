import fs from 'fs';
import path from 'path';
import { renderHead, renderHeader, renderFooter, getRootRel } from './layout.mjs';
import { generateSchemaGraph } from './schema.mjs';

const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
const cases = JSON.parse(fs.readFileSync('src/data/cases.json', 'utf8'));

export function generateServicePages() {
  for (const s of services) {
    const pagePath = `/services/${s.slug}/`;
    const rootRel = getRootRel(pagePath);
    const relatedCase = cases.find(c => c.slug === s.relatedCase);

    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/#services' },
      { name: s.name, path: pagePath }
    ];

    const schema = generateSchemaGraph({
      pageType: 'ItemPage',
      pagePath,
      pageTitle: `${s.name} — Prajin Dezaa`,
      pageDesc: s.lead,
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
            <a href="${rootRel}#services">Services</a>
            <span class="sep">/</span>
            <span class="curr">${s.name}</span>
          </nav>
          <div class="badge"><i></i> Professional Digital Service · Available Worldwide</div>
          <h1 style="max-width:24ch; margin-bottom:16px;">${s.h1}</h1>
          <p class="lead" style="font-size:20px; max-width:68ch;">${s.lead}</p>
          <div class="cta" style="margin-top:24px;">
            <a class="btn p mag" href="${rootRel}contact/">Discuss your ${s.name} project →</a>
            <a class="btn mag" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, I am interested in your ${s.name} services.`)}" target="_blank" rel="noopener">WhatsApp inquiry ↗</a>
          </div>
        </div>
      </div>

      <div class="page-body">
        <div class="wrap content-grid">
          <div class="prose">
            <h2>Why Engineered Performance Matters for ${s.name}</h2>
            <p>
              In today's digital landscape, modern businesses cannot afford slow load times, confusing user interfaces, or clunky checkout experiences. When prospective customers or wholesale distributors interact with your company, their first impression defines their willingness to conduct business with you.
            </p>
            <p>
              Rather than assembling bloated generic themes or relying on slow, plugin-heavy platforms, I engineer bespoke digital products built on clean semantic markup, modern CSS architecture, and highly optimized serverless workflows. The result is a platform that loads in under a second, ranks exceptionally in organic search, and converts traffic into tangible business inquiries.
            </p>

            <h2>Key Engineering Deliverables & Features</h2>
            <ul>
              ${s.deliverables.map(d => `<li><strong>${d}</strong></li>`).join('')}
            </ul>

            <h2>Who This Service Is Engineered For</h2>
            <p>${s.whoFor}</p>

            ${relatedCase ? `
            <div class="card" style="padding:32px; margin:40px 0; background:var(--glass);">
              <p class="tag" style="margin-bottom:8px;">Verified Client Case Study</p>
              <h3 style="font-size:24px; margin-bottom:12px;">See It in Action: ${relatedCase.name}</h3>
              <p style="color:var(--mut); margin-bottom:16px;">${relatedCase.solution}</p>
              <a href="${rootRel}work/${relatedCase.slug}/" class="btn p s mag">Read full case study (${relatedCase.displayUrl}) →</a>
            </div>
            ` : ''}

            <h2>Transparent Fixed Pricing & Delivery Timeline</h2>
            <p>
              I believe in absolute pricing honesty. Every project is scoped collaboratively during our initial discovery call, resulting in a detailed, fixed-price proposal with clear milestone schedules. Standard business platforms typically launch within 1 to 2 weeks, while complex ordering apps and custom platforms require 3 to 8 weeks.
            </p>
          </div>

          <aside>
            <div class="card" style="padding:28px; position:sticky; top:110px;">
              <div class="chip" style="margin-bottom:16px;">${s.icon}</div>
              <h3 style="font-size:20px; margin-bottom:12px;">Start Your Project</h3>
              <p style="font-size:14px; color:var(--mut); margin-bottom:20px;">
                Ready to upgrade your business web presence? Book a free discovery conversation directly with engineer Prajin Dezaa.
              </p>
              <a class="btn p mag" style="width:100%; margin-bottom:12px;" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, let's talk about my ${s.name} project.`)}" target="_blank" rel="noopener">Chat on WhatsApp</a>
              <a class="btn mag" style="width:100%;" href="${rootRel}contact/">Request Custom Quote</a>

              <hr style="border:0; border-top:1px solid var(--line); margin:24px 0;">

              <h4 style="font-size:14px; text-transform:uppercase; letter-spacing:0.1em; color:var(--c1); margin-bottom:12px;">Other Core Services</h4>
              <ul style="list-style:none; padding:0; display:grid; gap:8px; font-size:13px;">
                ${services.filter(other => other.slug !== s.slug).slice(0, 4).map(other => `
                  <li><a href="${rootRel}services/${other.slug}/" style="color:var(--mut); hover:color:var(--fg);">${other.name} →</a></li>
                `).join('')}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
    `;

    const html = renderHead({
      title: `${s.name} | Prajin Dezaa`,
      metaDesc: s.short,
      pagePath,
      schemaJson: schema
    }) + renderHeader(pagePath) + bodyContent + renderFooter(pagePath);

    const outPath = `services/${s.slug}/index.html`;
    fs.mkdirSync(path.dirname(path.join('src', outPath)), { recursive: true });
    fs.writeFileSync(path.join('src', outPath), html.trim() + '\n', 'utf8');
    console.log(`Generated: src/${outPath}`);
  }
}
