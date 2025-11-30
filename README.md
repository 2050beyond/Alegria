# Minimal Restrained Blog

A production-ready, extremely fast static blog built with Next.js 15, TypeScript, and Tailwind CSS, with TinaCMS for content management.

## Content Management

**Content lives in [https://github.com/2050beyond/Alegria](https://github.com/2050beyond/Alegria) — edit via `/?tina=1` after GitHub login**

All content is stored in the GitHub repository and pulled on every build. Clients can edit content directly through the TinaCMS interface without needing to understand Git or Markdown.

## Getting Started

Install dependencies:

```bash
npm install
```

Set up environment variables (see `.env.example`):

```bash
cp .env.example .env.local
```

Fill in your GitHub token and TinaCMS credentials.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

Build the static site:

```bash
npm run build
```

The output will be in the `.next` directory, ready for deployment.

## Deployment

This project is optimized for deployment on Vercel. 

**Pushes to main auto-deploy on Vercel** — every commit to the main branch triggers an automatic rebuild and deployment.

Simply connect your repository and deploy with one click. All environment variables should be set in Vercel's project settings.

## Features

- **Static Generation**: All pages are statically generated at build time for maximum performance
- **MDX Support**: Blog posts are written in MDX format
- **TinaCMS Integration**: Visual content editing with GitHub backend
- **Minimal Design**: Restrained, brutalist-minimal aesthetic
- **Performance**: Optimized for 100/100 Lighthouse scores
- **TypeScript**: Full type safety throughout

## Project Structure

```
content/
  blog/posts/       # MDX blog posts (synced from GitHub)
  pages/            # Static pages content
  global/           # Global site settings

app/
  blog/
    [slug]/         # Dynamic blog post pages
  about/            # About page
  careers/          # Careers page
  contact/          # Contact page
  admin/            # TinaCMS admin interface
  lib/              # Utility functions
  globals.css       # Global styles
  layout.tsx        # Root layout
  page.tsx          # Home/blog index

tina/
  config.ts         # TinaCMS configuration
  schema.ts         # Content schema definitions
```

## Editing Content

1. Visit your site and click "Edit this page" (top-right)
2. Log in with GitHub OAuth
3. Edit content inline using the visual editor
4. Click "Save & Publish" to commit changes to GitHub
5. Vercel automatically rebuilds and deploys in 2-3 minutes

See `HANDOFF.md` for client-facing documentation.

