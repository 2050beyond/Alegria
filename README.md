# Minimal Restrained Blog

A production-ready, extremely fast static blog built with Next.js 15, TypeScript, and Tailwind CSS.

## Getting Started

Install dependencies:

```bash
npm install
```

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

This project is optimized for deployment on Vercel. Simply connect your repository and deploy with one click.

## Features

- **Static Generation**: All pages are statically generated at build time for maximum performance
- **MDX Support**: Blog posts are written in MDX format
- **Minimal Design**: Restrained, brutalist-minimal aesthetic
- **Performance**: Optimized for 100/100 Lighthouse scores
- **TypeScript**: Full type safety throughout

## Project Structure

```
app/
  blog/
    posts/          # MDX blog posts
    [slug]/         # Dynamic blog post pages
  about/            # About page
  careers/          # Careers page
  contact/          # Contact page
  lib/              # Utility functions
  globals.css       # Global styles
  layout.tsx        # Root layout
  page.tsx          # Home/blog index
```

