import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    /*defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title for social media sharing (defaults to meta title)',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 2,
      description: 'Description for social media sharing',
    }),*/
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended)',
      options: {
        hotspot: true,
        aiAssist: {exclude: true},
      },
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Set if this content is duplicated elsewhere',
      options: {aiAssist: {exclude: true}},
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      description: 'Prevent this page from appearing in search engines',
      initialValue: false,
      options: {aiAssist: {exclude: true}},
    }),
    /*defineField({
      name: 'focusKeywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Primary keywords for this content',
    }),*/
  ],
})
