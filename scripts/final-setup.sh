#!/bin/bash

echo "🚀 Final Setup Script for Alegria TinaCMS"
echo "=========================================="
echo ""

# Generate NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "📝 Step 1: Create GitHub OAuth App"
echo "-----------------------------------"
echo "GitHub requires OAuth apps to be created via web interface."
echo ""
echo "1. Go to: https://github.com/settings/developers"
echo "2. Click 'New OAuth App'"
echo "3. Fill in:"
echo "   - Application name: Alegria TinaCMS Editor"
echo "   - Homepage URL: https://20251130.vercel.app"
echo "   - Authorization callback URL: https://20251130.vercel.app/api/auth/callback/github"
echo "4. Click 'Register application'"
echo "5. Copy the Client ID"
echo "6. Click 'Generate a new client secret' and copy it"
echo ""
read -p "Press Enter after you have the Client ID and Secret..."

read -p "Enter GitHub Client ID: " CLIENT_ID
read -p "Enter GitHub Client Secret: " CLIENT_SECRET

echo ""
echo "📦 Step 2: Adding environment variables to Vercel..."
echo ""

# Add to each environment separately
for env in production preview development; do
  echo "Adding to $env environment..."
  echo "$CLIENT_ID" | npx vercel env add GITHUB_CLIENT_ID $env
  echo "$CLIENT_SECRET" | npx vercel env add GITHUB_CLIENT_SECRET $env
  echo "https://20251130.vercel.app" | npx vercel env add NEXTAUTH_URL $env
  echo "$NEXTAUTH_SECRET" | npx vercel env add NEXTAUTH_SECRET $env
done

echo ""
echo "✅ Environment variables added!"
echo ""
echo "🚀 Step 3: Deploying to production..."
npx vercel --prod --yes

echo ""
echo "✅ Setup complete!"
echo ""
echo "Visit: https://20251130.vercel.app/?tina=1"
echo "Click the pencil icon → log in with GitHub → start editing!"

