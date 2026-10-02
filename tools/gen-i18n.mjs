import fs from 'fs';
import path from 'path';
import { renderHead, renderHeader, renderFooter, getRootRel } from './layout.mjs';
import { generateSchemaGraph } from './schema.mjs';
import { getTranslations, getAllLanguageCodes } from './translations.mjs';

const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
const cases = JSON.parse(fs.readFileSync('src/data/cases.json', 'utf8'));

export function generateAllInternationalHomepages() {
  const langCodes = getAllLanguageCodes();

  for (const code of langCodes) {
    const t = getTranslations(code);
    if (!t) continue;

    const pagePath = `/${code}/`;
    const rootRel = getRootRel(pagePath);
    const isRtl = t.dir === 'rtl';

    const schema = generateSchemaGraph({
      pageType: 'WebPage',
      pagePath,
      pageTitle: t.title,
      pageDesc: t.metaDesc,
      services
    });

    const bodyContent = `
    <main id="main-content">
      <!-- Hero Section with 3D WebGL Canvas -->
      <section class="hero">
        <div class="wrap">
          <div>
            <div class="badge"><i></i> ${t.badge}</div>
            <h1 aria-label="${t.title}">
              <span class="ln"><span>${t.h1_1}</span></span>
              <span class="ln"><span class="g">${t.h1_grad}</span></span>
              <span class="ln"><span>${t.h1_2}</span></span>
              <span class="ln"><span>${t.h1_3}</span></span>
            </h1>
            <p class="lead">${t.lead}</p>
            <div class="cta">
              <a class="btn p mag" href="${rootRel}contact/">${t.cta1}</a>
              <a class="btn mag" href="#work">${t.cta2}</a>
            </div>
            <div class="stats">
              <div><b data-n="3">3</b><span>Live platforms</span></div>
              <div><b data-n="3">3</b><span>Target platforms</span></div>
              <div><b data-n="17" data-s="+">17+</b><span>Countries reached</span></div>
              <div><b data-n="100" data-s="%">100%</b><span>End-to-end delivery</span></div>
            </div>
          </div>
          <div class="me tilt">
            <img class="pic" src="${rootRel}assets/images/logo.png" width="480" height="480" alt="Prajin and Team Logo" fetchpriority="high">
          </div>
        </div>
      </section>

      <!-- Services Bento Grid -->
      <section id="services">
        <div class="wrap">
          <p class="eyebrow rv">${t.servicesTitle}</p>
          <h2 class="rv">High-Performance <span class="g">Digital Products.</span></h2>
          <div class="bento">
            ${services.map(s => `
            <article class="card rv">
              <div class="chip" aria-hidden="true">${s.icon}</div>
              <h3>${s.name}</h3>
              <p>${s.short}</p>
              <div style="margin-top:16px;">
                <a href="${rootRel}services/${s.slug}/" class="btn s mag">Learn more →</a>
              </div>
            </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Selected Work Showcase -->
      <section id="work">
        <div class="wrap">
          <p class="eyebrow rv">Portfolio</p>
          <h2 class="rv">Real Products, <span class="g">Live Today.</span></h2>
          <div class="work">
            ${cases.map(c => `
            <article class="card case rv">
              <div class="vis">
                <div class="phone"><img src="${rootRel}assets/images/${c.imgs[0]}" alt="${c.heroAlt}" loading="lazy" width="400" height="800"></div>
                <div class="phone b"><img src="${rootRel}assets/images/${c.imgs[1]}" alt="${c.name} preview" loading="lazy" width="400" height="800"></div>
              </div>
              <div>
                <p class="tag">${c.tag}</p>
                <h3>${c.name}</h3>
                <dl>
                  <div><dt>Problem</dt><dd>${c.problem}</dd></div>
                  <div><dt>Solution</dt><dd>${c.solution}</dd></div>
                </dl>
                <div style="margin-top:20px; display:flex; gap:12px; flex-wrap:wrap;">
                  <a class="btn p s mag" href="${c.url}" target="_blank" rel="noopener">Visit ${c.displayUrl} ↗</a>
                  <a class="btn s mag" href="${rootRel}work/${c.slug}/">Case study →</a>
                </div>
              </div>
            </article>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about">
        <div class="wrap about">
          <div class="me tilt rv">
            <img class="pic" src="${rootRel}assets/images/logo.png" width="480" height="480" alt="Prajin and Team Logo" loading="lazy">
          </div>
          <div>
            <p class="eyebrow rv">About</p>
            <h2 class="rv">${t.aboutTitle}</h2>
            <p class="lead rv">${t.aboutLead}</p>
            <div style="margin-top:28px;">
              <a href="${rootRel}about/" class="btn p mag">Full background & values →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact CTA -->
      <section id="contact">
        <div class="wrap">
          <div class="card final rv">
            <h2>${t.contactTitle}</h2>
            <p class="lead">Tell me about your business goals and ideas. I reply directly on WhatsApp, usually within a few hours.</p>
            <a class="btn p mag" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, I'm reaching out in ${code.toUpperCase()} regarding a new project.`)}" target="_blank" rel="noopener">Chat on WhatsApp ↗</a>
          </div>
        </div>
      </section>
    </main>
    `;

    const html = renderHead({
      title: t.title,
      metaDesc: t.metaDesc,
      pagePath,
      lang: code,
      dir: isRtl ? 'rtl' : 'ltr',
      schemaJson: schema
    }) + renderHeader(pagePath, code) + bodyContent + renderFooter(pagePath);

    const outPath = `${code}/index.html`;
    fs.mkdirSync(path.dirname(path.join('src', outPath)), { recursive: true });
    fs.writeFileSync(path.join('src', outPath), html.trim() + '\n', 'utf8');
    console.log(`Generated: src/${outPath}`);
  }
}
