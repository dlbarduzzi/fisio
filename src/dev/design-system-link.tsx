/**
 * TEMPORARY — dev-only link to the Design System Preview.
 * Renders nothing in production builds. Remove together with
 * src/app/design-system.tsx and src/dev/design-system-preview.tsx.
 */
import { Link } from "expo-router"

import { cn } from "cn"

function DesignSystemLink({ className }: { className?: string }) {
  if (!__DEV__) {
    return null
  }
  return (
    <Link
      href="/design-system"
      className={cn("text-center font-sans text-sm text-primary-text underline", className)}
    >
      Design system preview
    </Link>
  )
}

export { DesignSystemLink }
