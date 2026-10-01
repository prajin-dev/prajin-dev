# STEP-TO-DO.md — Your Complete A-to-Z Action Guide

This guide tells you **exactly what to do from your side, step by step**, from buying your domain to getting your first international clients on WhatsApp and Google.

Everything technical in the code has already been built, tested, and automated. You do not need to write code or modify HTML files manually.

---

## 📋 Table of Contents
1. [Phase 1: Get Your Domain & Free Hosting](#phase-1-get-your-domain--free-hosting)
2. [Phase 2: One-Command Configuration](#phase-2-one-command-configuration)
3. [Phase 3: Deploy to the Web](#phase-3-deploy-to-the-web)
4. [Phase 4: Google & Search Engine Submission](#phase-4-google--search-engine-submission)
5. [Phase 5: Free Business Profiles & Local SEO](#phase-5-free-business-profiles--local-seo)
6. [Phase 6: Getting Backlinks & Real Client Reviews](#phase-6-getting-backlinks--real-client-reviews)
7. [Phase 7: Daily / Weekly Client Routine](#phase-7-daily--weekly-client-routine)

---

## Phase 1: Get Your Domain & Free Hosting

### Step 1.1: Buy a Domain Name
Choose a clean, professional domain for your personal brand:
- **Recommended names:** `prajindezaa.com`, `prajin.dev`, `prajindezaa.dev`, or `prajin.in`
- **Where to buy:**
  - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) (Cheapest, sells at wholesale price with zero markup)
  - [Namecheap](https://www.namecheap.com) or [Porkbun](https://porkbun.com)
  - [GoDaddy](https://www.godaddy.com)
- *Cost:* Usually $8 to $12 per year (₹700 to ₹1,000/year).

### Step 1.2: Choose Your Hosting (100% Free)
You do **not** need to pay for hosting. Choose one of these 4 edge hosting services (all free, fast, and secure):

| Host | Best For | Why Choose It |
|---|---|---|
| **Cloudflare Pages** ⭐ *(Recommended)* | Maximum global speed & security | Fastest worldwide CDN, built-in DDoS defense, free automated SSL, unlimited bandwidth. |
| **Vercel** | Easiest deployment | Drag-and-drop or 1-click GitHub connect, clean custom domains. |
| **Netlify** | Simple & reliable | Drag-and-drop folder upload, free forms, automatic SSL. |
| **GitHub Pages** | Git-only workflow | Free hosting directly inside your GitHub repository. |

---

## Phase 2: One-Command Configuration

Once you have your domain name, you only need to run **one command** in your terminal.

### Step 2.1: Open Terminal in Your Project Folder
Open PowerShell or your terminal in `c:\Users\Admin\Downloads\prajin-portfolio\prajin-portfolio`.

### Step 2.2: Run the Setup Wizard
```bash
npm run set-config
```

The wizard will ask you 4 quick questions:
1. **Enter your final production domain:**
   Type your full domain with `https://`, for example:
   ```
   https://prajindezaa.com
   ```
2. **Choose your host (1-4):**
   - Press `1` for Cloudflare Pages (Recommended)
   - Press `2` for Vercel
   - Press `3` for Netlify
   - Press `4` for GitHub Pages
3. **Verify WhatsApp number:**
   Press Enter to keep `919360970236` (or enter a new one if changed).
4. **Verify Email address:**
   Press Enter to keep `prajindezaa142@gmail.com`.

*That's it!* The wizard automatically updates:
- Every canonical URL across all 42 pages
- The XML sitemaps (`sitemap.xml` and `sitemap-index.xml`)
- The JSON-LD Schema.org graphs
- Open Graph social share preview tags
- Hreflang tags across all 11 languages

### Step 2.3: Build & Verify Production Code
Run this command to produce the final deployable files:
```bash
npm run build:prod
```
Then run the pre-flight check:
```bash
npm run deploy:check
```
It will check all 42 pages and print:
`🎉 ALL CHECKS PASSED! Your site is 100% ready for deployment.`

---

## Phase 3: Deploy to the Web

Choose the option matching your host from Phase 1:

### Option A: Cloudflare Pages (Recommended)
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com/) and create a free account.
2. Click **Compute (Workers & Pages)** → **Create application** → **Pages**.
3. **Choice 1 (Direct Upload - Fastest):**
   - Click **Upload assets**.
   - Name your project (e.g. `prajin-portfolio`).
   - Drag and drop your **`dist`** folder directly into the browser.
   - Click **Deploy site**.
4. **Choice 2 (Connect to GitHub - Automatic Updates):**
   - Connect your GitHub repo.
   - Set Build command to: `npm run build:prod`
   - Set Output directory to: `dist`
   - Click **Save and Deploy**.
5. **Connect your custom domain:**
   - In your project settings, click **Custom domains** → **Set up a custom domain**.
   - Type your domain (e.g. `prajindezaa.com`).
   - Cloudflare will automatically handle DNS and activate free HTTPS SSL.

---

### Option B: Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub or email.
2. Click **Add New** → **Project**.
3. Import your GitHub repository, or install Vercel CLI (`npm i -g vercel`) and run `vercel deploy --prod ./dist`.
4. In **Settings** → **Domains**, add `yourdomain.com`.

---

### Option C: Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Go to **Sites** and drag & drop the **`dist`** folder into the browser.
3. In **Domain management**, click **Add custom domain** and enter your domain name.

---

### Option D: GitHub Pages
1. Push your project to a GitHub repository named `prajin-portfolio`.
2. In GitHub, go to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The file `.github/workflows/pages.yml` already created in your repo will automatically build and publish your site!

---

## Phase 4: Google & Search Engine Submission

Now that your website is live on the internet, tell Google, Bing, and other search engines to index it.

### Step 4.1: Google Search Console (Crucial)
1. Go to [search.google.com/search-console](https://search.google.com/search-console).
2. Click **Add Property**.
3. Choose **Domain** and enter your domain (e.g., `prajindezaa.com`).
4. Copy the TXT verification record shown by Google.
5. In your domain DNS manager (Cloudflare or Namecheap), add a new `TXT` record with that code.
6. Once verified, click **Sitemaps** on the left menu.
7. Under **Add a new sitemap**, type:
   ```
   sitemap.xml
   ```
   and click **Submit**. Google will now crawl and index all 42 pages.

---

### Step 4.2: Bing Webmaster Tools & IndexNow
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Sign in and click **Import from Google Search Console**. (This imports and verifies your site instantly in 10 seconds!).
3. Under Sitemaps, verify that `https://yourdomain.com/sitemap.xml` is submitted.
4. **Activate Instant IndexNow:**
   In your terminal, run:
   ```bash
   node tools/ping-indexnow.mjs
   ```
   This immediately alerts Bing, Yandex, Naver, and Seznam to index your pages without waiting for standard crawl cycles.

---

## Phase 5: Free Business Profiles & Local SEO

To show up in the Google Map pack and build domain trust:

### Step 5.1: Google Business Profile (Free)
1. Go to [google.com/business](https://www.google.com/business).
2. Business Name: `Prajin Dezaa — Full-Stack Web Developer`
3. Category: `Software Company` or `Website Designer`.
4. Address: Theni, Tamil Nadu, India.
5. Service Area: Select *Theni*, *Tamil Nadu*, *India*, and add *United States*, *United Kingdom*, *United Arab Emirates* as remote service areas.
6. Website: Enter your live website URL (`https://yourdomain.com`).
7. Phone: `+91 93609 70236`.

### Step 5.2: Sync with Bing Places & Apple Maps
- Go to [bingplaces.com](https://www.bingplaces.com) and click **Import from Google My Business**.
- Go to [businessconnect.apple.com](https://businessconnect.apple.com) to list your service on Apple Maps.

---

## Phase 6: Getting Backlinks & Real Client Reviews

Backlinks and reviews give your website authority so it outranks competitors.

### Step 6.1: Ask Your Real Clients for Google Reviews
Send this exact WhatsApp message to your satisfied clients (Kalasam Industries, JKI Orders, Aparna Stores):
> *"Hi [Client Name]! I'm really glad our recent project is running smoothly. Could you take 30 seconds to leave a brief review on my Google profile? It really helps my freelance business grow: [Insert your Google Review Link]. Thank you so much!"*

### Step 6.2: Add Footer Backlinks on Client Websites
On the websites you built for clients, ensure the footer has a subtle credit linking back to you:
```html
<a href="https://yourdomain.com" target="_blank" rel="noopener">Website engineered by Prajin Dezaa</a>
```
*(Every client site linking to you passes real domain authority).*

### Step 6.3: Update Your Social & Developer Profiles
Add your website link to:
- **LinkedIn:** In your Bio and "Featured Links" section.
- **Instagram:** In your bio link (`prajindezaa.com`).
- **GitHub:** In your profile bio and pinned repository READMEs.

---

## Phase 7: Daily / Weekly Client Routine

How to turn website visitors into paying projects:

### 1. WhatsApp Notifications
- Every CTA button on your website, service page, case study, and blog opens WhatsApp with a pre-filled message directly to your number `+91 93609 70236`.
- Keep WhatsApp notifications turned ON.
- Reply to inquiries within 15–30 minutes whenever possible. Fast responses close 80% more deals.

### 2. When a Client Contacts You
Follow this simple 3-step conversation formula:
1. **Acknowledge & Ask:**
   *"Hi [Name], great to connect! Tell me a bit about your business and what features you are looking for in the website/app."*
2. **Share Live Proof:**
   Send a link to your relevant case study:
   - For corporate/exports: Send `yourdomain.com/work/kalasam-jaikrishna-industries/`
   - For B2B/ordering apps: Send `yourdomain.com/work/jki-orders-b2b-platform/`
   - For stores/grocery: Send `yourdomain.com/work/aparna-stores-ecommerce/`
3. **Offer a Fixed Quote:**
   Never charge open-ended hourly rates. Give them a clear scope, milestone timeline (1–2 weeks for sites, 3–6 weeks for apps), and a fixed price upfront.

---

## Summary of Commands Reference

| What you want to do | Terminal Command |
|---|---|
| **Preview website locally on your computer** | `npm run dev` (opens `http://localhost:3000`) |
| **Set your live domain and host** | `npm run set-config` |
| **Re-build all pages** | `npm run build` |
| **Build final production bundle** | `npm run build:prod` |
| **Verify site health before deploying** | `npm run deploy:check` |
| **Run complete SEO & Schema audit** | `npm run audit` |
| **Ping search engines to index new pages** | `node tools/ping-indexnow.mjs` |

You are now 100% prepared. Follow Phase 1 to pick your domain, run `npm run set-config`, and push your site live!
