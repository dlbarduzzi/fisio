import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { ActivityIndicator, Pressable } from "react-native"

import { colors } from "@/styles/tokens"
import { TextClassContext } from "@/components/ui/text"

const buttonVariants = cva(
  "shrink-0 flex-row items-center justify-center gap-2 rounded-lg disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary active:bg-primary-pressed",
        secondary: "bg-secondary active:bg-secondary-pressed",
        outline: "border border-border bg-background active:bg-accent",
        ghost: "active:bg-accent",
        destructive: "bg-destructive active:opacity-90",
        link: "active:opacity-70",
      },
      size: {
        sm: "h-10 px-4",
        default: "h-12 px-6",
        lg: "h-14 px-8",
        icon: "size-12",
      },
    },
    compoundVariants: [
      { variant: "link", class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

// All-caps Josefin label. `display-caps-center` corrects the font's high-sitting
// capitals so they are optically centered in the button (see global.css).
const DISPLAY_LABEL = "font-display uppercase display-caps-center"

const buttonTextVariants = cva(
  "text-md",
  {
    variants: {
      variant: {
        default: `${DISPLAY_LABEL} text-primary-foreground`,
        secondary: `${DISPLAY_LABEL} text-secondary-foreground`,
        outline: `${DISPLAY_LABEL} text-heading`,
        ghost: `${DISPLAY_LABEL} text-heading`,
        destructive: `${DISPLAY_LABEL} text-destructive-foreground`,
        link: "font-sans text-base text-primary-text underline",
      },
      size: {
        sm: "text-sm",
        default: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

const SPINNER_COLOR: Record<ButtonVariant, string> = {
  default: colors.primaryForeground,
  secondary: colors.secondaryForeground,
  outline: colors.heading,
  ghost: colors.heading,
  destructive: colors.destructiveForeground,
  link: colors.primaryText,
}

type ButtonProps = Omit<ComponentProps<typeof Pressable>, "children">
  & RefAttributes<typeof Pressable>
  & VariantProps<typeof buttonVariants>
  & {
    children?: ReactNode
    /** Shows a spinner in place of the children and blocks presses. */
    loading?: boolean
  }

function Button({
  size,
  variant,
  className,
  disabled,
  loading = false,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(disabled) || loading
  return (
    <TextClassContext value={buttonTextVariants({ variant, size })}>
      <Pressable
        role="button"
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading
          ? <ActivityIndicator color={SPINNER_COLOR[variant ?? "default"]} />
          : children}
      </Pressable>
    </TextClassContext>
  )
}

export { Button, buttonTextVariants, buttonVariants }
