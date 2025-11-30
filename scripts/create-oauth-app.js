const https = require('https');
const fs = require('fs');
const crypto = require('crypto');

// Read GITHUB_TOKEN from Vercel env or environment
let githubToken = process.env.GITHUB_TOKEN;

if (!githubToken && fs.existsSync('.env.vercel')) {
  const envContent = fs.readFileSync('.env.vercel', 'utf8');
  const match = envContent.match(/GITHUB_TOKEN=(.+)/);
  if (match) {
    githubToken = match[1].trim();
  }
}

if (!githubToken) {
  console.error('GITHUB_TOKEN not found. Please set it in Vercel or as environment variable.');
  process.exit(1);
}

// Create OAuth App
const oauthData = JSON.stringify({
  name: 'Alegria TinaCMS Editor',
  homepage_url: 'https://20251130.vercel.app',
  callback_url: 'https://20251130.vercel.app/api/auth/callback/github',
  scopes: ['repo', 'user:email']
});

// Try organization first (2050beyond), fallback to user
const org = '2050beyond';
const options = {
  hostname: 'api.github.com',
  path: `/orgs/${org}/oauth_applications`,
  method: 'POST',
  headers: {
    'Authorization': `token ${githubToken}`,
    'User-Agent': 'Alegria-Deployment',
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.github.v3+json',
    'Content-Length': oauthData.length
  }
};

console.log('Creating GitHub OAuth App...');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (d) => { body += d; });
  res.on('end', () => {
    if (res.statusCode === 201) {
      const app = JSON.parse(body);
      console.log('\n✅ OAuth App Created!');
      console.log(`CLIENT_ID=${app.client_id}`);
      console.log(`CLIENT_SECRET=${app.client_secret}`);
      
      // Generate NEXTAUTH_SECRET
      const nextAuthSecret = crypto.randomBytes(32).toString('base64');
      
      // Write to file for Vercel CLI
      const envVars = {
        GITHUB_CLIENT_ID: app.client_id,
        GITHUB_CLIENT_SECRET: app.client_secret,
        NEXTAUTH_URL: 'https://20251130.vercel.app',
        NEXTAUTH_SECRET: nextAuthSecret
      };
      
      fs.writeFileSync('.env.vercel-update.json', JSON.stringify(envVars, null, 2));
      console.log('\n📝 Environment variables ready in .env.vercel-update.json');
      console.log('\nNext: Run update-vercel-env.js to add these to Vercel');
    } else {
      console.error(`❌ Error creating OAuth app: ${res.statusCode}`);
      console.error(body);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
  process.exit(1);
});

req.write(oauthData);
req.end();

