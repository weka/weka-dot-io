import {defineType, defineField, defineArrayMember} from 'sanity'
import {FiMessageSquare} from 'react-icons/fi'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  icon: FiMessageSquare,
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      description: 'The person who said this quote',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [{type: 'company'}],
      description: "The person's company at the time of the quote",
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      description: "The person's title at the time of the quote (e.g., 'CEO', 'CTO')",
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'text',
      rows: 2,
      description:
        "Custom attribution line for cases outside of standard name, title, company format (e.g., '- Plato, as quoted in the dialogue Republic'). Leave blank to use author, jobTitle, and company references.",
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        layout: 'tags',
      },
      description: 'Keywords to help find and categorize this quote',
    }),
    defineField({
      name: 'migrationData',
      title: 'Migration Data',
      type: 'migrationMetadata',
      description: 'Tracking information from WordPress migration',
    }),
  ],
  preview: {
    select: {
      title: 'text',
      authorName: 'author.name',
      company: 'company.name',
      jobTitle: 'jobTitle',
    },
    prepare({title, authorName, company, jobTitle}) {
      const subtitle = authorName
        ? `${authorName}${jobTitle ? `, ${jobTitle}` : ''}${company ? ` at ${company}` : ''}`
        : 'Unknown author'
      return {
        title: title
          ? `"${title.substring(0, 60)}${title.length > 60 ? '...' : ''}"`
          : 'Untitled Quote',
        subtitle,
      }
    },
  },
})
