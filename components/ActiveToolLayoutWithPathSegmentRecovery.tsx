/**
 * Wraps the active tool (e.g. Structure) in the path-segment error boundary.
 * Catches "Expected path segment to be an object with a _key property" when it
 * happens inside the tool and clears the bad URL so the tool can recover.
 */
import React from 'react'
import {useRouter} from 'sanity/router'
import {PathSegmentErrorBoundary} from './PathSegmentErrorBoundary'

type ActiveToolLayoutProps = {
  renderDefault: (props: ActiveToolLayoutProps) => React.ReactNode
  activeTool: {name: string}
}

export function ActiveToolLayoutWithPathSegmentRecovery(props: ActiveToolLayoutProps) {
  const router = useRouter()
  return (
    <PathSegmentErrorBoundary router={router}>
      {props.renderDefault(props)}
    </PathSegmentErrorBoundary>
  )
}
