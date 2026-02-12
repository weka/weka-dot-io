import { defineType, defineField } from 'sanity'
import { FiTag } from 'react-icons/fi'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: FiTag,
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
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagGroup',
      title: 'Tag Group',
      type: 'string',
      options: {
        list: [
          { title: 'Industry', value: 'industry' },
          { title: 'Technology', value: 'technology' },
          { title: 'Topic', value: 'topic' },
          { title: 'Use Case', value: 'useCase' },
        ],
      },
      description: 'Optional grouping for better organization',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
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
      tagGroup: 'tagGroup',
    },
    prepare({ title, tagGroup }) {
      return {
        title,
        subtitle: tagGroup ? `${tagGroup.charAt(0).toUpperCase()}${tagGroup.slice(1)}` : 'Unassigned',
      }
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





