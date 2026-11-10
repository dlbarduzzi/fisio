import { useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ActivityIndicator, ScrollView, View } from "react-native"

import { Image } from "expo-image"
import { useClerk, useUser } from "@clerk/expo"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

import { cn } from "cn"

const AVATAR_SIZE = 112

export default function Profile() {
  const insets = useSafeAreaInsets()

  const { user } = useUser()
  const { signOut } = useClerk()

  const [isSigningOut, setIsSigningOut] = useState(false)

  const firstName = user?.firstName ?? user?.username ?? ""
  const fullName = user?.fullName ?? firstName
  const email = user?.primaryEmailAddress?.emailAddress ?? ""
  const initial = (fullName || email).charAt(0).toUpperCase() || "?"

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      // Stack.Protected in the root layout redirects to /sign-in once signed out.
      await signOut()
    }
    catch (error) {
      console.error("Failed to sign out", error)
      setIsSigningOut(false)
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingTop: insets.top + 32 }}
      contentContainerClassName="items-center px-6 pb-12"
    >
      {/* Avatar */}
      <View className="rounded-full border-4 border-neutral-200 p-1">
        {user?.hasImage ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 }}
            contentFit="cover"
            transition={200}
            accessibilityLabel={`${fullName || "User"} profile picture`}
          />
        ) : (
          <View
            className="items-center justify-center rounded-full bg-sky-500"
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          >
            <Text className="text-5xl font-bold text-white">
              {initial}
            </Text>
          </View>
        )}
      </View>
      {/* Greeting */}
      <Text variant="h1" className="mt-6 text-center">
        {firstName ? `Welcome, ${firstName}` : "Welcome"}
      </Text>
      {email ? (
        <Text className="mt-1 text-center text-sm text-neutral-500">
          {email}
        </Text>
      ) : null}
      {/* Signed-in badge */}
      <View className={cn(
        "mt-4 flex-row items-center gap-2 rounded-full",
        "border border-emerald-200 bg-emerald-50 px-3 py-1",
      )}
      >
        <View className="size-2 rounded-full bg-emerald-500" />
        <Text className="text-xs font-medium text-emerald-700">
          You are signed in
        </Text>
      </View>
      {/* Sign out */}
      <Button
        variant="outline"
        className="mt-10 w-full"
        onPress={handleSignOut}
        disabled={isSigningOut}
      >
        {isSigningOut
          ? <ActivityIndicator color="#525252" />
          : <Text>Sign out</Text>}
      </Button>
    </ScrollView>
  )
}
