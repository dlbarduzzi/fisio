import type { ComponentProps, RefAttributes } from "react"

import { View } from "react-native"

import { cn } from "cn"

type SeparatorProps = ComponentProps<typeof View>
  & RefAttributes<typeof View>
  & {
    orientation?: "horizontal" | "vertical"
    /** Decorative separators are hidden from assistive tech. */
    decorative?: boolean
  }

function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <View
      role={decorative ? "none" : "separator"}
      aria-hidden={decorative}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
