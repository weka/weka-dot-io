import {defineType, defineField, defineArrayMember} from 'sanity'
import {FiEdit} from 'react-icons/fi'
import {portableTextConfig} from '../objects/portableTextConfig'

export default defineType({
  name: 'blogPost',
  title: 'All Blog Posts',
  type: 'document',
  icon: FiEdit,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
    {name: 'migration', title: 'Migration'},
  ],
  fields: [
    // Status fields
    defineField({
      name: 'status',
      title: 'Dev Status',
      type: 'string',
      options: {
        list: [
          {title: 'Is updated', value: 'isUpdated'},
          {title: 'Needs updating', value: 'needsUpdating'},
          {title: 'Archive/Delete', value: 'archiveDelete'},
          {title: 'Help needed', value: 'helpNeeded'},
        ],
        layout: 'dropdown',
      },
      group: 'meta',
    }),
    // Content fields
    defineField({
      name: 'title',
      title: 'Blog Post Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(142),
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
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as any
          if (doc?.publishedAt && !value) {
            return 'Featured image is required for published articles'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        }),
      ],
      description: 'TL;DR summary for blog posts',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      ...portableTextConfig,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'reference',
      to: [{type: 'cta'}],
      description: 'Optional call-to-action to include',
      group: 'content',
    }),

    // Metadata fields
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      validation: (Rule) => Rule.min(1).max(3),
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tag'}]})],
      group: 'meta',
    }),

    // SEO fields
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),

    // Migration fields
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
      author: 'author.name',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, author, media, publishedAt}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft'
      return {
        title: title || 'Untitled',
        subtitle: `${author || 'No author'} • ${date}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
