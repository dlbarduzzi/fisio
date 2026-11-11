import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { View } from "react-native"

import { Text } from "@/components/ui/text"

const cardVariants = cva(
  "gap-4 rounded-lg p-5",
  {
    variants: {
      variant: {
        // Source `.home` card: warm off-white surface, no border.
        default: "bg-card",
        outline: "border border-border bg-background",
        elevated: "bg-background shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type ViewProps = ComponentProps<typeof View> & RefAttributes<typeof View>
type CardProps = ViewProps & VariantProps<typeof cardVariants>

function Card({ variant, className, ...props }: CardProps) {
  return <View className={cn(cardVariants({ variant }), className)} {...props} />
}

function CardHeader({ className, ...props }: ViewProps) {
  return <View className={cn("gap-1.5", className)} {...props} />
}

function CardTitle(props: ComponentProps<typeof Text>) {
  return <Text variant="h3" {...props} />
}

function CardDescription(props: ComponentProps<typeof Text>) {
  return <Text variant="muted" {...props} />
}

function CardContent({ className, ...props }: ViewProps) {
  return <View className={cn("gap-3", className)} {...props} />
}

function CardFooter({ className, ...props }: ViewProps) {
  return <View className={cn("flex-row items-center gap-3", className)} {...props} />
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
}
