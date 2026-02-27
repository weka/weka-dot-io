import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ult5g8gw',
    dataset: 'production'
  },
  deployment: {
    /**
     * Disabled so the deployed Studio uses our patched sanity bundle (patches/sanity+5.12.0.patch)
     * which fixes the "Expected path segment to be an object with a _key property" crash when
     * closing the AI instruction pane. Re-enable when Sanity fixes this upstream.
     * See https://www.sanity.io/docs/studio/latest-version-of-sanity
     */
    autoUpdates: false,
  }
})
