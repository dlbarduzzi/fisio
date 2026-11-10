import type { VariantProps } from "class-variance-authority"
import type { ComponentProps, RefAttributes } from "react"

import { cn } from "cn"
import { cva } from "class-variance-authority"
import { Pressable } from "react-native"

import { TextClassContext } from "@/components/ui/text"

const buttonVariants = cva(
  `group/button shrink-0 inline-flex flex-row items-center justify-center rounded-xl
  overflow-hidden border border-transparent border-b-4`,
  {
    variants: {
      variant: {
        default: "bg-sky-500 border-b-sky-600",
        outline: "border-neutral-300 border-b-neutral-200 bg-white",
      },
      size: {
        default: "h-14 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const buttonTextVariants = cva(
  "text-base font-medium",
  {
    variants: {
      variant: {
        default: "text-white font-semibold uppercase",
        outline: "text-neutral-600",
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
