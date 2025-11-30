# TinaCMS Setup Instructions

## Prerequisites

1. A GitHub repository for your project
2. A GitHub OAuth App (for authentication)

## Step 1: Create GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Your Blog CMS
   - **Homepage URL**: https://yoursite.com
   - **Authorization callback URL**: https://yoursite.com/api/tina/callback
4. Copy the **Client ID** and create a **Client Secret**

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_TINA_CLIENT_ID=your_github_oauth_client_id
TINA_CLIENT_SECRET=your_github_oauth_client_secret
TINA_TOKEN=your_tina_token
NEXT_PUBLIC_TINA_BRANCH=main
GITHUB_REPO=your-username/your-repo-name
```

## Step 3: Get TinaCMS Token

1. Go to https://app.tina.io
2. Sign up or log in
3. Create a new project
4. Copy your project token
5. Add it to `.env.local` as `TINA_TOKEN`

## Step 4: Update GitHub Repo Name

Update `GITHUB_REPO` in `.env.local` to match your repository (format: `owner/repo`)

## Step 5: Deploy

1. Add all environment variables to your Vercel project settings
2. Redeploy your site
3. Visit yoursite.com and click "Edit this page"

## Testing

1. Visit yoursite.com/login
2. You should be redirected to GitHub for authentication
3. After auth, you'll be redirected back with editing enabled
4. Click "Edit this page" to start editing

## Troubleshooting

- **Can't log in**: Check that your OAuth callback URL matches exactly
- **Can't save**: Verify your GitHub token has repo write permissions
- **Changes not appearing**: Wait 2-3 minutes for Vercel to rebuild

