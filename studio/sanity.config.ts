import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {BugIcon} from '@sanity/icons'
import {
  defineDocuments,
  defineLocations,
  presentationTool,
} from 'sanity/presentation'
import {table} from '@sanity/table'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {assist} from '@sanity/assist'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {WekaLogo} from './components/WekaLogo'
import {LayoutWithPathSegmentRecovery} from './components/LayoutWithPathSegmentRecovery'
import {ActiveToolLayoutWithPathSegmentRecovery} from './components/ActiveToolLayoutWithPathSegmentRecovery'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  'http://localhost:3000'

// Default AI assist instructions for blogPost fields (so the Instruction panel is not empty)
function makePromptBlock(text: string, key = 'p1') {
  return {
    _type: 'block' as const,
    _key: key,
    style: 'normal' as const,
    markDefs: [],
    children: [
      {
        _type: 'span' as const,
        _key: `${key}-span`,
        text,
        marks: [] as string[],
      },
    ],
  }
}

const sharedPlugins = [
  structureTool({structure}),
  assist({
    __presets: {
      blogPost: {
        fields: [
          {
            path: 'featuredImage.alt',
            instructions: [
              {
                _key: 'alt-default',
                title: 'Generate alt text',
                prompt: [
                  makePromptBlock(
                    'Write concise, descriptive alt text for this image so it is accessible and works well for search. Describe the image content and context in 1–2 sentences.',
                    'alt-p1',
                  ),
                ],
              },
            ],
          },
          {
            path: 'excerpt',
            instructions: [
              {
                _key: 'excerpt-default',
                title: 'Write excerpt',
                prompt: [
                  makePromptBlock(
                    'Write a short, engaging excerpt or summary for this blog post. Capture the main point and encourage readers to continue. Keep it to a few sentences.',
                    'excerpt-p1',
                  ),
                ],
              },
            ],
          },
          // Note: metaTitle and metaDescription presets removed to avoid Structure tool crash
          // when closing the AI instruction pane (path ['seo', 'metaDescription'] is misinterpreted
          // as an array path). Use AI Assist inline on the SEO fields in the form instead.
        ],
      },
    },
  }),
  presentationTool({
    previewUrl: {
      origin: previewOrigin,
      previewMode: {
        enable: '/api/draft-mode',
        disable: '/api/disable-draft',
      },
    },
    allowOrigins: [
      'http://localhost:*',
      'http://127.0.0.1:*',
      'https://*.vercel.app',
    ],
    resolve: {
      locations: {
        blogPost: defineLocations({
          select: {title: 'title', slug: 'slug.current'},
          resolve: (doc) => {
            if (!doc?.slug) {
              return {locations: []}
            }
            return {
              locations: [
                {
                  title: doc.title || 'Article',
                  href: `/blog/${doc.slug}`,
                },
                {title: 'Blog', href: '/blog'},
              ],
            }
          },
        }),
      },
      mainDocuments: defineDocuments([
        {
          route: '/blog/:slug',
          filter: `_type == "blogPost" && slug.current == $slug`,
        },
      ]),
    },
  }),
  visionTool(),
  table(),
  media(),
]

export default defineConfig({
  name: 'default',
  title: 'QA weka.io',
  icon: BugIcon,
  projectId: 'ult5g8gw',
  dataset: 'dev',
  plugins: sharedPlugins,
  schema: {types: schemaTypes},
  studio: {
    components: {
      layout: LayoutWithPathSegmentRecovery,
      activeToolLayout: ActiveToolLayoutWithPathSegmentRecovery,
    },
  },
  form: {
    // Single "Select" experience: only Media source (browse + search). No dropdown.
    image: {
      assetSources: () => [mediaAssetSource],
    },
  },
})
