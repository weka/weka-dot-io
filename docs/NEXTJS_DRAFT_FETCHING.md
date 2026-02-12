# Enable Draft Fetching in Next.js

This guide enables **draft mode** and **draft fetching** in your Next.js app so the Presentation tool in Sanity Studio can show unpublished content and visual editing.

---

## 1. Install dependencies

In your **Next.js** project:

```sh
npm install next-sanity @sanity/client
```

---

## 2. Environment variables

In your Next.js project root, add to `.env` or `.env.local`:

```bash
# Public (exposed to browser)
NEXT_PUBLIC_SANITY_PROJECT_ID="ult5g8gw"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_STUDIO_URL="https://your-studio-url.sanity.studio"

# Private (server-only) – create a token with Viewer role in Sanity Manage
SANITY_VIEWER_TOKEN="your_viewer_token"
```

Create the token at [sanity.io/manage](https://www.sanity.io/manage) → your project → API → Tokens → Add API token, with **Viewer** permissions.

---

## 3. Sanity client with Stega (for overlays)

Create or update your client so it supports draft fetching and Stega encoding:

**`src/sanity/client.ts`** (or `lib/sanity/client.ts`):

```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-12-01',
  useCdn: true,
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
})
```

---

## 4. Draft mode API route (enable)

This endpoint is called by the Presentation tool when opening the preview. It enables Next.js **Draft Mode** and validates the request.

**`src/app/api/draft-mode/route.ts`** (single route that enables draft):

```ts
import { client } from '@/sanity/client'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
})
```

If you prefer the nested path used in Sanity’s docs, use:

**`src/app/api/draft-mode/enable/route.ts`**:

```ts
import { client } from '@/sanity/client'
import { defineEnableDraftMode } from 'next-sanity/draft-mode'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.SANITY_VIEWER_TOKEN,
  }),
})
```

If you use the nested path, set in this Studio’s `sanity.config.ts`:

- `previewMode: { enable: '/api/draft-mode/enable' }`

---

## 5. Disable draft mode (optional but recommended)

**Server action** – `src/app/actions.ts`:

```ts
'use server'

import { draftMode } from 'next/headers'

export async function disableDraftMode() {
  const { disable } = await draftMode()
  await disable()
}
```

**Route handler** (for Studio’s “disable” URL, e.g. `/api/disable-draft`) – `src/app/api/disable-draft/route.ts`:

```ts
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const { disable } = await draftMode()
  await disable()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
```

---

## 6. Handle draft mode in fetching

Centralize draft-mode logic in one helper so every Sanity fetch automatically uses drafts when the Presentation tool is open.

### 6.1 Reusable fetch helper

**`src/sanity/fetch.ts`** (or `lib/sanity/fetch.ts`):

```ts
import { draftMode } from 'next/headers'
import { client } from './client'

/** Options to use when draft mode is enabled (preview drafts, no CDN, stega for overlays). */
const draftOptions = {
  perspective: 'previewDrafts' as const,
  useCdn: false,
  stega: true,
}

type QueryInput = string | { query: string; params?: Record<string, unknown> }

/**
 * Fetch from Sanity. When draft mode is enabled, returns draft content and enables visual editing.
 * Use this for all Sanity fetches in Server Components and route handlers.
 *
 * @param query - GROQ query string, or result of defineQuery() (object with .query and optional .params)
 * @param params - Query parameters (merged with query.params if query is an object)
 */
export async function sanityFetch<T>(
  query: QueryInput,
  params: Record<string, unknown> = {},
): Promise<T> {
  const { isEnabled } = await draftMode()
  const opts = isEnabled ? draftOptions : undefined
  if (typeof query === 'string') {
    return client.fetch<T>(query, params, opts)
  }
  return client.fetch<T>(query.query, { ...query.params, ...params }, opts)
}
```

### 6.2 Using the helper in a page

**Option A – raw query:**

```ts
import { sanityFetch } from '@/sanity/fetch'

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = await sanityFetch<Post | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug },
  )

  if (!post) return notFound()
  return <article>{/* render post */}</article>
}
```

**Option B – with defineQuery (typed):**

```ts
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '@/sanity/fetch'

const blogPostQuery = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0]{
    _id, title, slug, body, publishedAt, "author": author->{name}
  }`,
)

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityFetch(blogPostQuery, { slug })  // draft mode handled inside sanityFetch
  if (!post) return notFound()
  return <article>{/* render post */}</article>
}
```

**Option C – inline (no helper):** if you prefer to handle it per call:

```ts
import { draftMode } from 'next/headers'
import { client } from '@/sanity/client'

const post = await client.fetch(
  query,
  { slug },
  (await draftMode()).isEnabled
    ? { perspective: 'previewDrafts', useCdn: false, stega: true }
    : undefined,
)
```

- **`perspective: 'previewDrafts'`** – returns draft when available, otherwise published.
- **`useCdn: false`** – bypass CDN for latest drafts.
- **`stega: true`** – enables click-to-edit overlays in the Presentation tool.

---

## 7. Visual editing in the layout

When draft mode is enabled, render the Visual Editing component so overlays and refresh work:

**`src/app/layout.tsx`**:

```tsx
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en">
      <body>
        {children}
        {isEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
```

---

## 8. Align with this Studio

This Studio is already configured with:

- **Enable:** `GET /api/draft-mode`  
  So your Next.js app should expose the enable handler at **`/api/draft-mode`** (e.g. the single `route.ts` in **`src/app/api/draft-mode/`** as in section 4).
- **Disable:** `GET /api/disable-draft`  
  Implement **`/api/disable-draft`** as in section 5 if you want the Studio’s disable link to work.

---

## Checklist

- [ ] `next-sanity` and `@sanity/client` installed
- [ ] `.env` has `NEXT_PUBLIC_SANITY_*` and `SANITY_VIEWER_TOKEN`
- [ ] Sanity client created with `stega.studioUrl`
- [ ] `GET /api/draft-mode` (or `/api/draft-mode/enable`) implemented with `defineEnableDraftMode`
- [ ] All Sanity fetches use `perspective: 'previewDrafts'`, `useCdn: false`, and `stega: true` when `draftMode().isEnabled`
- [ ] Root layout renders `<VisualEditing />` when draft mode is enabled
- [ ] Optional: `GET /api/disable-draft` to disable draft mode from the Studio

After this, opening the Presentation tool in this Studio and loading your Next.js preview URL will enable draft mode and show drafts with visual editing.
