#!/bin/bash

# Get GITHUB_TOKEN from Vercel env
if [ -f .env.vercel ]; then
  export GITHUB_TOKEN=$(grep GITHUB_TOKEN .env.vercel | cut -d '=' -f2 | tr -d '"' | tr -d "'")
fi

if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ GITHUB_TOKEN not found"
  exit 1
fi

# Generate NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "Creating GitHub OAuth App..."

# Try to create OAuth app via API
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alegria TinaCMS Editor",
    "homepage_url": "https://20251130.vercel.app",
    "callback_url": "https://20251130.vercel.app/api/auth/callback/github",
    "scopes": ["repo", "user:email"]
  }' \
  https://api.github.com/user/applications/oauth_apps 2>&1)

if echo "$RESPONSE" | grep -q "client_id"; then
  CLIENT_ID=$(echo "$RESPONSE" | grep -o '"client_id":"[^"]*' | cut -d'"' -f4)
  CLIENT_SECRET=$(echo "$RESPONSE" | grep -o '"client_secret":"[^"]*' | cut -d'"' -f4)
  
  echo "✅ OAuth App Created!"
  echo "CLIENT_ID=$CLIENT_ID"
  echo "CLIENT_SECRET=$CLIENT_SECRET"
  
  # Add to Vercel
  echo "$CLIENT_ID" | npx vercel env add GITHUB_CLIENT_ID production
  echo "$CLIENT_SECRET" | npx vercel env add GITHUB_CLIENT_SECRET production
  echo "https://20251130.vercel.app" | npx vercel env add NEXTAUTH_URL production
  echo "$NEXTAUTH_SECRET" | npx vercel env add NEXTAUTH_SECRET production
  
  echo "✅ Environment variables added to Vercel"
else
  echo "⚠️  Could not create OAuth app via API"
  echo "Response: $RESPONSE"
  echo ""
  echo "Please create OAuth app manually at:"
  echo "https://github.com/settings/developers"
  echo ""
  echo "Then run:"
  echo "echo 'CLIENT_ID=your_id' | npx vercel env add GITHUB_CLIENT_ID production"
  echo "echo 'CLIENT_SECRET=your_secret' | npx vercel env add GITHUB_CLIENT_SECRET production"
  echo "echo 'https://20251130.vercel.app' | npx vercel env add NEXTAUTH_URL production"
  echo "echo '$NEXTAUTH_SECRET' | npx vercel env add NEXTAUTH_SECRET production"
fi

