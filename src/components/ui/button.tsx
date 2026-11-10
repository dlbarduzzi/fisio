import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { Pressable } from "react-native"

import { TextClassContext } from "@/components/ui/text"

const buttonVariants = cva(
  `group/button shrink-0 inline-flex items-center justify-center rounded-lg
  overflow-hidden border border-transparent`,
  {
    variants: {
      variant: {
        default: "bg-neutral-900",
        outline: "border-neutral-300 bg-white",
      },
      size: {
        default: "h-10 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonTextVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-white",
        outline: "text-neutral-900",
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = ComponentProps<typeof Pressable>
  & RefAttributes<typeof Pressable>
  & VariantProps<typeof buttonVariants>

function Button({ size, variant, className, ...props }: ButtonProps) {
  return (
    <TextClassContext value={buttonTextVariants({ variant, size })}>
      <Pressable
        role="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    </TextClassContext>
  )
}

export { Button }
