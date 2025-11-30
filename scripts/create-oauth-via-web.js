// Since GitHub API doesn't allow programmatic OAuth app creation,
// this script provides the exact values needed and instructions
const crypto = require('crypto');

console.log('📋 GitHub OAuth App Setup Instructions\n');
console.log('GitHub requires OAuth apps to be created via web interface.');
console.log('However, you can use these automated values:\n');

const nextAuthSecret = crypto.randomBytes(32).toString('base64');

console.log('1. Go to: https://github.com/settings/developers');
console.log('2. Click "New OAuth App"');
console.log('3. Fill in:');
console.log('   Application name: Alegria TinaCMS Editor');
console.log('   Homepage URL: https://20251130.vercel.app');
console.log('   Authorization callback URL: https://20251130.vercel.app/api/auth/callback/github');
console.log('4. Click "Register application"');
console.log('5. Copy the Client ID and generate a new client secret');
console.log('\nThen run this script with the credentials:');
console.log('node scripts/add-oauth-env.js CLIENT_ID CLIENT_SECRET\n');

// If credentials provided, add them to Vercel
if (process.argv[2] && process.argv[3]) {
  const { execSync } = require('child_process');
  const clientId = process.argv[2];
  const clientSecret = process.argv[3];
  
  console.log('\n✅ Adding environment variables to Vercel...\n');
  
  try {
    execSync(`echo "${clientId}" | npx vercel env add GITHUB_CLIENT_ID production`, { stdio: 'inherit' });
    execSync(`echo "${clientSecret}" | npx vercel env add GITHUB_CLIENT_SECRET production`, { stdio: 'inherit' });
    execSync(`echo "https://20251130.vercel.app" | npx vercel env add NEXTAUTH_URL production`, { stdio: 'inherit' });
    execSync(`echo "${nextAuthSecret}" | npx vercel env add NEXTAUTH_SECRET production`, { stdio: 'inherit' });
    
    console.log('\n✅ All environment variables added!');
    console.log('🚀 Triggering redeploy...\n');
    execSync('npx vercel --prod --yes', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

