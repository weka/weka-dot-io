import type {StructureResolver} from 'sanity/structure'
import {
  FiFileText,
  FiEdit,
  FiCalendar,
  FiRadio,
  FiFile,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiBook,
  FiNavigation,
  FiGlobe,
  FiTag,
  FiUser,
  FiPackage,
  FiLayers,
  FiGrid,
  FiMonitor,
  FiArrowRightCircle,
  FiMessageSquare,
} from 'react-icons/fi'
import {PiTreeView, PiBuilding} from 'react-icons/pi'
import {WekaIcon} from './components/WekaIcon'
import {TagIcon} from '@sanity/icons'

export const structure: StructureResolver = async (S, context) => {
  // Fetch all unique taxonomies dynamically - filter out nulls
  const result = await context
    .getClient({apiVersion: '2025-01-01'})
    .fetch<Array<string>>(`array::unique(*[_type == "category" && defined(taxonomy)].taxonomy)`)

  // Get counts for each taxonomy
  const taxonomies = await Promise.all(
    result
      .filter((taxonomy) => taxonomy != null) // Extra safety check
      .map(async (taxonomy) => {
        const count = await context
          .getClient({apiVersion: '2025-01-01'})
          .fetch<number>(`count(*[_type == "category" && taxonomy == $taxonomy])`, {taxonomy})
        return {taxonomy, count}
      }),
  )

  const formatTaxonomyTitle = (taxonomy: string): string => {
    // Add null check here too
    if (!taxonomy) return 'Untitled'

    return taxonomy
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return S.list()
    .title('Content')
    .items([
      // Weka Website Section
      S.listItem()
        .title('Weka Website')
        .icon(WekaIcon)
        .child(
          S.list()
            .title('Weka Website')
            .items([
              S.listItem()
                .title('Pages')
                .icon(FiFile)
                .child(
                  S.documentTypeList('landingPage')
                    .title('Pages')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Components')
                .icon(FiGrid)
                .child(
                  S.documentTypeList('component')
                    .title('Components')
                    .defaultOrdering([{field: 'title', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Menu & Navigation')
                .icon(FiNavigation)
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                    .title('Menu & Navigation'),
                ),
              S.listItem()
                .title('SEO Settings')
                .icon(FiGlobe)
                .child(
                  S.document()
                    .schemaType('seoDefaults')
                    .documentId('seoDefaults')
                    .title('SEO Settings'),
                ),
            ]),
        ),

      S.divider(),

      // Companies (Customers, Partners, Internal)
      S.listItem()
        .title('Companies')
        .icon(PiBuilding)
        .child(
          S.list()
            .title('Companies')
            .items([
              S.listItem()
                .title('Customers')
                .icon(FiUsers)
                .child(
                  S.documentTypeList('company')
                    .title('Customers')
                    .filter('_type == "company" && companyType == "customer"')
                    .apiVersion('2025-01-01')
                    .defaultOrdering([{field: 'name', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Partners')
                .icon(FiUsers)
                .child(
                  S.documentTypeList('company')
                    .title('Partners')
                    .filter('_type == "company" && companyType == "partner"')
                    .apiVersion('2025-01-01')
                    .defaultOrdering([{field: 'name', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Internal')
                .icon(FiUsers)
                .child(
                  S.documentTypeList('company')
                    .title('Internal')
                    .filter('_type == "company" && companyType == "internal"')
                    .apiVersion('2025-01-01')
                    .defaultOrdering([{field: 'name', direction: 'asc'}]),
                ),
            ]),
        ),

      S.divider(),

      // CTAs and Quotes
      S.listItem()
        .title('CTAs')
        .icon(FiArrowRightCircle)
        .child(
          S.documentTypeList('cta')
            .title('CTAs')
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Quotes')
        .icon(FiMessageSquare)
        .child(
          S.documentTypeList('quote')
            .title('Quotes')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
        ),

      S.divider(),

      // Media Hub (Articles)
      S.listItem()
        .title('Media Hub')
        .icon(FiGrid)
        .child(
          S.list()
            .title('Media Hub')
            .items([
              S.listItem()
                .title('Articles')
                .icon(FiFileText)
                .child(
                  S.list()
                    .title('Articles')
                    .items([
                      S.listItem()
                        .title('All Articles')
                        .icon(FiEdit)
                        .child(
                          S.documentTypeList('blogPost')
                            .title('All Articles')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                            .child((documentId) =>
                              S.document().documentId(documentId).schemaType('blogPost'),
                            ),
                        ),
                      S.listItem()
                        .title('Is updated')
                        .icon(FiEdit)
                        .child(
                          S.documentList()
                            .title('Is updated')
                            .filter('_type == "blogPost" && status == "isUpdated"')
                            .apiVersion('2025-01-01')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                            .child((documentId) =>
                              S.document().documentId(documentId).schemaType('blogPost'),
                            ),
                        ),
                      S.listItem()
                        .title('Needs updating')
                        .icon(FiEdit)
                        .child(
                          S.documentList()
                            .title('Needs updating')
                            .filter('_type == "blogPost" && status == "needsUpdating"')
                            .apiVersion('2025-01-01')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                            .child((documentId) =>
                              S.document().documentId(documentId).schemaType('blogPost'),
                            ),
                        ),
                      S.listItem()
                        .title('Archive/Delete')
                        .icon(FiEdit)
                        .child(
                          S.documentList()
                            .title('Archive/Delete')
                            .filter('_type == "blogPost" && status == "archiveDelete"')
                            .apiVersion('2025-01-01')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                            .child((documentId) =>
                              S.document().documentId(documentId).schemaType('blogPost'),
                            ),
                        ),
                      S.listItem()
                        .title('Help needed')
                        .icon(FiEdit)
                        .child(
                          S.documentList()
                            .title('Help needed')
                            .filter('_type == "blogPost" && status == "helpNeeded"')
                            .apiVersion('2025-01-01')
                            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
                            .child((documentId) =>
                              S.document().documentId(documentId).schemaType('blogPost'),
                            ),
                        ),
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // Dynamic Taxonomies Section
      S.listItem()
        .title('Taxonomy')
        .icon(PiTreeView)
        .child(
          S.list()
            .title('Taxonomies')
            .items([
              ...taxonomies.map(({taxonomy, count}) =>
                S.listItem()
                  .title(`${formatTaxonomyTitle(taxonomy)} (${count})`)
                  .icon(TagIcon)
                  .child(
                    S.documentList()
                      .title(formatTaxonomyTitle(taxonomy))
                      .filter('_type == "category" && taxonomy == $taxonomy')
                      .params({taxonomy})
                      .apiVersion('2025-01-01')
                      .defaultOrdering([{field: 'name', direction: 'asc'}]),
                  ),
              ),
              S.divider(),
              S.listItem()
                .title('All Categories')
                .icon(TagIcon)
                .child(
                  S.documentTypeList('category')
                    .title('All Categories')
                    .apiVersion('2025-01-01')
                    .defaultOrdering([
                      {field: 'taxonomy', direction: 'asc'},
                      {field: 'name', direction: 'asc'},
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // People
      S.listItem()
        .title('People')
        .icon(FiUser)
        .child(
          S.documentTypeList('person')
            .title('People')
            .defaultOrdering([{field: 'name', direction: 'asc'}]),
        ),
    ])
}

export default structure
