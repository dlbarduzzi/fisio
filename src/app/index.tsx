import { Text, View } from "react-native"

import { cn } from "cn"

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Fisio!
      </Text>
      <View className="mt-3">
        <Text className={cn("bg-sky-300 font-medium p-2 rounded-2xl")}>
          Hello, world!
        </Text>
      </View>
    </View>
  )
}
