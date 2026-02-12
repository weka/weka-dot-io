import { defineType, defineField } from 'sanity'
import { FiBook } from 'react-icons/fi'
import {portableTextConfig} from '../objects/portableTextConfig'

export default defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  icon: FiBook,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metadata', title: 'Metadata' },
    { name: 'seo', title: 'SEO' },
    { name: 'migration', title: 'Migration' },
  ],
  fields: [
    // Content fields
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'Short term name for listings (e.g., "Amazon S3")',
      group: 'content',
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
      description: 'Full page title (e.g., "What is Amazon S3?")',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'definition',
      title: 'Short Definition',
      type: 'text',
      rows: 3,
      description: 'Brief definition or summary',
      validation: (Rule) => Rule.max(300),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      ...portableTextConfig,
      validation: (Rule) => Rule.required(),
      description: 'Full explanation with sections, diagrams, examples, etc.',
      group: 'content',
    }),

    // Metadata fields
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'resourceMetadata',
      group: 'metadata',
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),

    // Migration metadata
    defineField({
      name: 'migrationData',
      title: 'Migration Data',
      type: 'migrationMetadata',
      group: 'migration',
    }),
  ],
  preview: {
    select: {
      title: 'term',
      media: 'featuredImage',
      publishedAt: 'metadata.publishedAt',
      category: 'metadata.categories.0.name',
    },
    prepare({ title, media, publishedAt, category }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'No date';
      return {
        title: title || 'Untitled',
        subtitle: `Glossary ${category ? `• ${category}` : ''} • ${date}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [{ field: 'metadata.publishedAt', direction: 'desc' }],
    },
    {
      title: 'Term A-Z',
      name: 'termAsc',
      by: [{ field: 'term', direction: 'asc' }],
    },
  ],
})
