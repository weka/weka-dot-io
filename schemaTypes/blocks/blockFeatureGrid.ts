import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockFeatureGrid',
  title: 'Feature Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
  ],
})
