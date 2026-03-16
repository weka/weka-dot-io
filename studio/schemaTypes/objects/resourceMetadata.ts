import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'resourceMetadata',
  title: 'Resource Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author(s)',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'person'}]})],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'category'}],
          options: {
            filter: 'taxonomy in ["industry", "technology", "solution", "topic"]',
          },
        }),
      ],
    }),
  ],
})
