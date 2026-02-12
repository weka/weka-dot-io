import {defineField} from 'sanity'

/**
 * Shared field definitions for link functionality
 * Used by both actionLink (object) and cta (document)
 */

export const actionTypeField = defineField({
  name: 'actionType',
  title: 'Action Type',
  type: 'string',
  options: {
    list: [
      {title: 'Internal Link (Sanity)', value: 'internal'},
      {title: 'Internal URL (Relative)', value: 'relativeUrl'},
      {title: 'External Link or URL', value: 'external'},
    ],
    layout: 'radio',
  },
  validation: (Rule) => Rule.required(),
})

export const internalLinkField = defineField({
  name: 'internalLink',
  title: 'Internal Page',
  type: 'reference',
  to: [{type: 'page'}, {type: 'blogPost'}],
  hidden: ({parent}) => parent?.actionType !== 'internal',
  validation: (Rule) =>
    Rule.custom((value, context) => {
      const parent = context.parent as any
      if (parent?.actionType === 'internal' && !value) {
        return 'Internal link is required when Action Type is Internal Link'
      }
      return true
    }),
})

export const relativeUrlField = defineField({
  name: 'relativeUrl',
  title: 'Relative URL',
  type: 'string',
  description: 'Relative path (e.g., /about, /products/widget)',
  placeholder: '/about-us',
  hidden: ({parent}) => parent?.actionType !== 'relativeUrl',
  validation: (Rule) =>
    Rule.custom((value, context) => {
      const parent = context.parent as any
      if (parent?.actionType === 'relativeUrl') {
        if (!value) {
          return 'Relative URL is required when Action Type is Internal URL'
        }
        if (!value.startsWith('/')) {
          return 'Relative URL must start with /'
        }
      }
      return true
    }),
})

export const externalUrlField = defineField({
  name: 'externalUrl',
  title: 'External URL',
  type: 'url',
  description: 'Full URL including https://',
  hidden: ({parent}) => parent?.actionType !== 'external',
  validation: (Rule) =>
    Rule.custom((value, context) => {
      const parent = context.parent as any
      if (parent?.actionType === 'external' && !value) {
        return 'External URL is required when Action Type is External Link'
      }
      return true
    }).uri({
      scheme: ['http', 'https', 'mailto', 'tel'],
    }),
})

export const targetField = defineField({
  name: 'target',
  title: 'Open In',
  type: 'string',
  options: {
    list: [
      {title: 'Same Window', value: '_self'},
      {title: 'New Window', value: '_blank'},
    ],
    layout: 'radio',
  },
})

/**
 * Helper to generate preview for link types
 */
export function generateLinkPreview(
  actionType: string,
  externalUrl?: string,
  relativeUrl?: string,
) {
  const typeEmoji: Record<string, string> = {
    internal: '🔗',
    relativeUrl: '📄',
    external: '🌐',
    modal: '💬',
  }

  const emoji = typeEmoji[actionType] || ''
  const url = externalUrl || relativeUrl || ''

  return url ? `${emoji} ${url}` : emoji
}
