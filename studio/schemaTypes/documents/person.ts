import { defineType, defineField } from 'sanity'
import { FiUser } from 'react-icons/fi'

export default defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: FiUser,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Sometimes used in quotes',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter Handle',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((handle) => {
          if (handle && !handle.startsWith('@')) {
            return 'Twitter handle should start with @'
          }
          return true
        }),
    }),
    defineField({
      name: 'migrationData',
      title: 'Migration Data',
      type: 'migrationMetadata',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})



