import type { Role } from "react-native"
import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cva } from "class-variance-authority"
import { Slot } from "@rn-primitives/slot"

import { createContext, use } from "react"
import { Text as PrimitiveText } from "react-native"

import { cn } from "cn"

const textVariants = cva(
  "font-sans text-base text-foreground",
  {
    variants: {
      variant: {
        default: "",
        display: "font-display text-4xl text-heading",
        h1: "font-display text-3xl italic text-heading",
        h2: "font-display text-2xl text-heading",
        h3: "font-display text-xl text-heading",
        eyebrow: "font-display text-sm uppercase text-primary-text",
        lead: "text-lg font-light",
        small: "text-sm",
        muted: "text-sm text-muted-foreground",
        caption: "text-xs text-muted-foreground",
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
  display: "heading",
  h1: "heading",
  h2: "heading",
  h3: "heading",
}

const ARIA_LEVEL: Partial<Record<TextVariant, string>> = {
  display: "1",
  h1: "1",
  h2: "2",
  h3: "3",
}

/**
 * Lets a parent (Button, Badge, ...) restyle the Text children it renders.
 * Context classes override the variant; an explicit `className` overrides both.
 */
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

export { Text, TextClassContext, textVariants }
