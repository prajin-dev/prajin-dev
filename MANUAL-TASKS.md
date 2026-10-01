# Manual Tasks & Action Checklist

Everything that requires your personal logins, business authentication, or third-party accounts is strictly itemized here. **No steps have been faked or simulated with dummy credentials.** Complete these tasks as you launch and promote your portfolio.

---

## 1. Domain & DNS Setup
- [ ] **Purchase Domain:** Register your preferred domain (e.g. `prajindezaa.com` or `prajin.dev`) at Namecheap, Cloudflare Registrar, GoDaddy, or Porkbun.
- [ ] **Set DNS to Chosen Host:**
  - If **Cloudflare Pages**: Set nameservers to Cloudflare.
  - If **Vercel**: Add `A` record `76.76.21.21` or `CNAME` `cname.vercel-dns.com`.
  - If **Netlify**: Add Netlify DNS or `CNAME`.
  - If **GitHub Pages**: Add apex A records (`185.199.108.153`, etc.) and `CNAME` file.
- [ ] **Configure site.config.json:** Run `npm run set-config` in your terminal and enter your live domain (e.g. `https://prajindezaa.com`) and selected host.

---

## 2. Search Console & Webmaster Verifications
- [ ] **Google Search Console (GSC):**
  - Sign in to [search.google.com/search-console](https://search.google.com/search-console).
  - Add property using **Domain verification (DNS TXT record)** (recommended) or HTML tag method.
  - Submit sitemap URL: `https://your-domain.com/sitemap.xml`.
- [ ] **Bing Webmaster Tools:**
  - Sign in to [bing.com/webmasters](https://www.bing.com/webmasters).
  - Import directly from Google Search Console with one click.
  - Submit `https://your-domain.com/sitemap.xml`.
  - Enable **IndexNow** using the generated key in `tools/generate-indexnow.mjs`.
- [ ] **Yandex Webmaster (for European & Global reach):**
  - Sign in to [webmaster.yandex.com](https://webmaster.yandex.com).
  - Add site and submit sitemap.
- [ ] **Baidu Webmaster (Ziyuan) & Naver Search Advisor:**
  - Naver: [searchadvisor.naver.com](https://searchadvisor.naver.com/) for South Korea.
  - Baidu: Note that ranking inside mainland China generally requires an ICP license; global indexing will still crawl international Chinese-language pages.

---

## 3. Analytics & Measurement Setup
- [ ] **Google Analytics 4 (GA4):**
  - Create a GA4 property at [analytics.google.com](https://analytics.google.com).
  - Copy your `G-XXXXXXXXXX` Measurement ID into `site.config.json` under `analytics.googleAnalyticsId`.
- [ ] **Custom Event Verification:**
  - Verify real-time events in GA4 DebugView for:
    - `whatsapp_click`
    - `form_submit`
    - `case_study_click`
    - `language_switch`

---

## 4. Local Business & Authority Citations
- [ ] **Google Business Profile:**
  - Set up a listing at [google.com/business](https://www.google.com/business).
  - Business Category: *Software Company* / *Website Designer*.
  - Address / Service Area: Theni, Tamil Nadu, India (and serving worldwide remotely).
- [ ] **Bing Places for Business:**
  - Sync automatically from Google Business Profile at [bingplaces.com](https://www.bingplaces.com).
- [ ] **Apple Business Connect:**
  - Claim listing at [businessconnect.apple.com](https://businessconnect.apple.com).
- [ ] **Verified Developer Platforms:**
  - Add your website link (`{{DOMAIN}}`) to your:
    - LinkedIn profile ("Featured" and "Contact info").
    - GitHub profile bio and README.
    - Instagram profile link.

---

## 5. Client Review & Testimonial Verification
- [ ] Send your satisfied clients at **Kalasam Jaikrishna Industries**, **JKI Orders**, and **Aparna Stores** a direct Google Business review link.
- [ ] Ensure that their official website footers include a discreet, high-value backlink (e.g. `<a href="https://your-domain.com" target="_blank" rel="noopener">Website engineered by Prajin Dezaa</a>`).

---

## 6. Language & Translation Review
- [ ] Have native speakers proofread high-priority translations before launching paid ad campaigns in non-English regions:
  - Arabic (UAE/Gulf market)
  - German (Germany/Austria/Switzerland)
  - French (France/Canada)
  - Spanish (Spain/Latin America)
  - Tamil & Hindi (Regional domestic market)
