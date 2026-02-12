import {defineType, defineField, defineArrayMember} from 'sanity'
import {FiRadio} from 'react-icons/fi'

export default defineType({
  name: 'pressRelease',
  title: 'Press Release',
  type: 'document',
  icon: FiRadio,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata'},
    {name: 'migration', title: 'Migration'},
  ],
  fields: [
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'target',
                    type: 'string',
                    options: {
                      list: [
                        {title: 'Same Window', value: '_self'},
                        {title: 'New Window', value: '_blank'},
                      ],
                    },
                    initialValue: '_self',
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'companyBoilerplate',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'quote',
      title: 'Featured Quote',
      type: 'reference',
      to: [{type: 'quote'}],
      description: 'Optional featured quote for the press release',
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
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
      publishedAt: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({title, publishedAt, media}) {
      return {
        title: title || 'Untitled',
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : 'Draft',
        media,
      }
    },
  },
})
