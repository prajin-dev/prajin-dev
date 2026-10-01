import https from 'https';
import fs from 'fs';

// Automated IndexNow Submission Utility
// Pings Bing, Yandex, Naver, and Seznam to index updated URLs within minutes

const config = JSON.parse(fs.readFileSync('site.config.json', 'utf8'));

if (config.domain.includes('localhost') || config.domain.includes('{{DOMAIN}}')) {
  console.log('Skipping IndexNow ping: Domain is in staging/placeholder mode.');
  process.exit(0);
}

const key = config.analytics.indexNowKey || 'prajinindexnowkey2026';
const host = config.domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

// Load URLs from sitemap
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const payload = JSON.stringify({
  host: host,
  key: key,
  keyLocation: `${config.domain}/${key}.txt`,
  urlList: urls
});

const req = https.request('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  }
}, res => {
  console.log(`IndexNow Ping Status: ${res.statusCode} ${res.statusMessage}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', e => {
  console.error(`IndexNow Ping Error: ${e.message}`);
});

req.write(payload);
req.end();
