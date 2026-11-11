import { useState } from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Image } from "expo-image"
import { useClerk, useUser } from "@clerk/expo"

import { Text } from "@/components/ui/text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingTop: insets.top + 32 }}
      contentContainerClassName="items-center px-6 pb-12"
    >
      {/* Avatar */}
      <View className="rounded-full border-4 border-border p-1">
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
            className="items-center justify-center rounded-full bg-primary"
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          >
            <Text variant="display" className="text-primary-foreground">
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
        <Text variant="muted" className="mt-1 text-center">
          {email}
        </Text>
      ) : null}
      {/* Signed-in badge */}
      <Badge variant="success" className="mt-4 self-center">
        <View className="size-2 rounded-full bg-success" />
        <Text>You are signed in</Text>
      </Badge>
      {/* Sign out */}
      <Button
        variant="outline"
        className="mt-10 w-full"
        onPress={handleSignOut}
        loading={isSigningOut}
      >
        <Text>Sign out</Text>
      </Button>
    </ScrollView>
  )
}
