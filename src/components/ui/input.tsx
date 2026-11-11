import type { ComponentProps, RefAttributes } from "react"

import { TextInput } from "react-native"

import { cn } from "cn"

type InputProps = ComponentProps<typeof TextInput>
  & RefAttributes<typeof TextInput>
  & { invalid?: boolean }

function Input({ className, editable = true, invalid = false, ...props }: InputProps) {
  return (
    <TextInput
      editable={editable}
      aria-disabled={!editable}
      className={cn(
        "h-12 rounded-lg border border-input bg-background px-4",
        // Arbitrary size on purpose: a theme size would add a line-height, which misaligns iOS TextInput text.
        "font-sans text-[16px] text-foreground placeholder:text-muted-foreground",
        "focus:border-ring",
        invalid && "border-destructive focus:border-destructive",
        !editable && "bg-muted opacity-60",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
