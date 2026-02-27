# Patches

## sanity+5.12.0.patch

**Purpose:** Prevents the Structure tool from crashing when closing the AI instruction pane (e.g. "SEO Keywords" / field focus for nested paths like `seo.metaDescription`).

**Bug:** Sanity core throws "Expected path segment to be an object with a _key property" because `getArrayFieldsetAndFieldGroupOperations` receives a path whose first segment is an object key (e.g. `'seo'`) instead of an array key segment. When the segment is not a key segment, this patch returns `[]` instead of throwing, so the Studio no longer crashes.

**Remove when:** Sanity fixes the path-segment handling upstream. Check Sanity changelog for a fix, then delete this patch and run `npm install`.
