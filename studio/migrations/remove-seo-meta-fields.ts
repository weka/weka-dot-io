import {defineMigration, at, unset} from 'sanity/migrate'

/**
 * Removes orphaned seo.metaTitle and seo.metaDescription from blog posts.
 * Those values now live at the document level (Content group); the seo object
 * no longer has these fields in the schema, so Studio shows "Unknown field found".
 *
 * Run after move-seo-meta-to-content has been run:
 *   npx sanity migration run remove-seo-meta-fields --project ult5g8gw --dataset production --no-dry-run
 */
export default defineMigration({
  title: 'Remove seo.metaTitle and seo.metaDescription from blog posts',
  documentTypes: ['blogPost'],
  migrate: {
    document(doc) {
      const docWithSeo = doc as {seo?: {metaTitle?: unknown; metaDescription?: unknown}}
      const patches: ReturnType<typeof at>[] = []

      if (docWithSeo.seo && docWithSeo.seo.metaTitle !== undefined) {
        patches.push(at('seo.metaTitle', unset()))
      }
      if (docWithSeo.seo && docWithSeo.seo.metaDescription !== undefined) {
        patches.push(at('seo.metaDescription', unset()))
      }

      return patches.length > 0 ? patches : undefined
    },
  },
})
