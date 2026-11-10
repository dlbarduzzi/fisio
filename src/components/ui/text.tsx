import type { Role } from "react-native"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { Slot } from "@rn-primitives/slot"

import { createContext, use } from "react"
import { Text as PrimitiveText } from "react-native"

const textVariants = cva(
  "text-base text-neutral-900",
  {
    variants: {
      variant: {
        default: "font-normal",
        h1: "text-3xl font-bold tracking-tight",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type TextVariantProps = VariantProps<typeof textVariants>
type TextVariant = NonNullable<TextVariantProps["variant"]>

const ROLE: Partial<Record<TextVariant, Role>> = {
  h1: "heading",
}

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  h1: "1",
}

const TextClassContext = createContext<string | undefined>(undefined)

type TextProps = ComponentProps<typeof PrimitiveText>
  & RefAttributes<typeof PrimitiveText>
  & TextVariantProps
  & { asChild?: boolean }

function Text({
  asChild = false,
  variant = "default",
  className,
  ...props
}: TextProps) {
  const textClass = use(TextClassContext)
  const Component = asChild ? Slot : PrimitiveText
  return (
    <Component
      role={variant ? ROLE[variant] : undefined}
      className={cn(textVariants({ variant }), textClass, className)}
      aria-level={variant ? ARIA_LEVEL[variant] : undefined}
      {...props}
    />
  )
}

export { Text, TextClassContext }
