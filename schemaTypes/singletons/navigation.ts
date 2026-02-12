import { defineType, defineField } from 'sanity'
import { FiNavigation } from 'react-icons/fi'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: FiNavigation,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
