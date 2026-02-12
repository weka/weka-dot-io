import {defineType, defineField} from 'sanity'
import {FiExternalLink} from 'react-icons/fi'
import {PressCoverageLinkInput} from '../../components/PressCoverageLinkInput'

export default defineType({
  name: 'pressCoverage',
  title: 'Press Coverage',
  type: 'document',
  icon: FiExternalLink,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata'},
    {name: 'migration', title: 'Migration'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Headline of the press article',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief summary or quote from the article',
      validation: (Rule) => Rule.max(300),
      group: 'content',
    }),
    defineField({
      name: 'link',
      title: 'Article Link',
      type: 'actionLink',
      description:
        'Link to the original press article (ariaLabel auto-generated from title and publication)',
      validation: (Rule) => Rule.required(),
      group: 'content',
      components: {
        input: PressCoverageLinkInput,
      },
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Publication logo or article image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string',
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'Date the article was published',
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'publication',
      title: 'Publication',
      type: 'string',
      description: 'Name of the publication (e.g., TechCrunch, VentureBeat)',
      group: 'meta',
    }),
    defineField({
      name: 'migrationData',
      title: 'Migration Data',
      type: 'migrationMetadata',
      group: 'migration',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publication',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({title, subtitle, media, publishedAt}) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : undefined

      return {
        title,
        subtitle: subtitle ? `${subtitle}${date ? ` • ${date}` : ''}` : date,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
