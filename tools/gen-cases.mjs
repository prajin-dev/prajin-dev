import fs from 'fs';
import path from 'path';
import { renderHead, renderHeader, renderFooter, getRootRel } from './layout.mjs';
import { generateSchemaGraph } from './schema.mjs';

const cases = JSON.parse(fs.readFileSync('src/data/cases.json', 'utf8'));
const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));

export function generateCaseStudyPages() {
  for (const c of cases) {
    const pagePath = `/work/${c.slug}/`;
    const rootRel = getRootRel(pagePath);

    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/#work' },
      { name: c.name, path: pagePath }
    ];

    const schema = generateSchemaGraph({
      pageType: 'ItemPage',
      pagePath,
      pageTitle: `${c.name} Case Study — Prajin Dezaa`,
      pageDesc: c.solution,
      breadcrumbs,
      services,
      caseStudy: c
    });

    const bodyContent = `
    <main id="main-content">
      <div class="page-header">
        <div class="wrap">
          <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
            <a href="${rootRel}">Home</a>
            <span class="sep">/</span>
            <a href="${rootRel}#work">Work</a>
            <span class="sep">/</span>
            <span class="curr">${c.name}</span>
          </nav>
          <p class="tag">${c.tag}</p>
          <h1 style="max-width:24ch; margin-bottom:16px;">${c.h1}</h1>
          <p class="lead" style="font-size:20px; max-width:68ch;">
            How Prajin Dezaa engineered a production-grade digital platform for <strong>${c.client}</strong>, delivering immediate operational efficiency and international customer inquiries.
          </p>
          <div class="cta" style="margin-top:24px;">
            <a class="btn p mag" href="${c.url}" target="_blank" rel="noopener">Visit Live Website (${c.displayUrl}) ↗</a>
            <a class="btn mag" href="${rootRel}contact/">Discuss a similar project →</a>
          </div>
        </div>
      </div>

      <div class="page-body">
        <div class="wrap content-grid">
          <div class="prose">
            <h2>The Challenge & Business Problem</h2>
            <p>${c.problem}</p>

            <h2>The Engineering Solution</h2>
            <p>${c.solution}</p>

            <h2>Core Features Delivered</h2>
            <ul>
              ${c.features.map(f => `<li><strong>${f}</strong></li>`).join('')}
            </ul>

            <h2>Technology Stack & Architecture</h2>
            <div class="pills" style="margin:20px 0 32px;">
              ${c.tech.map(t => `<span>${t}</span>`).join('')}
            </div>

            <h2>Client Impact & Testimonial</h2>
            <blockquote>
              “${c.testimonial.quote}”
              <br><br>
              <strong style="color:var(--fg); font-style:normal;">— ${c.testimonial.author}, ${c.testimonial.company}</strong>
            </blockquote>

            <h2>Key Takeaways for Growing Businesses</h2>
            <p>
              This project demonstrates that heavy, expensive enterprise software is rarely the right solution for agile businesses. By engineering a custom, lightweight web application specifically tailored to existing operational workflows, businesses achieve faster user adoption, zero recurring license bloat, and demonstrable return on investment.
            </p>
          </div>

          <aside>
            <div class="card" style="padding:28px; position:sticky; top:110px;">
              <h3 style="font-size:20px; margin-bottom:16px;">Project Summary</h3>
              <p style="font-size:14px; margin-bottom:10px;"><strong>Client:</strong> ${c.client}</p>
              <p style="font-size:14px; margin-bottom:10px;"><strong>Category:</strong> ${c.tag}</p>
              <p style="font-size:14px; margin-bottom:10px;"><strong>Live Demo:</strong> <a href="${c.url}" target="_blank" rel="noopener" style="color:var(--c1); text-decoration:underline;">${c.displayUrl}</a></p>
              <p style="font-size:14px; margin-bottom:24px;"><strong>Delivery:</strong> 100% On-Time, Fixed Quote</p>

              <a class="btn p mag" style="width:100%; margin-bottom:12px;" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, I saw the ${c.name} case study and want to build something similar.`)}" target="_blank" rel="noopener">Discuss via WhatsApp</a>
              <a class="btn mag" style="width:100%;" href="${rootRel}contact/">Request Proposal</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
    `;

    const html = renderHead({
      title: `${c.name} Case Study | Prajin Dezaa`,
      metaDesc: c.solution,
      pagePath,
      schemaJson: schema
    }) + renderHeader(pagePath) + bodyContent + renderFooter(pagePath);

    const outPath = `work/${c.slug}/index.html`;
    fs.mkdirSync(path.dirname(path.join('src', outPath)), { recursive: true });
    fs.writeFileSync(path.join('src', outPath), html.trim() + '\n', 'utf8');
    console.log(`Generated: src/${outPath}`);
  }
}
