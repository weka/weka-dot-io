import {defineMigration, at, set, type MigrationContext} from 'sanity/migrate'
import type {SanityDocument} from 'sanity'

/**
 * Fills `authorName` from the referenced person so "Search list" can match author names.
 *
 *   # Use the same dataset as sanity.config.ts / Studio (e.g. dev or production)
 *   npx sanity migration run backfill-blogpost-author-name --project ult5g8gw --dataset dev --no-dry-run
 */
export default defineMigration({
  title: 'Backfill blogPost.authorName from author reference',
  documentTypes: ['blogPost'],
  migrate: {
    document: (async (doc: SanityDocument, context: MigrationContext) => {
      const d = doc as {author?: {_ref?: string}; authorName?: string}
      const ref = d.author?._ref
      if (!ref) {
        return
      }
      if (d.authorName?.trim()) {
        return
      }

      // `filtered.getDocument` only resolves docs in the migration scope — not referenced `person` docs.
      // Use the dataset client to load the person name.
      const name = await context.client.fetch<string | null>(`*[_id == $id][0].name`, {id: ref})
      if (!name || typeof name !== 'string') {
        return
      }

      return at('authorName', set(name))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- async document() with early returns; runtime supports this
    }) as any,
  },
})
