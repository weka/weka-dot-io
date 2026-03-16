import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'
import {WistiaPreview} from '../../components/WistiaPreview'

export default defineType({
  name: 'wistia',
  type: 'object',
  title: 'Wistia Embed',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'videoId',
      type: 'string',
      title: 'Wistia Video ID',
      description: 'The Wistia video ID (e.g., "abc123def")',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      videoId: 'videoId',
    },
  },
  components: {
    preview: WistiaPreview as any,
  },
})
