/**
 * TEMPORARY — visual validation of the design system against the Nexter source.
 * Uses only tokens (src/styles/global.css) and components (src/components/ui).
 * Remove together with src/app/design-system.tsx.
 */
import type { ReactNode } from "react"
import type { ColorToken } from "@/styles/tokens"

import { cn } from "cn"
import { useState } from "react"
import { Pressable, ScrollView, View } from "react-native"

import {
  IconArrowRight,
  IconHeart,
  IconHome,
  IconMapPin,
  IconUser,
  IconWorld,
} from "@tabler/icons-react-native"

import { Text } from "@/components/ui/text"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { colors } from "@/styles/tokens"

// ---------------------------------------------------------------------------
// Data (class names are literal strings so Tailwind can see them)
// ---------------------------------------------------------------------------

const SWATCHES: { token: ColorToken, className: string, source?: string }[] = [
  { token: "primary", className: "bg-primary", source: "$color-primary" },
  { token: "primaryPressed", className: "bg-primary-pressed", source: "$color-primary-dark" },
  { token: "primaryText", className: "bg-primary-text" },
  { token: "secondary", className: "bg-secondary", source: "$color-secondary" },
  { token: "secondaryPressed", className: "bg-secondary-pressed" },
  { token: "secondaryMuted", className: "bg-secondary-muted", source: "$color-grey-light-2" },
  { token: "heading", className: "bg-heading", source: "$color-grey-dark-1" },
  { token: "foreground", className: "bg-foreground", source: "$color-grey-dark-2" },
  { token: "mutedForeground", className: "bg-muted-foreground" },
  { token: "background", className: "bg-background" },
  { token: "card", className: "bg-card", source: "$color-grey-light-1" },
  { token: "accent", className: "bg-accent" },
  { token: "border", className: "bg-border" },
  { token: "ring", className: "bg-ring" },
  { token: "destructive", className: "bg-destructive" },
  { token: "destructiveMuted", className: "bg-destructive-muted" },
  { token: "success", className: "bg-success" },
  { token: "successMuted", className: "bg-success-muted" },
]

const SPACING = [
  { label: "1 · 4", className: "w-1" },
  { label: "2 · 8", className: "w-2" },
  { label: "3 · 12", className: "w-3" },
  { label: "4 · 16", className: "w-4" },
  { label: "5 · 20", className: "w-5" },
  { label: "6 · 24", className: "w-6" },
  { label: "8 · 32", className: "w-8" },
  { label: "10 · 40", className: "w-10" },
  { label: "12 · 48", className: "w-12" },
  { label: "16 · 64", className: "w-16" },
  { label: "20 · 80", className: "w-20" },
]

const RADII = [
  { label: "none", className: "rounded-none" },
  { label: "sm", className: "rounded-sm" },
  { label: "md", className: "rounded-md" },
  { label: "lg ★", className: "rounded-lg" },
  { label: "xl", className: "rounded-xl" },
  { label: "full", className: "rounded-full" },
]

const SHADOWS = [
  { label: "shadow-sm", className: "shadow-sm" },
  { label: "shadow-md", className: "shadow-md" },
  { label: "shadow-lg", className: "shadow-lg" },
]

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function Section({ title, children }: { title: string, children: ReactNode }) {
  return (
    <View className="gap-5 px-6 py-10">
      <View className="gap-3">
        <Text variant="eyebrow">{title}</Text>
        <Separator />
      </View>
      {children}
    </View>
  )
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

function NexterHero() {
  return (
    <View className="gap-6 bg-secondary px-6 py-12">
      <Text variant="eyebrow" className="text-primary">Your own home:</Text>
      <Text variant="display" className="text-secondary-foreground">
        The ultimate personal freedom
      </Text>
      <Button className="self-start">
        <Text>View our properties</Text>
      </Button>
      <View className="flex-row items-center gap-4">
        <Separator className="flex-1 bg-secondary-muted" />
        <Text variant="small" className="text-secondary-muted">Seen on</Text>
        <Separator className="flex-1 bg-secondary-muted" />
      </View>
      <View className="gap-5">
        {[["Erik Feinman", "245"], ["Kim Brown", "212"]].map(([name, sold]) => (
          <View key={name} className="flex-row items-center gap-4">
            <View className="size-14 items-center justify-center rounded-full bg-primary">
              <IconUser size={24} color={colors.primaryForeground} />
            </View>
            <View>
              <Text variant="h3" className="text-secondary-foreground">{name}</Text>
              <Text variant="small" className="uppercase text-secondary-muted">
                {`${sold} houses sold`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

function TypographySection() {
  return (
    <Section title="Typography">
      <View className="gap-1">
        <Text variant="display">Display</Text>
        <Text variant="caption">display · Josefin Sans 400 · 36/40</Text>
      </View>
      <View className="gap-1">
        <Text variant="h1">Heading one</Text>
        <Text variant="caption">h1 · Josefin Sans 400 italic · 32/36</Text>
      </View>
      <View className="gap-1">
        <Text variant="h2">Heading two</Text>
        <Text variant="caption">h2 · Josefin Sans 400 · 24/30</Text>
      </View>
      <View className="gap-1">
        <Text variant="h3">Heading three</Text>
        <Text variant="caption">h3 · Josefin Sans 400 · 18/24</Text>
      </View>
      <View className="gap-1">
        <Text variant="eyebrow">Eyebrow label</Text>
        <Text variant="caption">eyebrow · text-sm · Josefin Sans 400 uppercase · 14/22</Text>
      </View>
      <View className="gap-1">
        <Text variant="lead">Lead paragraph for introductions and summaries.</Text>
        <Text variant="caption">lead · Geist 300 · 17/27</Text>
      </View>
      <View className="gap-1">
        <Text>
          Body text is set in Geist at 16 over 26 — the source line-height of 1.6 —
          in the warm brown foreground colour.
        </Text>
        <Text variant="caption">default · Geist 400 · 16/26</Text>
      </View>
      <View className="gap-1">
        <Text variant="small">Small text for secondary details.</Text>
        <Text variant="caption">small · Geist 400 · 14/22</Text>
      </View>
      <View className="gap-1">
        <Text variant="muted">Muted helper text.</Text>
        <Text variant="caption">muted · Geist 400 · 14/22 · muted-foreground</Text>
      </View>
      <Text variant="caption">caption · Geist 400 · 12/16</Text>

      <Separator />
      <Text variant="h3">Weights</Text>
      <View className="gap-1">
        <Text className="font-light">Geist Light 300</Text>
        <Text className="font-normal">Geist Regular 400</Text>
        <Text className="font-medium">Geist Medium 500</Text>
        <Text className="font-semibold">Geist SemiBold 600</Text>
        <Text className="font-bold">Geist Bold 700</Text>
        <Text className="font-display">Josefin Sans Regular 400</Text>
        <Text className="font-display italic">Josefin Sans Italic 400</Text>
        <Text className="font-display font-semibold">Josefin Sans SemiBold 600</Text>
      </View>
    </Section>
  )
}

function ColorSection() {
  return (
    <Section title="Colors">
      <View className="flex-row flex-wrap gap-3">
        {SWATCHES.map(swatch => (
          <View key={swatch.token} className="w-[47%] gap-2">
            <View className={cn("h-16 rounded-lg border border-border", swatch.className)} />
            <View>
              <Text variant="small" className="font-medium text-heading">
                {swatch.className.replace("bg-", "")}
              </Text>
              <Text variant="caption">{colors[swatch.token]}</Text>
              {swatch.source !== undefined ? <Text variant="caption">{swatch.source}</Text> : null}
            </View>
          </View>
        ))}
      </View>
    </Section>
  )
}

function ButtonSection() {
  const [loading, setLoading] = useState(false)
  return (
    <Section title="Buttons">
      <View className="gap-3">
        <Button><Text>Default</Text></Button>
        <Button variant="secondary"><Text>Secondary</Text></Button>
        <Button variant="outline"><Text>Outline</Text></Button>
        <Button variant="ghost"><Text>Ghost</Text></Button>
        <Button variant="destructive"><Text>Destructive</Text></Button>
        <Button variant="link" className="self-start"><Text>Link button</Text></Button>
      </View>
      <Text variant="caption">Press and hold any button to see its pressed state.</Text>

      <Text variant="h3">Sizes</Text>
      <View className="flex-row flex-wrap items-center gap-3">
        <Button size="sm"><Text>Small</Text></Button>
        <Button><Text>Default</Text></Button>
        <Button size="lg"><Text>Large</Text></Button>
        <Button size="icon" variant="outline" aria-label="Like">
          <IconHeart size={20} color={colors.primary} />
        </Button>
      </View>

      <Text variant="h3">States</Text>
      <View className="gap-3">
        <Button disabled><Text>Disabled</Text></Button>
        <Button variant="outline" disabled><Text>Disabled outline</Text></Button>
        <Button loading={loading} onPress={() => setLoading(true)}>
          <Text>Tap to load</Text>
        </Button>
        {loading ? (
          <Button variant="ghost" size="sm" onPress={() => setLoading(false)}>
            <Text>Reset loading</Text>
          </Button>
        ) : null}
        <Button variant="secondary">
          <Text>With icon</Text>
          <IconArrowRight size={18} color={colors.secondaryForeground} />
        </Button>
      </View>
    </Section>
  )
}

function InputSection() {
  const [value, setValue] = useState("")
  return (
    <Section title="Inputs">
      <View className="gap-2">
        <Text variant="small" className="font-medium text-heading">Default (tap to focus)</Text>
        <Input placeholder="Your name" value={value} onChangeText={setValue} />
      </View>
      <View className="gap-2">
        <Text variant="small" className="font-medium text-heading">Invalid</Text>
        <Input placeholder="Email" defaultValue="not-an-email" invalid />
        <Text variant="caption" className="text-destructive">Enter a valid email address.</Text>
      </View>
      <View className="gap-2">
        <Text variant="small" className="font-medium text-heading">Disabled</Text>
        <Input placeholder="Not editable" editable={false} />
      </View>
    </Section>
  )
}

function CardSection() {
  return (
    <Section title="Cards">
      {/* Nexter `.home` card */}
      <Card className="gap-0 overflow-hidden p-0">
        <View className="h-44 items-end bg-secondary-pressed p-3">
          <IconHeart size={24} color={colors.primary} fill={colors.primary} />
        </View>
        <View className="-mt-5 w-4/5 self-center bg-secondary p-3">
          <Text className="text-center font-display text-secondary-foreground">
            Beautiful Family House
          </Text>
        </View>
        <View className="gap-3 p-5">
          <View className="flex-row items-center gap-3">
            <IconMapPin size={20} color={colors.primary} />
            <Text variant="small">USA</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <IconHome size={20} color={colors.primary} />
            <Text variant="small">5 rooms · 325 m²</Text>
          </View>
        </View>
        <Button className="rounded-none"><Text>Contact realtor</Text></Button>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Default card</CardTitle>
          <CardDescription>bg-card — the source&apos;s warm off-white surface.</CardDescription>
        </CardHeader>
        <CardContent>
          <Text>Card content uses body text.</Text>
        </CardContent>
        <CardFooter>
          <Button size="sm"><Text>Action</Text></Button>
          <Button size="sm" variant="ghost"><Text>Cancel</Text></Button>
        </CardFooter>
      </Card>

      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline card</CardTitle>
          <CardDescription>For grouping on white backgrounds.</CardDescription>
        </CardHeader>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated card</CardTitle>
          <CardDescription>shadow-md — the source image shadow.</CardDescription>
        </CardHeader>
      </Card>

      {/* Nexter `.feature` */}
      <View className="flex-row gap-5">
        <IconWorld size={40} color={colors.primary} />
        <View className="flex-1 gap-2">
          <Text variant="h3" className="uppercase">World&apos;s best luxury homes</Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur distinctio
            necessitatibus pariatur voluptatibus.
          </Text>
        </View>
      </View>

      {/* Nexter `.story__content` */}
      <View className="gap-4 rounded-lg bg-card p-6">
        <Text variant="eyebrow">Happy customers</Text>
        <Text variant="h1">&ldquo;The best decision of our lives&rdquo;</Text>
        <Text className="italic">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptas
          accusantium ex nihil?
        </Text>
        <Button className="self-start"><Text>Find your own home</Text></Button>
      </View>
    </Section>
  )
}

function BadgeSection() {
  return (
    <Section title="Badges">
      <View className="flex-row flex-wrap gap-2">
        <Badge><Text>Default</Text></Badge>
        <Badge variant="secondary"><Text>Secondary</Text></Badge>
        <Badge variant="outline"><Text>Outline</Text></Badge>
        <Badge variant="success">
          <View className="size-2 rounded-full bg-success" />
          <Text>Success</Text>
        </Badge>
        <Badge variant="destructive"><Text>Destructive</Text></Badge>
      </View>
    </Section>
  )
}

function SpacingSection() {
  return (
    <Section title="Spacing · 1 unit = 4dp">
      <View className="gap-2">
        {SPACING.map(step => (
          <View key={step.label} className="flex-row items-center gap-3">
            <Text variant="caption" className="w-16">{step.label}</Text>
            <View className={cn("h-3 bg-primary", step.className)} />
          </View>
        ))}
      </View>
    </Section>
  )
}

function RadiusAndShadowSection() {
  return (
    <Section title="Radius & Shadow">
      <View className="flex-row flex-wrap gap-4">
        {RADII.map(radius => (
          <View key={radius.label} className="items-center gap-2">
            <View className={cn("size-16 bg-secondary", radius.className)} />
            <Text variant="caption">{radius.label}</Text>
          </View>
        ))}
      </View>
      <View className="gap-8 py-4">
        {SHADOWS.map(shadow => (
          <View
            key={shadow.label}
            className={cn("h-20 items-center justify-center rounded-lg bg-background", shadow.className)}
          >
            <Text variant="small">{shadow.label}</Text>
          </View>
        ))}
      </View>
    </Section>
  )
}

function InteractionSection() {
  const [selected, setSelected] = useState("Weekly")
  return (
    <Section title="Interactive states">
      <Pressable
        role="button"
        className="rounded-lg border border-border p-4 active:bg-accent"
      >
        <Text>Pressable row — press and hold for active:bg-accent</Text>
      </Pressable>

      <View className="flex-row gap-2">
        {["Daily", "Weekly", "Monthly"].map((option) => {
          const isSelected = option === selected
          return (
            <Pressable
              key={option}
              role="radio"
              aria-checked={isSelected}
              onPress={() => setSelected(option)}
              className={cn(
                "flex-1 items-center rounded-lg border py-3 active:bg-accent",
                isSelected ? "border-primary bg-accent" : "border-border bg-background",
              )}
            >
              <Text
                variant="small"
                className={cn(isSelected && "font-medium text-accent-foreground")}
              >
                {option}
              </Text>
            </Pressable>
          )
        })}
      </View>
      <Text variant="caption">Selected: accent surface + primary border.</Text>

      {/* Nexter footer nav */}
      <View className="gap-1 rounded-lg bg-secondary p-4">
        {["Find your dream home", "Request proposal", "Download home planner"].map(link => (
          <Pressable
            key={link}
            role="link"
            className="rounded-lg p-3 active:bg-secondary-foreground/5"
          >
            <Text className="text-center font-display text-sm uppercase text-secondary-foreground">
              {link}
            </Text>
          </Pressable>
        ))}
      </View>
    </Section>
  )
}

// ---------------------------------------------------------------------------

const SECTIONS = {
  hero: NexterHero,
  typography: TypographySection,
  colors: ColorSection,
  buttons: ButtonSection,
  inputs: InputSection,
  cards: CardSection,
  badges: BadgeSection,
  spacing: SpacingSection,
  radius: RadiusAndShadowSection,
  states: InteractionSection,
} as const

type SectionKey = keyof typeof SECTIONS

function isSectionKey(value: string | undefined): value is SectionKey {
  return value !== undefined && value in SECTIONS
}

/** Pass `section` (e.g. fisio://design-system?section=buttons) to render one section only. */
function DesignSystemPreview({ section }: { section?: string | undefined }) {
  const keys = isSectionKey(section)
    ? [section]
    : (Object.keys(SECTIONS) as SectionKey[])
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="pb-16"
      contentInsetAdjustmentBehavior="automatic"
    >
      {keys.map((key) => {
        const Section = SECTIONS[key]
        return <Section key={key} />
      })}
    </ScrollView>
  )
}

export { DesignSystemPreview }
