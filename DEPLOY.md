# Deployment & Host Configuration Guide

This portfolio is architected for zero-rework deployment across all four leading edge hosting platforms:
1. **Cloudflare Pages** (Recommended for worldwide sub-50ms latency & edge caching)
2. **Vercel**
3. **Netlify**
4. **GitHub Pages**

---

## The 3-Step Production Deployment Guide

Once you have your live domain name and chosen host, follow these 3 simple steps:

### Step 1: Set Your Live Domain & Host
Run the interactive configuration CLI:
```bash
npm run set-config
```
You will be prompted for:
- **Production Domain:** (e.g., `https://prajindezaa.com` or `https://prajin.dev`)
- **Hosting Platform:** (Select Cloudflare Pages / Vercel / Netlify / GitHub Pages)
- **Contact details & verification keys:** (Optional or press Enter to keep current values)

This automatically updates `site.config.json` as the single source of truth.

### Step 2: Build & Verify Production Output
Run the production build:
```bash
npm run build:prod
```
Then run the automated deployment health check:
```bash
npm run deploy:check
```
**Verification Guarantee:** `deploy:check` inspects every file in `dist/` to ensure:
- Zero leftover `{{...}}` placeholder tokens.
- All canonical tags, Open Graph URLs, XML sitemaps, and Schema `@id`s point to your live domain.
- `robots.txt` is updated to production indexable status (`Allow: /`).
- No broken links exist across any of the multi-page routes.

### Step 3: Connect & Deploy to Your Host

---

### Option A: Cloudflare Pages (Recommended)
1. **Repository Push:** Push your repository to GitHub or GitLab.
2. **Connect Cloudflare:** In the Cloudflare Dashboard, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. **Build Settings:**
   - **Framework preset:** `None`
   - **Build command:** `npm run build:prod`
   - **Build output directory:** `dist`
4. **Custom Domain:**
   - Go to your Pages project → **Custom domains** → **Set up a custom domain**.
   - Cloudflare will automatically provision SSL/TLS, HTTP/3, and Brotli compression.
   - The included `_headers` and `_redirects` files in `dist/` are automatically applied by Cloudflare Pages.

---

### Option B: Vercel
1. Install Vercel CLI or import repository in [vercel.com](https://vercel.com).
2. **Build Settings:**
   - **Output Directory:** `dist`
   - **Build Command:** `npm run build:prod`
3. The included `vercel.json` automatically configures optimal caching headers, HTTPS enforcement, and clean URLs.
4. Add your domain in **Project Settings** → **Domains**.

---

### Option C: Netlify
1. Connect your repository at [netlify.com](https://netlify.com).
2. **Build Settings:**
   - **Build command:** `npm run build:prod`
   - **Publish directory:** `dist`
3. Netlify automatically detects `_headers` and `_redirects` inside `dist/`.
4. Configure your custom domain with free automatic Let's Encrypt SSL.

---

### Option D: GitHub Pages
1. In `site.config.json`, set `"host": "GitHub Pages"`.
2. The included GitHub Actions workflow `.github/workflows/pages.yml` automatically triggers on push to `main`, executes `npm run build:prod`, and publishes `dist/` directly to GitHub Pages.
3. In repository **Settings** → **Pages** → **Custom domain**, enter your domain name and check **Enforce HTTPS**.

---

## 4. Post-Deployment Verification & Search Engine Pings

Immediately after your live site is live:
1. **Google Search Console:** Submit `https://your-domain.com/sitemap.xml`.
2. **Bing Webmaster Tools:** Submit `https://your-domain.com/sitemap.xml` and import verification from Google.
3. **IndexNow Instant Ping:**
   Execute our built-in IndexNow submission script:
   ```bash
   node tools/ping-indexnow.mjs
   ```
   This immediately informs Bing, Yandex, Naver, and Seznam to index your updated URLs within minutes.
