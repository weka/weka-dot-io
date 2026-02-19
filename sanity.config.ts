import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {
  defineDocuments,
  defineLocations,
  presentationTool,
} from 'sanity/presentation'
import {table} from '@sanity/table'
import {media} from 'sanity-plugin-media'
import {assist} from '@sanity/assist'
import {BugIcon, RocketIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {WekaLogo} from './components/WekaLogo'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  'https://next-vercel-shadcn-1acv.vercel.app'

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
          {
            path: 'metaTitle',
            instructions: [
              {
                _key: 'meta-title-default',
                title: 'Suggest meta title',
                prompt: [
                  makePromptBlock(
                    'Suggest an SEO meta title (50–60 characters) for this post. Include the main topic and brand or site name when it fits. Make it clear and click-worthy.',
                    'meta-title-p1',
                  ),
                ],
              },
            ],
          },
          {
            path: 'metaDescription',
            instructions: [
              {
                _key: 'meta-desc-default',
                title: 'Suggest meta description',
                prompt: [
                  makePromptBlock(
                    'Write an SEO meta description (120–160 characters) for this post. Summarize the content clearly and include a reason to click. Use active language.',
                    'meta-desc-p1',
                  ),
                ],
              },
            ],
          },
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

export default defineConfig([
  {
    name: 'production',
    title: 'weka.io',
    icon: WekaLogo,
    basePath: '/production',
    projectId: 'ult5g8gw',
    dataset: 'production',
    plugins: sharedPlugins,
    schema: {types: schemaTypes},
    form: {
      image: {
        assetSources: (prev) => prev.filter((source) => source.name !== 'media'),
      },
    },
  },
  {
    name: 'dev',
    title: 'QA weka.io',
    icon: RocketIcon,
    basePath: '/dev',
    projectId: 'ult5g8gw',
    dataset: 'dev',
    plugins: sharedPlugins,
    schema: {types: schemaTypes},
    form: {
      image: {
        assetSources: (prev) => prev.filter((source) => source.name !== 'media'),
      },
    },
  },
])
