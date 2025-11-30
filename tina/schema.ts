import { defineSchema } from 'tinacms'

export default defineSchema({
  collections: [
    {
      name: 'post',
      label: 'Blog Posts',
      path: 'content/blog/posts',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          isTitle: true,
          required: true,
        },
        {
          type: 'datetime',
          name: 'date',
          label: 'Date',
          required: true,
        },
        {
          type: 'rich-text',
          name: 'excerpt',
          label: 'Excerpt',
        },
        {
          type: 'rich-text',
          name: 'body',
          label: 'Body',
          isBody: true,
        },
        {
          type: 'image',
          name: 'heroImage',
          label: 'Hero Image',
          required: false,
        },
        {
          type: 'string',
          name: 'videoUrl',
          label: 'Video URL (YouTube/Vimeo)',
          required: false,
        },
      ],
    },
    {
      name: 'page',
      label: 'Static Pages',
      path: 'content/pages',
      format: 'mdx',
      fields: [
        {
          type: 'rich-text',
          name: 'about',
          label: 'About Content',
        },
        {
          type: 'rich-text',
          name: 'careers',
          label: 'Careers Content',
        },
        {
          type: 'rich-text',
          name: 'contact',
          label: 'Contact Content',
        },
        {
          type: 'object',
          name: 'contactForm',
          label: 'Contact Form Fields',
          fields: [
            {
              type: 'string',
              name: 'name',
              label: 'Name Field',
            },
            {
              type: 'string',
              name: 'email',
              label: 'Email Field',
            },
            {
              type: 'string',
              name: 'message',
              label: 'Message Field',
            },
          ],
        },
      ],
    },
    {
      name: 'global',
      label: 'Site Settings',
      path: 'content/global',
      format: 'json',
      fields: [
        {
          type: 'string',
          name: 'siteTitle',
          label: 'Site Title',
        },
        {
          type: 'string',
          name: 'description',
          label: 'Site Description',
        },
      ],
    },
  ],
})
