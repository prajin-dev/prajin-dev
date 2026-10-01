import fs from 'fs';
import path from 'path';
import { renderHead, renderHeader, renderFooter, getRootRel } from './layout.mjs';
import { generateSchemaGraph } from './schema.mjs';
import { generateOgImage } from './og-generator.mjs';

// Load static dictionaries
const config = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));
const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));
const cases = JSON.parse(fs.readFileSync('src/data/cases.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));
const markets = JSON.parse(fs.readFileSync('src/data/markets.json', 'utf8'));
const i18nEn = JSON.parse(fs.readFileSync('src/data/i18n/en.json', 'utf8'));

// Common FAQ List
const defaultFaq = [
  ['How much does a project cost?', 'Websites start from transparent custom quotes based on exact scope and feature requirements; apps and enterprise software are quoted after a free discovery session. You always receive a fixed, upfront proposal with zero hidden surprises.'],
  ['How long does technical delivery take?', 'A standard business or corporate website takes 1–2 weeks. E-commerce portals, B2B distributor apps, and custom software typically take 3–8 weeks depending on integration complexity.'],
  ['Do you manage hosting, domains and security setup?', 'Yes. I configure the domain, DNS, global CDN edge caching (Cloudflare), HTTPS SSL certificates, and transactional email setup. You retain 100% full legal ownership of all assets.'],
  ['What post-launch support and warranty is included?', 'Every deployment includes 30 days of free post-launch support and fixes, followed by flexible monthly maintenance plans covering speed audits, security, and feature updates.']
];

// Tech stack list
const techStack = ['Next.js', 'React', 'JavaScript (ES2024)', 'HTML5 & Vanilla CSS', 'PWA', 'Android APK', 'REST APIs', 'SQL & Cloud DB', 'WhatsApp API', 'Technical SEO', 'Google Ads', 'Meta Ads'];

// Helper to write an HTML page to src/
function writePage(relPath, htmlContent) {
  const fullPath = path.join('src', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, htmlContent.trim() + '\n', 'utf8');
  console.log(`Generated: src/${relPath}`);
}

// ----------------------------------------------------
// 1. GENERATE HOMEPAGE (index.html)
// ----------------------------------------------------
export function generateHomePage(lang = 'en') {
  const pagePath = lang === 'en' ? '/' : `/${lang}/`;
  const rootRel = getRootRel(pagePath);
  const isRtl = lang === 'ar';

  const schema = generateSchemaGraph({
    pageType: 'WebPage',
    pagePath,
    pageTitle: 'Prajin Dezaa — Full-Stack Developer | Websites & Apps that Grow Businesses',
    pageDesc: 'Prajin Dezaa builds websites, e-commerce stores, B2B order apps, Android PWAs and custom software, plus Google/Meta ads and technical SEO. Based in Theni, India, serving clients worldwide.',
    services,
    faqItems: defaultFaq
  });

  const bodyContent = `
  <main id="main-content">
    <!-- Hero Section with Real-Time 3D WebGL Canvas -->
    <section class="hero">
      <div class="wrap">
        <div>
          <div class="badge"><i></i> ${i18nEn.hero.badge}</div>
          <h1 aria-label="I build websites and apps that grow businesses.">
            <span class="ln"><span>${i18nEn.hero.h1_1}</span></span>
            <span class="ln"><span class="g">${i18nEn.hero.h1_grad}</span></span>
            <span class="ln"><span>${i18nEn.hero.h1_2}</span></span>
            <span class="ln"><span>${i18nEn.hero.h1_3}</span></span>
          </h1>
          <p class="lead">${i18nEn.hero.lead}</p>
          <div class="cta">
            <a class="btn p mag" href="${rootRel}contact/">${i18nEn.hero.cta_primary}</a>
            <a class="btn mag" href="${rootRel}#work">${i18nEn.hero.cta_secondary}</a>
          </div>
          <div class="stats">
            <div><b data-n="3">3</b><span>Live platforms</span></div>
            <div><b data-n="3">3</b><span>Target platforms</span></div>
            <div><b data-n="17" data-s="+">17+</b><span>Countries reached</span></div>
            <div><b data-n="100" data-s="%">100%</b><span>End-to-end delivery</span></div>
          </div>
        </div>
        <div class="me tilt">
          <img class="pic" src="${rootRel}assets/images/me.jpg" width="480" height="480" alt="Prajin Dezaa - Full-Stack Developer portrait" fetchpriority="high">
        </div>
      </div>
      <div class="hint">SCROLL</div>
    </section>

    <!-- Infinite Tech Marquee -->
    <div class="mq" aria-label="Core Engineering Technologies">
      <div>
        ${[...techStack, ...techStack].map(t => `<span>${t}</span>`).join('')}
      </div>
    </div>

    <!-- Services Bento Grid -->
    <section id="services">
      <div class="wrap">
        <p class="eyebrow rv">What I build</p>
        <h2 class="rv">Every kind of <span class="g">digital product.</span></h2>
        <p class="lead rv">From a first corporate website to custom enterprise cloud software that runs an entire business.</p>
        <div class="bento">
          ${services.map(s => `
          <article class="card rv">
            <div class="chip" aria-hidden="true">${s.icon}</div>
            <h3>${s.name}</h3>
            <p>${s.short}</p>
            <div style="margin-top:16px;">
              <a href="${rootRel}services/${s.slug}/" class="btn s mag" style="padding:6px 14px; font-size:12px;">Explore service →</a>
            </div>
          </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Selected Work Showcase -->
    <section id="work">
      <div class="wrap">
        <p class="eyebrow rv">Selected work</p>
        <h2 class="rv">Real products, <span class="g">live today.</span></h2>
        <div class="work">
          ${cases.map(c => `
          <article class="card case rv">
            <div class="vis">
              <div class="phone">
                <img src="${rootRel}assets/images/${c.imgs[0]}" alt="${c.heroAlt}" loading="lazy" width="400" height="800">
              </div>
              <div class="phone b">
                <img src="${rootRel}assets/images/${c.imgs[1]}" alt="${c.name} mobile screen preview" loading="lazy" width="400" height="800">
              </div>
            </div>
            <div>
              <p class="tag">${c.tag}</p>
              <h3>${c.name}</h3>
              <dl>
                <div><dt>Problem</dt><dd>${c.problem}</dd></div>
                <div><dt>Solution</dt><dd>${c.solution}</dd></div>
                <div><dt>Key features</dt><dd>${c.features.join(' · ')}</dd></div>
              </dl>
              <div class="pills">
                ${c.tech.map(t => `<span>${t}</span>`).join('')}
              </div>
              <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:20px;">
                <a class="btn p s mag" href="${c.url}" target="_blank" rel="noopener">Visit ${c.displayUrl} ↗</a>
                <a class="btn s mag" href="${rootRel}work/${c.slug}/">Read case study →</a>
              </div>
            </div>
          </article>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- About Me Section -->
    <section id="about">
      <div class="wrap about">
        <div class="me tilt rv">
          <img class="pic" src="${rootRel}assets/images/me.jpg" width="480" height="480" alt="Prajin Dezaa developer photo" loading="lazy">
        </div>
        <div>
          <p class="eyebrow rv">About me</p>
          <h2 class="rv">17, from Theni. <span class="g">Shipping like a studio.</span></h2>
          <p class="lead rv">I started building for local businesses and quickly learned that a successful digital product is much more than pretty pixels — it must load instantly, remain effortlessly intuitive on mobile, and convert visitors into loyal clients. I take total ownership of design, clean code, deployment, and organic search optimization.</p>
          <div class="vals">
            <div class="card rv"><h3>Speed</h3><p>Fast sites, fast delivery, fast WhatsApp replies.</p></div>
            <div class="card rv"><h3>Quality</h3><p>Clean semantic code, pixel-level polish, tested on real devices.</p></div>
            <div class="card rv"><h3>Honesty</h3><p>Clear scope, transparent fixed quotes, zero surprises.</p></div>
          </div>
          <div style="margin-top:28px;">
            <a href="${rootRel}about/" class="btn p mag">Read my full background →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 4-Step Process -->
    <section id="process">
      <div class="wrap">
        <p class="eyebrow rv">Process</p>
        <h2 class="rv">From idea to <span class="g">growth.</span></h2>
        <div class="tl" id="tl">
          <i></i>
          <div class="card step rv"><small>01</small><h3>Discover</h3><p>We talk business goals, customers and budget. I map project scope, timeline and the fastest path to positive ROI.</p></div>
          <div class="card step rv"><small>02</small><h3>Design</h3><p>Wireframes and polished UI matching your exact brand — reviewed and approved before any production code is written.</p></div>
          <div class="card step rv"><small>03</small><h3>Develop</h3><p>Clean, fast, accessible code with regular staging previews so you see genuine progress every step of the way.</p></div>
          <div class="card step rv"><small>04</small><h3>Launch & Grow</h3><p>Domain, SSL, and edge CDN hosting setup, followed by technical SEO and advertising setup to win your first customers.</p></div>
        </div>
      </div>
    </section>

    <!-- Verified Client Testimonials -->
    <section>
      <div class="wrap">
        <p class="eyebrow rv">Kind words</p>
        <h2 class="rv">What clients say.</h2>
        <div class="tests">
          ${cases.map(c => `
          <figure class="card rv">
            <q>“${c.testimonial.quote}”</q>
            <b>${c.testimonial.company}</b>
            <span>${c.testimonial.author} · <a href="${c.url}" target="_blank" rel="noopener" style="text-decoration:underline;">${c.displayUrl}</a></span>
          </figure>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Frequently Asked Questions -->
    <section id="faq">
      <div class="wrap">
        <p class="eyebrow rv">FAQ</p>
        <h2 class="rv">Good questions, <span class="g">clear answers.</span></h2>
        <div class="faq">
          ${defaultFaq.map(f => `
          <details class="rv">
            <summary>${f[0]}</summary>
            <p>${f[1]}</p>
          </details>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Contact CTA Section -->
    <section id="contact">
      <div class="wrap">
        <div class="card final rv">
          <h2>Let's build something <span class="g">great.</span></h2>
          <p class="lead">Tell me about your business goals and ideas. I reply directly on WhatsApp, usually within a few hours.</p>
          <a class="btn p mag" id="waBtn" href="https://wa.me/{{WHATSAPP}}?text=Hi%20Prajin%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20project." target="_blank" rel="noopener">Chat on WhatsApp ↗</a>
          <form id="form" data-wa="{{WHATSAPP}}">
            <input id="fn" placeholder="Your name" aria-label="Your name" required>
            <textarea id="fm" rows="4" placeholder="What do you want to build? Tell me about your business..." aria-label="Your message" required></textarea>
            <button class="btn mag" type="submit">Send via WhatsApp</button>
          </form>
        </div>
      </div>
    </section>
  </main>
  `;

  const html = renderHead({
    title: 'Prajin Dezaa — Full-Stack Developer | Websites & Apps that Grow Businesses',
    metaDesc: 'Prajin Dezaa builds websites, e-commerce stores, B2B order apps, Android apps and custom software, plus Google/Meta ads and technical SEO. Based in Theni, Tamil Nadu, India.',
    pagePath,
    lang,
    dir: isRtl ? 'rtl' : 'ltr',
    schemaJson: schema
  }) + renderHeader(pagePath, lang) + bodyContent + renderFooter(pagePath);

  const outPath = lang === 'en' ? 'index.html' : `${lang}/index.html`;
  writePage(outPath, html);
}
