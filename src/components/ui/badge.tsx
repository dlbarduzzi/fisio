import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { View } from "react-native"

import { TextClassContext } from "@/components/ui/text"

const badgeVariants = cva(
  "flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-border",
        success: "bg-success-muted",
        destructive: "bg-destructive-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const badgeTextVariants = cva(
  "text-xs font-medium",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        secondary: "text-secondary-foreground",
        outline: "text-foreground",
        success: "text-success",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type BadgeProps = ComponentProps<typeof View>
  & RefAttributes<typeof View>
  & VariantProps<typeof badgeVariants>

function Badge({ variant, className, ...props }: BadgeProps) {
  return (
    <TextClassContext value={badgeTextVariants({ variant })}>
      <View className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext>
  )
}

export { Badge }
