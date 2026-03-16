/**
 * Prevents the "Expected path segment to be an object with a _key property" crash
 * by clearing pathKey/inspect from the URL before the Structure tool mounts.
 * Renders nothing until the URL is safe so the crash never happens.
 */
import React, {useLayoutEffect, useState} from 'react'
import {useRouter} from 'sanity/router'

function isBadPathKey(value: unknown): boolean {
  if (typeof value !== 'string') return false
  return value.includes('.')
}

export function PathSegmentUrlGate({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const state = router.state as {pathKey?: string; inspect?: string} | undefined
    const pathKey = state?.pathKey
    const inspect = state?.inspect
    const hasBadPathKey = isBadPathKey(pathKey)
    const hasInspect = typeof inspect === 'string' && inspect.length > 0

    if (hasBadPathKey || hasInspect) {
      router.navigate({
        replace: true,
        stickyParams: {
          pathKey: hasBadPathKey ? null : undefined,
          inspect: hasInspect ? null : undefined,
        },
      })
      const t = setTimeout(() => setReady(true), 150)
      return () => clearTimeout(t)
    }
    setReady(true)
  }, [router])

  if (!ready) {
    return null
  }
  return <>{children}</>
}
