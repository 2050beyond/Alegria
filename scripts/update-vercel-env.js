const fs = require('fs');
const { execSync } = require('child_process');

if (!fs.existsSync('.env.vercel-update.json')) {
  console.error('❌ .env.vercel-update.json not found. Run create-oauth-app.js first.');
  process.exit(1);
}

const envVars = JSON.parse(fs.readFileSync('.env.vercel-update.json', 'utf8'));

console.log('Adding environment variables to Vercel...\n');

for (const [key, value] of Object.entries(envVars)) {
  try {
    console.log(`Setting ${key}...`);
    execSync(`npx vercel env add ${key} production`, {
      input: value + '\n',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    console.log(`✅ ${key} added\n`);
  } catch (error) {
    // Try to update if it exists
    try {
      console.log(`Updating ${key}...`);
      execSync(`echo "${value}" | npx vercel env rm ${key} production --yes`, { stdio: 'inherit' });
      execSync(`npx vercel env add ${key} production`, {
        input: value + '\n',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      console.log(`✅ ${key} updated\n`);
    } catch (e) {
      console.error(`❌ Failed to set ${key}:`, e.message);
    }
  }
}

console.log('✅ All environment variables added to Vercel!');
console.log('\nTriggering redeploy...');
execSync('npx vercel --prod --yes', { stdio: 'inherit' });

