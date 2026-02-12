import { defineType, defineField } from 'sanity'
import { FiUsers } from 'react-icons/fi'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: FiUsers,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
