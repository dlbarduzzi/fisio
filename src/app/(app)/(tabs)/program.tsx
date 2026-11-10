import { ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/ui/text"

export default function Program() {
  const insets = useSafeAreaInsets()
  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top + 16 }}
      contentContainerClassName="gap-2 px-6 pb-12"
    >
      <Text variant="h1">Program</Text>
      <Text className="text-neutral-600 text-lg">
        Your recovery program and exercise library will live here.
      </Text>
    </ScrollView>
  )
}
