import { defineType, defineField, defineArrayMember } from 'sanity'
import { FiBriefcase } from 'react-icons/fi'

export default defineType({
  name: 'caseStudyResource',
  title: 'Case Study',
  type: 'document',
  icon: FiBriefcase,
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
        _ref: 'wp-category-resourcetype-case-study',
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
      name: 'pdfFile',
      title: 'PDF File',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      group: 'media',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      group: 'content',
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{ type: 'company' }],
      options: {
        filter: 'companyType == "customer"',
      },
      group: 'metadata',
    }),
    defineField({
      name: 'partner',
      title: 'Partner',
      type: 'reference',
      to: [{ type: 'company' }],
      options: {
        filter: 'companyType == "partner"',
      },
      group: 'metadata',
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
      customer: 'customer.name',
      media: 'thumbnail',
      publishedAt: 'metadata.publishedAt',
    },
    prepare({ title, customer, media, publishedAt }) {
      const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: customer ? `${customer} • ${dateStr}` : dateStr,
        media,
      }
    },
  },
})
