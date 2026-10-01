import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('index.html', 'utf8');

const keys = ['ME', 'K1', 'K2', 'J1', 'J2', 'A1', 'A2'];
fs.mkdirSync('assets/images', { recursive: true });

for (const k of keys) {
  const marker = `${k}:'data:image/`;
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    const endIdx = html.indexOf("'", idx + marker.length);
    const fullData = html.substring(idx + k.length + 2, endIdx);
    const [meta, b64] = fullData.split(',');
    const ext = meta.includes('jpeg') ? 'jpg' : 'png';
    const buf = Buffer.from(b64, 'base64');
    fs.writeFileSync(`assets/images/${k.toLowerCase()}.${ext}`, buf);
    console.log(`Extracted ${k} (${buf.length} bytes) to assets/images/${k.toLowerCase()}.${ext}`);
  } else {
    // try with space after colon
    const markerSpace = `${k}: 'data:image/`;
    const idx2 = html.indexOf(markerSpace);
    if (idx2 !== -1) {
      const endIdx = html.indexOf("'", idx2 + markerSpace.length);
      const fullData = html.substring(idx2 + k.length + 3, endIdx);
      const [meta, b64] = fullData.split(',');
      const ext = meta.includes('jpeg') ? 'jpg' : 'png';
      const buf = Buffer.from(b64, 'base64');
      fs.writeFileSync(`assets/images/${k.toLowerCase()}.${ext}`, buf);
      console.log(`Extracted ${k} (${buf.length} bytes) to assets/images/${k.toLowerCase()}.${ext}`);
    } else {
      console.log(`Key ${k} not found`);
    }
  }
}
