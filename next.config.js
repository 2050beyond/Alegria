const createMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  // Only load TinaCMS in edit mode
  webpack: (config, { isServer }) => {
    if (!process.env.NEXT_PUBLIC_TINA_EDIT_MODE) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'tinacms': false,
      }
    }
    return config
  },
}

module.exports = createMDX(nextConfig)

