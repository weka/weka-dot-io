/**
 * Error boundary that catches "Expected path segment to be an object with a _key property"
 * (Sanity bug when closing AI instruction pane with nested paths like seo.metaDescription).
 * Clears the bad URL state and retries so the Studio recovers without a full crash.
 */
import React, {Component, type ErrorInfo, type ReactNode} from 'react'
import type {RouterContextValue} from 'sanity/router'

const PATH_SEGMENT_ERROR = 'Expected path segment to be an object with a _key property'

interface Props {
  router: RouterContextValue | null
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class PathSegmentErrorBoundary extends Component<Props, State> {
  state: State = {hasError: false, error: null}

  static getDerivedStateFromError(error: Error): State {
    return {hasError: true, error}
  }

  componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
    if (error?.message?.includes(PATH_SEGMENT_ERROR) && this.props.router) {
      try {
        this.props.router.navigate({
          replace: true,
          stickyParams: {pathKey: undefined, inspect: undefined},
        })
        // Retry after router state has updated
        setTimeout(() => this.setState({hasError: false, error: null}), 100)
      } catch (_) {
        window.location.replace(window.location.pathname + window.location.hash)
      }
    }
  }

  render() {
    if (this.state.hasError && this.state.error?.message?.includes(PATH_SEGMENT_ERROR)) {
      return null
    }
    return this.props.children
  }
}
