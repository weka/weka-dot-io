import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'migrationMetadata',
  title: 'Migration Metadata',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'wordpressId',
      title: 'WordPress ID',
      type: 'number',
      description: 'Original WordPress post ID',
      readOnly: true,
    }),
    defineField({
      name: 'wordpressType',
      title: 'WordPress Type',
      type: 'string',
      description: 'Original WordPress post type',
      readOnly: true,
    }),
    defineField({
      name: 'legacyUrl',
      title: 'Legacy URL',
      type: 'url',
      description: 'Original WordPress URL',
      readOnly: true,
    }),
    defineField({
      name: 'migratedAt',
      title: 'Migrated At',
      type: 'datetime',
      description: 'When this content was migrated',
      readOnly: true,
    }),
    defineField({
      name: 'migrationSource',
      title: 'Migration Source',
      type: 'string',
      description: 'System this content was migrated from',
      initialValue: 'wordpress',
      readOnly: true,
    }),
    defineField({
      name: 'migrationNotes',
      title: 'Migration Notes',
      type: 'text',
      rows: 3,
      description: 'Notes about transformations or issues during migration',
    }),
  ],
})





