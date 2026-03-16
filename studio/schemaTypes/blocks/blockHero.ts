import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockHero',
  title: 'Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
  ],
})
