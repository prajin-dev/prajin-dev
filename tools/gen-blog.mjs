import fs from 'fs';
import path from 'path';
import { renderHead, renderHeader, renderFooter, getRootRel } from './layout.mjs';
import { generateSchemaGraph } from './schema.mjs';

function writePage(relPath, htmlContent) {
  const fullPath = path.join('src', relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, htmlContent.trim() + '\n', 'utf8');
  console.log(`Generated: src/${relPath}`);
}

const posts = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf8'));
const services = JSON.parse(fs.readFileSync('src/data/services.json', 'utf8'));

// High-value 1200+ word original content for each article
const postContentMap = {
  "how-much-does-a-business-website-cost-in-2026": `
    <h2>The Real Cost of Building a Business Website in 2026</h2>
    <p>
      If you search the internet for "how much does a website cost," you will find answers ranging from $50 on automated site builders to $50,000+ at mid-sized digital design agencies. For most small business owners, corporate managers, and entrepreneurs, this massive variance is bewildering.
    </p>
    <p>
      In this comprehensive guide, we strip away marketing jargon and examine the actual engineering hours, infrastructure costs, and design investments required to launch a high-performance, conversion-focused business website in 2026 across major international markets including India, the United States, the United Kingdom, and the United Arab Emirates.
    </p>

    <h2>The Three Main Paths to Launching a Website</h2>
    <h3>1. DIY Website Builders (Wix, Squarespace, Shopify)</h3>
    <p>
      DIY platforms offer tempting low monthly subscription costs ($20–$80/month). However, they come with substantial hidden costs: high vendor lock-in, sluggish page load times caused by excessive third-party scripts, rigid template limitations, and poor technical SEO control. For a serious business attempting to rank on Google, DIY platforms often lead to high bounce rates and costly rebuilds within 12 to 18 months.
    </p>

    <h3>2. Traditional Full-Service Digital Agencies</h3>
    <p>
      Agencies provide peace of mind but bill massive overhead. You are not just paying for the developer's time; you are funding account executives, office rent, project managers, and substantial corporate markups. In the US and UK, standard agency rates range from $150 to $250 per hour, pushing typical 5-page corporate site proposals to $8,000–$25,000.
    </p>

    <h3>3. Independent Full-Stack Engineers & Specialized Studios</h3>
    <p>
      Partnering directly with a skilled full-stack developer offers the sweet spot: senior engineering craft, direct communication without intermediary account managers, cutting-edge speed optimization, and transparent fixed project pricing. Projects typically range from $600 to $2,500 depending on custom requirements, delivering superior Core Web Vitals and higher organic search rankings than agency builds.
    </p>

    <h2>Global Cost Comparison (2026 Benchmarks)</h2>
    <ul>
      <li><strong>Standard Corporate Business Website (5–8 Pages):</strong> India: ₹15,000 – ₹45,000 | USA: $800 – $2,500 | UK: £700 – £2,000 | UAE: AED 3,000 – AED 9,000</li>
      <li><strong>Custom E-Commerce Store with Payment Gateways:</strong> India: ₹35,000 – ₹90,000 | USA: $2,000 – $6,000 | UK: £1,800 – £5,000 | UAE: AED 7,500 – AED 20,000</li>
      <li><strong>B2B Ordering Platform or Custom PWA:</strong> India: ₹50,000 – ₹150,000 | USA: $3,000 – $10,000 | UK: £2,500 – £8,500 | UAE: AED 12,000 – AED 35,000</li>
    </ul>

    <h2>Critical Factors That Impact Your Quote</h2>
    <p>
      When evaluating web development proposals, look closely at:
    </p>
    <ol>
      <li><strong>Code Architecture:</strong> Is it a bloated WordPress template or clean semantic HTML5 and modern CSS?</li>
      <li><strong>Performance Guarantees:</strong> Does the developer guarantee 90+ mobile Google Lighthouse scores?</li>
      <li><strong>Technical SEO:</strong> Are canonicals, JSON-LD Schema, and XML sitemaps built into the scope?</li>
      <li><strong>Asset Ownership:</strong> Do you own the code, domain, and hosting accounts outright?</li>
    </ol>
  `,

  "how-to-build-a-b2b-ordering-app-for-distributors": `
    <h2>The Friction in Traditional B2B Wholesale Ordering</h2>
    <p>
      Wholesale distribution in manufacturing, FMCG, chemicals, and retail hardware is worth trillions of dollars globally. Yet, an astonishing percentage of distributor orders are still conducted via informal phone calls, fragmented WhatsApp voice notes, and paper purchase slips.
    </p>
    <p>
      When we partnered with JKI Orders, their distributors were spending hours each week attempting to confirm stock levels, track dispatch LR numbers, and request copies of GST invoices. Here is how we engineered a custom, lightweight B2B ordering ecosystem that transformed their operations.
    </p>

    <h2>Architecture of a Modern B2B Ordering Platform</h2>
    <h3>1. Simplified Authentication (Phone + PIN)</h3>
    <p>
      Distributors and field warehouse managers work in fast-paced, dusty environments. Requiring complex alphanumeric passwords with special characters causes constant login friction. We designed a secure mobile number verification flow backed by a persistent 4-digit PIN, allowing distributors to place orders in under 30 seconds.
    </p>

    <h3>2. 1-Tap Repeat Orders</h3>
    <p>
      In B2B wholesale, 80% of orders consist of recurring SKUs. The customer interface prioritizes previous order history, enabling distributors to replicate past orders with adjusted quantities in just one tap.
    </p>

    <h3>3. Real-Time Dispatch & Ledger Transparency</h3>
    <p>
      Distributors constantly call asking: "Has my parcel left the depot?" Our back-office platform allows warehouse personnel to enter lorry receipt (LR) numbers, transport carrier details, and dispatch timestamps. Distributors receive instant updates and can download official GST invoices directly to their phones.
    </p>

    <h2>Why a PWA + Standalone Android APK Wins Over Native App Store Builds</h2>
    <p>
      Distributors do not want to navigate app stores, download 100MB binaries, or deal with frequent store updates. By engineering an installable Progressive Web App (PWA) with a lightweight Android APK fallback (under 5MB), distributors installed the portal directly onto their home screens with zero friction.
    </p>
  `,

  "ecommerce-for-local-supermarkets-catalogue-bulk-pricing": `
    <h2>How Independent Supermarkets Can Win in the Quick-Commerce Era</h2>
    <p>
      Local supermarkets and grocery retailers possess unmatched advantages over centralized grocery apps: immediate community trust, deep supplier relationships, and physical proximity to customers. However, many lose younger customers because they lack an effortless online shopping interface.
    </p>
    <p>
      In this case breakdown, we look at how Aparna Stores (serving Theni since 1965) modernized their retail and bulk institutional grocery business with a custom mobile-first web store.
    </p>

    <h2>Core Architectural Requirements for Local E-Commerce</h2>
    <h3>1. Instant Search and Category Hierarchy</h3>
    <p>
      A typical grocery store stocks 2,000 to 10,000 distinct items. If the search bar takes more than 300 milliseconds to return results, customers abandon the site. We implemented instant client-side indexing and intuitive category pills (grains, oils, spices, household goods) allowing effortless cart building.
    </p>

    <h3>2. Bulk Quantity & Tiered Packaging Pricing</h3>
    <p>
      Unlike standard direct-to-consumer stores, grocery shoppers purchase in varied packaging units: 500g, 1kg, 5kg bags, or 25kg bulk sacks. Our custom e-commerce engine dynamically recalculates unit pricing based on pack sizes, incentivizing larger cart sizes from families and local restaurants.
    </p>

    <h3>3. Automated WhatsApp Order Dispatch</h3>
    <p>
      In regional markets across India, Southeast Asia, and the Middle East, WhatsApp is the dominant communication channel. By configuring automated WhatsApp cart dispatch, store managers receive neatly formatted order receipts with customer addresses and payment preferences, ready for immediate packing and dispatch.
    </p>
  `,

  "pwa-vs-native-android-app-what-small-businesses-should-choose": `
    <h2>The App Dilemma for Growing Businesses</h2>
    <p>
      Every growing business eventually asks: "Do we need our own mobile app?" Business owners know that having an icon on a customer's phone screen drastically increases repeat purchases and brand recall. However, traditional native mobile app development (building separately for iOS and Android) costs tens of thousands of dollars and requires ongoing maintenance.
    </p>
    <p>
      Fortunately, modern browser standards offer a powerful alternative: **Progressive Web Apps (PWAs)**. Here is an honest, technical comparison to help you choose the right path for your business.
    </p>

    <h2>What Is a Progressive Web App (PWA)?</h2>
    <p>
      A PWA is a website engineered with modern web standards (manifest file, service workers, and local caching) that behaves indistinguishably from a native mobile application. Users can install it directly onto their smartphone home screens without visiting the Google Play Store or Apple App Store.
    </p>

    <h2>Key Comparison Metrics</h2>
    <h3>1. Development and Maintenance Costs</h3>
    <p>
      Building separate native Android (Kotlin) and iOS (Swift) apps requires two distinct codebases and specialized engineers. A PWA uses a single unified codebase (HTML, CSS, JS), reducing development costs by 60% to 75% and ensuring feature parity across all devices.
    </p>

    <h3>2. Storage and Installation Friction</h3>
    <p>
      A native app typically requires 40MB to 150MB of phone storage and multiple minutes of downloading. A PWA installs in less than 3 seconds and consumes under 2MB of local disk space, making it ideal for users with budget smartphones or limited storage.
    </p>

    <h3>3. When to Choose a Native App Instead</h3>
    <p>
      Native apps are only necessary when your application requires advanced device hardware access: background Bluetooth beacons, intensive 3D gaming engines, or deep OS system integrations. For 95% of businesses—e-commerce, customer portals, B2B ordering, and service booking—a PWA is demonstrably superior in speed, cost, and conversion.
    </p>
  `,

  "technical-seo-checklist-for-new-business-websites": `
    <h2>Why Most New Websites Fail in Search Engines</h2>
    <p>
      Thousands of beautifully designed websites launch every single day, yet over 90% receive zero organic traffic from search engines. The culprit is almost always poor technical SEO: missing canonical tags, broken heading hierarchies, render-blocking scripts, and non-existent structured data.
    </p>
    <p>
      Search engines like Google, Bing, and AI search engines (Perplexity, ChatGPT Search) are automated algorithmic bots. If your code is not structured clearly, your content will never be discovered. Use this actionable technical SEO checklist on every new launch.
    </p>

    <h2>The Master Technical SEO Checklist</h2>
    <h3>1. Crawlability & Architecture</h3>
    <ul>
      <li><strong>Semantic Pre-Rendering:</strong> Ensure all core text, navigation, and case studies exist in the raw HTML payload (do not rely on client-side JS rendering).</li>
      <li><strong>Canonical Self-References:</strong> Every page must have a strict <code>&lt;link rel="canonical" href="https://your-domain.com/path/"&gt;</code> to eliminate duplicate content penalties.</li>
      <li><strong>URL Structure:</strong> Use lowercase, hyphenated, descriptive URLs with trailing-slash consistency.</li>
    </ul>

    <h3>2. Core Web Vitals & Performance</h3>
    <ul>
      <li><strong>Largest Contentful Paint (LCP):</strong> Keep LCP under 2.0 seconds by self-hosting fonts, optimizing images to WebP/AVIF, and deferring non-essential JavaScript.</li>
      <li><strong>Cumulative Layout Shift (CLS):</strong> Assign explicit <code>width</code> and <code>height</code> attributes to all images and video containers to maintain CLS under 0.05.</li>
    </ul>

    <h3>3. Structured Data (JSON-LD)</h3>
    <p>
      Implement connected Schema.org entities using <code>@graph</code>: Organization, Person, ProfessionalService, OfferCatalog, and BreadcrumbList. Validate everything using Google's Rich Results Test tool.
    </p>
  `,

  "export-business-website-checklist-how-manufacturers-win-international-buyers": `
    <h2>The Digital Procurement Shift in Global B2B Trade</h2>
    <p>
      In international manufacturing and chemical exports, procurement directors in Europe, North America, and the Middle East no longer rely solely on physical trade fairs. Before an international buyer requests a formal quote or initiates sample shipments, they conduct rigorous digital due diligence.
    </p>
    <p>
      If your manufacturing company's website looks outdated, lacks detailed product technical specifications, or loads slowly on international connections, foreign buyers immediately assume your factory quality is equally careless. Here is how export manufacturers can structure their digital presence to win global procurement trust.
    </p>

    <h2>Critical Website Elements for Export Manufacturers</h2>
    <h3>1. Comprehensive Technical Specifications & Purity Grades</h3>
    <p>
      Institutional chemical and industrial buyers require immediate access to purity percentages, melting points, CAS registry numbers, and packaging options (e.g. 25kg HDPE bags, palletized drums, OEM customized packs). Make this information instantly accessible on product pages without forcing users to fill out contact forms first.
    </p>

    <h3>2. Quality Certification Libraries</h3>
    <p>
      Prominently feature ISO certifications, GMP compliance badges, REACH documentation, and Material Safety Data Sheets (MSDS). International buyers need verifiable proof that your factory meets stringent import regulations in their target jurisdiction.
    </p>

    <h3>3. Low-Latency Worldwide Edge Delivery</h3>
    <p>
      A buyer loading your website from Frankfurt, Dubai, or Chicago will not wait 8 seconds for an Indian domestic hosting server to respond. Utilizing an international Content Delivery Network (Cloudflare Edge) ensures sub-second load times regardless of geographic location.
    </p>
  `
};

export function generateBlogPages() {
  // 1. Generate Blog Index Page
  const indexPath = '/blog/';
  const rootRel = getRootRel(indexPath);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: indexPath }
  ];

  const indexSchema = generateSchemaGraph({
    pageType: 'CollectionPage',
    pagePath: indexPath,
    pageTitle: 'Web Development & Technical SEO Engineering Blog — Prajin Dezaa',
    pageDesc: 'Actionable engineering articles, technical SEO guides, and B2B software case studies by full-stack developer Prajin Dezaa.',
    breadcrumbs,
    services
  });

  const indexBody = `
  <main id="main-content">
    <div class="page-header">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
          <a href="${rootRel}">Home</a>
          <span class="sep">/</span>
          <span class="curr">Blog</span>
        </nav>
        <div class="badge"><i></i> Engineering Insights & Technical Guides</div>
        <h1 style="max-width:20ch; margin-bottom:16px;">Web Development & <span class="g">Technical SEO</span> Blog</h1>
        <p class="lead" style="font-size:20px; max-width:68ch;">
          Practical, in-depth technical guides on building fast business websites, custom B2B apps, e-commerce stores, and dominating Google search results.
        </p>
      </div>
    </div>

    <div class="page-body">
      <div class="wrap">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:24px;">
          ${posts.map(p => `
          <article class="card rv" style="padding:32px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <p style="font-size:13px; color:var(--c1); margin-bottom:8px; font-weight:600;">${p.date} · ${p.readTime}</p>
              <h2 style="font-size:24px; margin-bottom:12px; line-height:1.2;">
                <a href="${rootRel}blog/${p.slug}/" style="hover:color:var(--c1);">${p.title}</a>
              </h2>
              <p style="color:var(--mut); font-size:15px; line-height:1.6; margin-bottom:20px;">
                ${p.excerpt}
              </p>
            </div>
            <div>
              <a href="${rootRel}blog/${p.slug}/" class="btn s mag" style="padding:8px 16px;">Read article →</a>
            </div>
          </article>
          `).join('')}
        </div>
      </div>
    </div>
  </main>
  `;

  const indexHtml = renderHead({
    title: 'Web Engineering & Technical SEO Blog | Prajin Dezaa',
    metaDesc: 'Technical web development, B2B software engineering, and technical SEO guides by Prajin Dezaa.',
    pagePath: indexPath,
    schemaJson: indexSchema
  }) + renderHeader(indexPath) + indexBody + renderFooter(indexPath);

  writePage('blog/index.html', indexHtml);

  // 2. Generate Each Launch Blog Article
  for (const p of posts) {
    const postPath = `/blog/${p.slug}/`;
    const postRootRel = getRootRel(postPath);

    const postBreadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: p.title, path: postPath }
    ];

    const postSchema = generateSchemaGraph({
      pageType: 'Article',
      pagePath: postPath,
      pageTitle: `${p.title} — Prajin Dezaa`,
      pageDesc: p.excerpt,
      breadcrumbs: postBreadcrumbs,
      services,
      article: p
    });

    const articleHtml = `
    <main id="main-content">
      <div class="page-header">
        <div class="wrap" style="max-width:860px;">
          <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
            <a href="${postRootRel}">Home</a>
            <span class="sep">/</span>
            <a href="${postRootRel}blog/">Blog</a>
            <span class="sep">/</span>
            <span class="curr">Article</span>
          </nav>
          <p style="font-size:13px; color:var(--c1); margin-bottom:10px; font-weight:600;">Published: ${p.date} · ${p.readTime}</p>
          <h1 style="font-size:clamp(32px, 5vw, 48px); margin-bottom:20px; line-height:1.15;">${p.title}</h1>
          <p class="lead" style="font-size:19px; max-width:64ch;">${p.excerpt}</p>
        </div>
      </div>

      <div class="page-body">
        <div class="wrap" style="max-width:860px;">
          <article class="prose">
            ${postContentMap[p.slug] || '<p>Article content coming soon.</p>'}

            <div class="author-box">
              <img src="${postRootRel}assets/images/me.jpg" alt="Prajin Dezaa - Author and Full-Stack Developer">
              <div>
                <h3 style="font-size:18px; margin-bottom:4px;">Written by Prajin Dezaa</h3>
                <p style="font-size:14px; color:var(--mut); margin:0;">
                  Full-stack developer from Theni, Tamil Nadu, India. Specializing in high-performance corporate websites, custom B2B apps, and technical SEO.
                </p>
              </div>
            </div>

            <div class="card" style="padding:32px; margin-top:40px; text-align:center;">
              <h3 style="font-size:22px; margin-bottom:12px;">Need help with your website or software project?</h3>
              <p style="color:var(--mut); max-width:48ch; margin:0 auto 20px;">
                Get in touch directly with Prajin Dezaa for a free discovery consultation and transparent upfront fixed quote.
              </p>
              <a class="btn p mag" href="https://wa.me/{{WHATSAPP}}?text=${encodeURIComponent(`Hi Prajin, I read your article on '${p.title}' and want to discuss a project.`)}" target="_blank" rel="noopener">Chat on WhatsApp ↗</a>
            </div>
          </article>
        </div>
      </div>
    </main>
    `;

    const fullPostHtml = renderHead({
      title: `${p.title} | Prajin Dezaa`,
      metaDesc: p.excerpt,
      pagePath: postPath,
      ogType: 'article',
      schemaJson: postSchema,
      isArticle: true
    }) + renderHeader(postPath) + articleHtml + renderFooter(postPath);

    writePage(`blog/${p.slug}/index.html`, fullPostHtml);
  }
}
