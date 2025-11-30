# Vercel Environment Variables Setup

## Required Environment Variables

Set these in your Vercel project settings (https://vercel.com/dashboard → Your Project → Settings → Environment Variables):

### 1. GitHub Token
```
GITHUB_TOKEN=your_personal_access_token_here
```
- Get from: https://github.com/settings/tokens
- Required scope: `repo` (for private repos) or `public_repo` (for public repos)
- This allows TinaCMS to commit changes to the GitHub repository

### 2. TinaCMS Client ID
```
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
```
- Get from: https://app.tina.io
- Create a new project or use existing project credentials

### 3. TinaCMS Client Secret
```
TINA_CLIENT_SECRET=your_tina_client_secret
```
- Get from: https://app.tina.io
- Same project as above

### 4. TinaCMS Token
```
TINA_TOKEN=your_tina_token
```
- Get from: https://app.tina.io
- Project token for authentication

### 5. Branch (Optional)
```
NEXT_PUBLIC_TINA_BRANCH=main
```
- Defaults to `main` if not set
- Should match your GitHub branch

### 6. Webhook Secret (Optional)
```
VERCEL_WEBHOOK_SECRET=your_webhook_secret
```
- Optional: For webhook signature verification
- Can be any random string

## How to Set in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project (should be linked to `2050beyond/Alegria`)
3. Go to **Settings** → **Environment Variables**
4. Add each variable above
5. Make sure to select **Production**, **Preview**, and **Development** environments
6. Click **Save**

## After Setting Variables

1. **Redeploy** your project (Vercel will automatically rebuild on next push, or manually trigger from dashboard)
2. Test the editing flow:
   - Visit your site
   - Click "Edit this page" (top-right)
   - Log in with GitHub
   - Make a test edit
   - Click "Save & Publish"
   - Verify the commit appears in https://github.com/2050beyond/Alegria

## Verification

After setting variables and redeploying:
- Visit `yoursite.com/?tina=1` (should show edit mode if authenticated)
- Visit `yoursite.com/admin?tina=1` (should show TinaCMS admin)
- Make a test edit and verify it commits to GitHub

