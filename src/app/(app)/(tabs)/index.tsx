import { View } from "react-native"

import { Text } from "@/components/ui/text"
import { DesignSystemLink } from "@/dev/design-system-link"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background">
      <Text variant="h2">
        Fisio!
      </Text>
      <DesignSystemLink />
    </View>
  )
}
