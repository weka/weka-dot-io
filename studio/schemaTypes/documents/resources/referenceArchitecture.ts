import { defineType, defineField, defineArrayMember } from 'sanity'
import { FiLayers } from 'react-icons/fi'

export default defineType({
  name: 'referenceArchitecture',
  title: 'Reference Architecture',
  type: 'document',
  icon: FiLayers,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media & Files' },
    { name: 'metadata', title: 'Metadata' },
    { name: 'seo', title: 'SEO' },
    { name: 'migration', title: 'Migration' },
  ],
  fields: [
    // Common fields
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'resourceType',
      title: 'Resource Type',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      hidden: true,
      initialValue: {
        _type: 'reference',
        _ref: 'wp-category-resourcetype-reference-architecture',
      } as any,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(300),
      group: 'content',
      description: 'Brief description shown in resource listings',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      group: 'media',
    }),

    // Type-specific fields
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      group: 'content',
    }),
    defineField({
      name: 'architectureDiagram',
      title: 'Architecture Diagram',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      group: 'media',
      description: 'Main architecture diagram',
    }),
    defineField({
      name: 'pdfFile',
      title: 'PDF Download',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      group: 'media',
      description: 'Optional PDF version for download',
    }),
    defineField({
      name: 'isGated',
      title: 'Gated Content',
      type: 'boolean',
      group: 'content',
      description: 'Require form submission to access content',
      initialValue: false,
    }),

    // Shared metadata
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
      title: 'title',
      media: 'thumbnail',
      publishedAt: 'metadata.publishedAt',
      isGated: 'isGated',
    },
    prepare({ title, media, publishedAt, isGated }) {
      const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: isGated ? `🔒 • ${dateStr}` : dateStr,
        media,
      }
    },
  },
})
