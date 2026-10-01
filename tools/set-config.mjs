import readline from 'readline';
import fs from 'fs';

// Interactive Configuration CLI for site.config.json
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const configPath = 'site.config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

console.log('\n======================================================');
console.log('  Prajin Dezaa Portfolio — Production Setup Wizard');
console.log('======================================================\n');
console.log('Current configuration:');
console.log(`Domain:   ${config.domain}`);
console.log(`Host:     ${config.host}`);
console.log(`WhatsApp: ${config.whatsapp}`);
console.log(`Email:    ${config.email}\n`);

function ask(question, defaultVal) {
  return new Promise(resolve => {
    rl.question(`${question} [${defaultVal}]: `, answer => {
      resolve(answer.trim() || defaultVal);
    });
  });
}

async function run() {
  config.domain = await ask('Enter your final production domain (with https)', config.domain === '{{DOMAIN}}' ? 'https://prajindezaa.com' : config.domain);
  
  console.log('\nSelect your hosting platform:');
  console.log('1) Cloudflare Pages (Recommended)');
  console.log('2) Vercel');
  console.log('3) Netlify');
  console.log('4) GitHub Pages');
  const hostChoice = await ask('Choose host (1-4)', '1');
  const hostMap = {
    '1': 'Cloudflare Pages',
    '2': 'Vercel',
    '3': 'Netlify',
    '4': 'GitHub Pages'
  };
  config.host = hostMap[hostChoice] || 'Cloudflare Pages';

  config.whatsapp = await ask('Enter WhatsApp number without + or spaces', config.whatsapp === '{{WHATSAPP}}' ? '919360970236' : config.whatsapp);
  config.email = await ask('Enter primary contact email', config.email === '{{EMAIL}}' ? 'prajindezaa142@gmail.com' : config.email);
  config.github = await ask('Enter GitHub profile URL', config.github === '{{GITHUB}}' ? 'https://github.com/prajindezaa' : config.github);

  const setVerif = await ask('Do you want to enter Search Console verification codes now? (y/n)', 'n');
  if (setVerif.toLowerCase() === 'y') {
    config.verification.google = await ask('Google Verification meta content', '');
    config.verification.bing = await ask('Bing Verification meta content', '');
    config.verification.yandex = await ask('Yandex Verification meta content', '');
    config.verification.baidu = await ask('Baidu Verification meta content', '');
    config.verification.naver = await ask('Naver Verification meta content', '');
  } else {
    config.verification.google = '';
    config.verification.bing = '';
    config.verification.yandex = '';
    config.verification.baidu = '';
    config.verification.naver = '';
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');

  console.log('\n✓ site.config.json has been updated successfully!');
  console.log('\nNext steps:');
  console.log('1. Run: npm run build:prod');
  console.log('2. Run: npm run deploy:check');
  console.log('3. Deploy dist/ to ' + config.host + '\n');
  rl.close();
}

run();
