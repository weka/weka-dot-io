import {defineMigration, at, set} from 'sanity/migrate'

/**
 * Copies seo.metaTitle → metaTitle and seo.metaDescription → metaDescription
 * so existing data is preserved when Meta Title/Meta Description move to the Content group.
 *
 * Before running for real:
 * 1. Deploy schema so the API accepts top-level metaTitle/metaDescription:
 *    npm run build && npx sanity schema deploy
 * 2. Run this migration (no dry-run; pass both --project and --dataset):
 *    npx sanity migration run move-seo-meta-to-content --project ult5g8gw --dataset production --no-dry-run
 */
export default defineMigration({
  title: 'Move SEO meta title and description to top-level (Content group)',
  documentTypes: ['blogPost'],
  migrate: {
    document(doc) {
      const docWithSeo = doc as {seo?: {metaTitle?: string; metaDescription?: string}; metaTitle?: string; metaDescription?: string}
      const patches: ReturnType<typeof at>[] = []

      if (docWithSeo.seo?.metaTitle && !docWithSeo.metaTitle?.trim()) {
        patches.push(at('metaTitle', set(docWithSeo.seo.metaTitle)))
      }
      if (docWithSeo.seo?.metaDescription && !docWithSeo.metaDescription?.trim()) {
        patches.push(at('metaDescription', set(docWithSeo.seo.metaDescription)))
      }

      return patches.length > 0 ? patches : undefined
    },
  },
})
