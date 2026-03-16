import { defineType, defineField, defineArrayMember } from 'sanity'
import { FiVideo } from 'react-icons/fi'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  icon: FiVideo,
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
        _ref: 'wp-category-resourcetype-video',
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
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      group: 'content',
    }),

    // Type-specific fields
    defineField({
      name: 'video',
      title: 'Video',
      type: 'wistia',
      group: 'media',
      description: 'Wistia video ID',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers / Presenters',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'person' }] })],
      group: 'metadata',
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'array',
      of: [defineArrayMember({ type: 'block' })],
      group: 'content',
      description: 'Video transcript for accessibility and SEO',
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
    },
    prepare({ title, media, publishedAt }) {
      const dateStr = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: dateStr,
        media,
      }
    },
  },
})
