import { defineType, defineField } from 'sanity'
import { FiFileText } from 'react-icons/fi'
import {portableTextConfig} from '../../objects/portableTextConfig'

export default defineType({
  name: 'analystReport',
  title: 'Analyst Report',
  type: 'document',
  icon: FiFileText,
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
        _ref: 'wp-category-resourcetype-analyst-report',
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
    defineField({
      name: 'body',
      title: 'Body',
      ...portableTextConfig,
      group: 'content',
    }),

    // Type-specific fields
    defineField({
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      group: 'media',
    }),
    defineField({
      name: 'isGated',
      title: 'Gated Content',
      type: 'boolean',
      group: 'content',
      description: 'Require form submission to access content (full page gating)',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((isGated, context) => {
          const isDownloadGated = (context.document as any)?.isDownloadGated
          if (isGated && isDownloadGated) {
            return 'Cannot have both Gated Content and Download Gated enabled'
          }
          return true
        }),
    }),
    defineField({
      name: 'isDownloadGated',
      title: 'Gated Download',
      type: 'boolean',
      group: 'content',
      description: 'Require form submission to download PDF (content remains visible)',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((isDownloadGated, context) => {
          const isGated = (context.document as any)?.isGated
          if (isDownloadGated && isGated) {
            return 'Cannot have both Download Gated and Gated Content enabled'
          }
          return true
        }),
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
      isDownloadGated: 'isDownloadGated',
    },
    prepare({ title, media, publishedAt, isGated, isDownloadGated }) {
      const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      const hasGating = isGated || isDownloadGated
      return {
        title,
        subtitle: hasGating ? `🔒 • ${dateStr}` : dateStr,
        media,
      }
    },
  },
})
