import {useEffect} from 'react'
import {useClient, useFormValue, type ReferenceInputProps} from 'sanity'

/**
 * Wraps the default author reference input and writes `authorName` (person.name) on the
 * blog post via the API. Hidden `authorName` may not mount, so we sync from here.
 */
export function AuthorReferenceInput(props: ReferenceInputProps) {
  const {renderDefault, value} = props
  const documentId = useFormValue(['_id']) as string | undefined
  const client = useClient({apiVersion: '2025-01-01'})

  useEffect(() => {
    if (!documentId) return

    const ref = value?._ref
    let cancelled = false

    const run = async () => {
      if (!ref) {
        try {
          await client.patch(documentId).unset(['authorName']).commit()
        } catch {
          /* ignore */
        }
        return
      }

      try {
        const name = await client.fetch<string | null>(`*[_id == $id][0].name`, {id: ref})
        if (cancelled || typeof name !== 'string' || !name.trim()) return
        await client.patch(documentId).set({authorName: name}).commit()
      } catch {
        /* ignore */
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [documentId, value?._ref, client])

  return renderDefault(props)
}
