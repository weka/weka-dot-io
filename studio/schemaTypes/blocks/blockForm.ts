import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockForm',
  title: 'Form Block',
  type: 'object',
  fields: [
    defineField({
      name: 'formId',
      title: 'Form ID',
      type: 'string',
    }),
  ],
})
