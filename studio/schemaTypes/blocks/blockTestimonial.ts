import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blockTestimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
    }),
  ],
})
