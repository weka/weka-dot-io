import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'blockGallery',
  title: 'Gallery Block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({type: 'image'})],
    }),
  ],
})
