/**
 * Layout wrapper: gates initial load on bad URL and wraps in error boundary.
 * Prevents "Expected path segment to be an object with a _key property" crash.
 */
import React from 'react'
import {useRouter} from 'sanity/router'
import {PathSegmentErrorBoundary} from './PathSegmentErrorBoundary'
import {PathSegmentUrlGate} from './PathSegmentUrlGate'

type LayoutComponentProps = {renderDefault: (props: LayoutComponentProps) => React.ReactNode}

export function LayoutWithPathSegmentRecovery(props: LayoutComponentProps) {
  const router = useRouter()
  const state = router.state as {pathKey?: string} | undefined
  const pathKey = state?.pathKey ?? ''
  return (
    <PathSegmentErrorBoundary router={router}>
      <PathSegmentUrlGate key={pathKey}>
        {props.renderDefault(props)}
      </PathSegmentUrlGate>
    </PathSegmentErrorBoundary>
  )
}
