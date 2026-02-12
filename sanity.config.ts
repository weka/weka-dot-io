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
import {BugIcon, RocketIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {WekaLogo} from './components/WekaLogo'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL ||
  'https://next-vercel-shadcn-1acv.vercel.app'

const sharedPlugins = [
  structureTool({structure}),
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
  },
])
