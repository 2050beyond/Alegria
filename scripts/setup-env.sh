#!/bin/bash

# Non-interactive version - uses environment variables or prompts
# Usage: CLIENT_ID=xxx CLIENT_SECRET=xxx bash scripts/setup-env.sh

echo "🚀 Setting up Vercel Environment Variables"
echo "=========================================="
echo ""

# Generate NEXTAUTH_SECRET if not provided
if [ -z "$NEXTAUTH_SECRET" ]; then
  NEXTAUTH_SECRET=$(openssl rand -base64 32)
  echo "Generated NEXTAUTH_SECRET"
fi

# Check if credentials are provided
if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
  echo "⚠️  GitHub OAuth credentials not provided as environment variables"
  echo ""
  echo "Please create a GitHub OAuth App first:"
  echo "1. Go to: https://github.com/settings/developers"
  echo "2. Click 'New OAuth App'"
  echo "3. Use these values:"
  echo "   - Application name: Alegria TinaCMS Editor"
  echo "   - Homepage URL: https://20251130.vercel.app"
  echo "   - Authorization callback URL: https://20251130.vercel.app/api/auth/callback/github"
  echo "4. Copy the Client ID and Secret"
  echo ""
  echo "Then run:"
  echo "  CLIENT_ID=your_id CLIENT_SECRET=your_secret bash scripts/setup-env.sh"
  echo ""
  exit 1
fi

echo "📦 Adding environment variables to Vercel..."
echo ""

# Add each variable (non-interactive)
echo "$CLIENT_ID" | npx vercel env add GITHUB_CLIENT_ID production preview development 2>&1 | grep -v "Enter"
echo "$CLIENT_SECRET" | npx vercel env add GITHUB_CLIENT_SECRET production preview development 2>&1 | grep -v "Enter"
echo "https://20251130.vercel.app" | npx vercel env add NEXTAUTH_URL production preview development 2>&1 | grep -v "Enter"
echo "$NEXTAUTH_SECRET" | npx vercel env add NEXTAUTH_SECRET production preview development 2>&1 | grep -v "Enter"

echo ""
echo "✅ Environment variables added!"
echo ""
echo "🚀 Deploying to production..."
npx vercel --prod --yes

echo ""
echo "✅ Setup complete!"
echo ""
echo "Visit: https://20251130.vercel.app/?tina=1"
echo "Click the pencil icon → log in with GitHub → start editing!"

