/**
 * TEMPORARY — dev-only Design System Preview.
 * Open with: xcrun simctl openurl booted fisio://design-system
 *   (append ?section=buttons — or typography, colors, inputs, cards, ... — to show one section)
 *        or: adb shell am start -a android.intent.action.VIEW -d fisio://design-system
 * Dev builds also link here from sign-in and the Today tab (src/dev/design-system-link.tsx).
 * To remove: delete this file and src/dev/, then the two <DesignSystemLink /> usages.
 */
import { DesignSystemPreview } from "@/dev/design-system-preview"
import { Redirect, Stack, useLocalSearchParams } from "expo-router"

export default function DesignSystemRoute() {
  const { section } = useLocalSearchParams<{ section?: string }>()
  if (!__DEV__) {
    return <Redirect href="/" />
  }
  return (
    <>
      <Stack.Screen options={{ title: "Design System" }} />
      <DesignSystemPreview section={section} />
    </>
  )
}
