import { defineType, defineField } from 'sanity'
import { FiFile } from 'react-icons/fi'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  icon: FiFile,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
