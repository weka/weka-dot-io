import { defineType, defineField } from 'sanity'
import { FiList } from 'react-icons/fi'

export default defineType({
  name: 'tableOfContents',
  title: 'Table of Contents',
  type: 'object',
  icon: FiList,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional custom heading (defaults to "Table of Contents")',
      placeholder: 'Table of Contents',
      initialValue: 'Table of Contents',
    }),
    defineField({
      name: 'maxDepth',
      title: 'Maximum Depth',
      type: 'number',
      description: 'How many heading levels to include (2 = H2, 3 = H2 and H3)',
      options: {
        list: [
          { title: 'H2 only', value: 2 },
          { title: 'H2 and H3', value: 3 },
          { title: 'H2, H3, and H4', value: 4 },
        ],
      },
      initialValue: 2,
      validation: (Rule) => Rule.required().min(2).max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      maxDepth: 'maxDepth',
    },
    prepare({ title, maxDepth }) {
      const depthLabel = maxDepth === 2 ? 'H2' : maxDepth === 3 ? 'H2-H3' : 'H2-H4'
      return {
        title: title || 'Table of Contents',
        subtitle: `Auto-generated from ${depthLabel} headings`,
        media: FiList,
      }
    },
  },
})
