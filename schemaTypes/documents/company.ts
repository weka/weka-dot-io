import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    defineField({
      name: 'companyType',
      title: 'Company Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'Partner', value: 'partner'},
          {title: 'Customer', value: 'customer'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Company Name',
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
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logoVariants',
      title: 'Logo Variants',
      type: 'array',
      of: [defineArrayMember({type: 'logoVariant'})],
      description: 'Alternative logo versions (white, black, dark mode, etc.)',
    }),
    defineField({
      name: 'website',
      title: 'Website URL',
      type: 'url',
      description: 'Company website (external URLs only, not WEKA pages)',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          {title: 'Global', value: 'global'},
          {title: 'Americas', value: 'americas'},
          {title: 'EMEA', value: 'emea'},
          {title: 'APAC', value: 'apac'},
        ],
      },
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      description: 'Description of what the company does (supports rich text)',
      hidden: ({parent}) => parent?.companyType !== 'customer',
    }),
    defineField({
      name: 'blurb',
      title: 'WEKA Blurb',
      type: 'text',
      rows: 3,
      description: 'WEKA-specific marketing content (why they chose WEKA, benefits)',
      hidden: ({parent}) => parent?.companyType !== 'customer',
    }),
    defineField({
      name: 'boilerplate',
      title: 'Press Boilerplate',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}], // No headings
          lists: [], // No bullet/numbered lists
          marks: {
            decorators: [
              {title: 'Italic', value: 'em'},
              {title: 'Strong', value: 'strong'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        }),
      ],
      description:
        'Standard company description used in press releases and official communications. Supports basic formatting and links.',
    }),
    defineField({
      name: 'quote',
      title: 'Featured Quote',
      type: 'reference',
      to: [{type: 'quote'}],
      description: 'Optional featured quote for the customer',
      hidden: ({parent}) => parent?.companyType !== 'customer',
    }),
    defineField({
      name: 'partnerLevel',
      title: 'Partner Level',
      type: 'string',
      options: {
        list: [
          {title: 'None', value: 'none'},
          {title: 'Bronze', value: 'bronze'},
          {title: 'Silver', value: 'silver'},
          {title: 'Gold', value: 'gold'},
          {title: 'Platinum', value: 'platinum'},
        ],
      },
      hidden: ({parent}) => parent?.companyType !== 'partner',
    }),
    defineField({
      name: 'partnerType',
      title: 'Partner Type',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {
        list: [
          {title: 'Platform Partner', value: 'platform-partner'},
          {title: 'Cloud Partner', value: 'cloud-partner'},
          {title: 'Software Partner', value: 'software-partner'},
          {title: 'System Partner', value: 'system-partner'},
          {title: 'VAR', value: 'var'},
          {title: 'Reseller', value: 'reseller'},
        ],
      },
      hidden: ({parent}) => parent?.companyType !== 'partner',
    }),
    defineField({
      name: 'additionalLinks',
      title: 'Additional Links',
      type: 'array',
      of: [defineArrayMember({type: 'actionLink'})],
    }),
    defineField({
      name: 'listingOrder',
      title: 'Listing Order',
      type: 'number',
      description: 'Order in which this company appears in listings',
    }),
    defineField({
      name: 'showAsCard',
      title: 'Show as Card',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'migrationData',
      title: 'Migration Data',
      type: 'object',
      fields: [
        {
          name: 'wordpressId',
          title: 'WordPress ID',
          type: 'number',
        },
        {
          name: 'wordpressType',
          title: 'WordPress Type',
          type: 'string',
        },
        {
          name: 'legacyUrl',
          title: 'Legacy URL',
          type: 'string',
        },
        {
          name: 'migrationSource',
          title: 'Migration Source',
          type: 'string',
        },
        {
          name: 'migratedAt',
          title: 'Migrated At',
          type: 'datetime',
        },
        {
          name: 'migrationNotes',
          title: 'Migration Notes',
          type: 'text',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
      subtitle: 'region',
    },
  },
})
