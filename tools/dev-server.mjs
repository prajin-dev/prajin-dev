import http from 'http';
import fs from 'fs';
import path from 'path';

// Minimal local preview server with zero dependencies
const PORT = 3000;
const DIST_DIR = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  } else if (!path.extname(reqPath)) {
    reqPath += '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, '404.html');
    res.statusCode = 404;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const data = fs.readFileSync(filePath);
    res.setHeader('Content-Type', mime);
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.end('Server Error: ' + err.message);
  }
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  Local Development Preview Server Active!`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Serving: ${DIST_DIR}`);
  console.log(`  Press Ctrl + C to stop`);
  console.log(`======================================================\n`);
});
