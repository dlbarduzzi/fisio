import { ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/ui/text"

export default function Progress() {
  const insets = useSafeAreaInsets()
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingTop: insets.top + 16 }}
      contentContainerClassName="gap-2 px-6 pb-12"
    >
      <Text variant="h1">Progress</Text>
      <Text variant="lead">
        Pain trends, adherence, and milestones will appear here.
      </Text>
    </ScrollView>
  )
}
