import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockStats',
  title: 'Stats Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  ],
})
