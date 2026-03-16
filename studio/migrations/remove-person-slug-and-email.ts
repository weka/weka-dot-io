import { defineMigration, at, unset } from 'sanity/migrate'

export default defineMigration({
  title: 'Remove slug and email fields from all person documents',
  documentTypes: ['person'],
  migrate: {
    document(doc, context) {
      const patches = []
      if (doc.slug !== undefined) {
        patches.push(at('slug', unset()))
      }
      if (doc.email !== undefined) {
        patches.push(at('email', unset()))
      }
      return patches.length > 0 ? patches : undefined
    },
  },
})
