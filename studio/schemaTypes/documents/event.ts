import { defineType, defineField } from 'sanity'
import { FiCalendar } from 'react-icons/fi'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: FiCalendar,
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
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
    },
    prepare({ title, startDate }) {
      return {
        title: title || 'Untitled',
        subtitle: startDate ? new Date(startDate).toLocaleDateString() : 'No date',
      }
    },
  },
})
