/**
 * Layout wrapper that catches the path-segment crash when closing the AI instruction pane.
 * Works in deployed Studio (no patch required). See PathSegmentErrorBoundary.
 */
import React from 'react'
import {useRouter} from 'sanity/router'
import type {LayoutProps} from 'sanity'
import {PathSegmentErrorBoundary} from './PathSegmentErrorBoundary'

type LayoutComponentProps = {renderDefault: (props: LayoutComponentProps) => React.ReactNode}

export function LayoutWithPathSegmentRecovery(props: LayoutComponentProps) {
  const router = useRouter()
  return (
    <PathSegmentErrorBoundary router={router}>
      {props.renderDefault(props)}
    </PathSegmentErrorBoundary>
  )
}
