import { defineType, defineField } from 'sanity'
import { FiGlobe } from 'react-icons/fi'

export default defineType({
  name: 'seoDefaults',
  title: 'SEO Defaults',
  type: 'document',
  icon: FiGlobe,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Default Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
    }),
  ],
})
