# Initial SEO & Performance Audit: Prajin Dezaa Portfolio

**Audit Date:** October 2026  
**Auditor:** Senior Technical SEO, International SEO & Web Performance Engineering  
**Subject:** `prajin-portfolio/index.html` (Baseline Single-Page Application)  
**Target:** Global Search Visibility (India, US, UK, Canada, Australia, UAE, Europe, Worldwide)

---

## 1. Executive Summary & Baseline Score Simulation

The baseline site was an ultra-compact, zero-build single-file HTML/CSS/JS application. While visually sleek and responsive with real-time 3D WebGL (Three.js r128) and smooth scroll (Lenis + GSAP), it suffered from fatal technical SEO and performance bottlenecks:

| Metric Category | Baseline Estimate | Simulated Production Target | Key Issues |
|---|---|---|---|
| **Performance (Mobile)** | **34 - 48 / 100** | **96 - 100 / 100** | 390KB base64 images blocking HTML parse, Three.js & GSAP on main thread, Google Fonts render-blocking |
| **Performance (Desktop)**| **62 - 74 / 100** | **98 - 100 / 100** | Base64 inlining, uncompressed fonts, synchronous script parsing |
| **Accessibility** | **82 / 100** | **100 / 100** | Contrast ratios on muted texts, focus outlines, button labels |
| **Best Practices** | **78 / 100** | **100 / 100** | No CSP, no security headers, deprecated CDN endpoints |
| **SEO** | **64 / 100** | **100 / 100** | SPA architecture, single URL targeting 12+ queries, JS-rendered DOM, missing canonicals, no hreflang, incomplete schema |

---

## 2. Core Crawlability & Indexability Problem: JavaScript Dependency

### The Risk
In the baseline `index.html`:
- The entire **Services bento grid (`#bento`)**, **Selected Work case studies (`#workList`)**, **Process timeline (`#tl`)**, **Client Testimonials (`#tests`)**, and **FAQ accordion (`#faq`)** were injected via client-side JavaScript execution (`innerHTML = SERVICES.map(...)`).
- Search engine spiders (Googlebot, Bingbot, YandexBot, Baidu Spider, Naver Yeti, Sogou, Seznam) and AI crawlers (GPTBot, PerplexityBot, ClaudeBot, CCBot) do not all execute client-side JavaScript reliably or with equal render budgets.
- Googlebot defers rendering of JavaScript to a secondary queue ("two-wave indexing"), causing indexation lag of days to weeks.
- Non-Google engines (Baidu, Yandex, Bing) often index strictly raw static HTML. When crawling the original raw HTML, these crawlers saw empty `<div id="bento"></div>` and `<div id="workList"></div>`.
- **Result:** None of the core target keywords ("B2B ordering app", "camphor manufacturer website", "supermarket ecommerce store", "PWA development") were found in the initial HTML document payload.

### The Fix
1. **Pre-render 100% of all content into static HTML** in the source files.
2. Maintain progressive enhancement: JavaScript only attaches event listeners, micro-interactions, and 3D canvas rendering without mutating or generating core textual content.
3. Every search engine and text-only reader receives full headings, paragraphs, descriptions, technical pills, and case study links upon HTTP status 200 response without requiring JavaScript execution.

---

## 3. Core Web Vitals & Performance Audit

### 3.1 Largest Contentful Paint (LCP)
- **Baseline:** ~4.8s on 4G Mobile.
- **Cause:** 390 KB single HTML file containing over 270 KB of base64-encoded strings (`IMG={ME:..., K1:...}`). Base64 encoding inflates binary file size by 33%. Inlining all images into `index.html` forced the browser to download every project screenshot before the HTML parser could even finish reading the document.
- **Fix:** Extract all images into standalone static image files. Generate modern formats (AVIF and WebP) alongside optimized JPEG fallbacks. Provide explicit `width` and `height` attributes to prevent CLS. Add `fetchpriority="high"` strictly to the hero portrait.

### 3.2 Cumulative Layout Shift (CLS)
- **Baseline:** ~0.14.
- **Cause:** Dynamically injected DOM nodes (`#workList`, `#bento`) expanded document height after scripts loaded, pushing footer and bottom sections downwards.
- **Fix:** Static semantic HTML markup with pre-calculated aspect ratios and CSS grid structures.

### 3.3 Total Blocking Time (TBT) & Interaction to Next Paint (INP)
- **Baseline:** ~620ms TBT.
- **Cause:** Synchronous loading of Three.js r128, GSAP 3.12.5, ScrollTrigger, and Lenis from `cdnjs.cloudflare.com` blocking DOM parsing and CPU time.
- **Fix:** Defer all secondary libraries; initialize Three.js 3D canvas and Lenis via `requestIdleCallback` / dynamic lazy initialization after initial layout paint.

### 3.4 Third-Party Requests & Network Weight
- **Baseline:** External Google Fonts stylesheet (`fonts.googleapis.com` + `fonts.gstatic.com`), external Cloudflare cdnjs scripts.
- **Fix:** Self-host WOFF2 font subsets for *Space Grotesk* and *Inter*. Eliminate third-party render-blocking network roundtrips.

---

## 4. On-Page, International & Technical SEO Audit

### 4.1 Keyword Targeting & Single-Page Architecture Flaw
- **Problem:** A single URL (`/`) tried to rank for "freelance web developer", "corporate website development", "b2b ordering platforms", "ecommerce development", "Android app development", and "custom software". In search engine algorithms, topical authority and query intent require dedicated landing pages with focused semantic keyword clusters.
- **Fix:** Multi-page static architecture with 8 distinct service pages, 3 comprehensive case study deep-dives, dedicated About, Process, FAQ, Contact, legal pages, and 6 high-authority technical blog articles.

### 4.2 Internationalization & Hreflang Deficit
- **Problem:** The baseline had no international search presence. No `hreflang` tags, no alternate language pages, no localized meta descriptions.
- **Fix:** Implement full reciprocal `hreflang` clusters covering 11 global languages (English, Hindi, Tamil, Arabic, Spanish, French, German, Portuguese-Brazil, Indonesian, Bahasa Malaysia, Japanese) and 7 high-intent market landing pages (USA, UK, UAE, Australia, Canada, Singapore, Germany). Include full `dir="rtl"` support for Arabic.

### 4.3 Structured Data (Schema.org) Gaps
- **Problem:** Single generic `Person` schema with missing contact points, no service catalog, no breadcrumb navigation, and no creative works.
- **Fix:** Full JSON-LD `@graph` implementation cross-linked with `@id`:
  - `Person` + `ProfessionalService`
  - `OfferCatalog` detailing all 8 core services
  - `BreadcrumbList` on every subpage
  - `CreativeWork` / `SoftwareApplication` for each case study
  - `Article` with author metadata for blog posts
  - Native `FAQPage` schema on the FAQ section

---

## 5. Prioritized Issue Matrix

| Priority | Category | Issue | Remediation |
|---|---|---|---|
| **CRITICAL** | Architecture | Content hidden in JavaScript arrays (`innerHTML`) | De-SPA into static multi-page HTML with pre-rendered copy. |
| **CRITICAL** | Performance | 390KB HTML bloated with Base64 data URIs | Extract images to standalone static assets with AVIF/WebP. |
| **HIGH** | SEO | Missing canonicals, robots.txt, sitemap.xml | Generate automated `sitemap.xml`, `robots.txt`, and canonical tags via `site.config.json`. |
| **HIGH** | International | Single language English with no regional reach | Deploy localized subpaths (`/hi/`, `/ta/`, `/ar/`, `/es/`, etc.) with reciprocal `hreflang`. |
| **HIGH** | CWV | Render-blocking Google Fonts & CDN scripts | Self-host WOFF2 fonts with `font-display: swap`; defer scripts. |
| **MEDIUM** | Schema | Shallow JSON-LD | Implement connected `@graph` schema (`ProfessionalService`, `OfferCatalog`, `BreadcrumbList`). |
| **MEDIUM** | Performance | Uncontrolled WebGL on low-power devices | Add GPU/memory detection, reduce particle count, respect `prefers-reduced-motion`. |
| **LOW** | Social/AI | Missing `llms.txt`, `security.txt`, Open Graph images | Add AI crawler manifesto (`llms.txt`), security disclosure, and 1200x630 OG graphics. |
