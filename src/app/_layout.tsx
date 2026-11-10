import { useEffect } from "react"
import { SplashScreen, Stack } from "expo-router"

import { tokenCache } from "@clerk/expo/token-cache"
import { ClerkProvider, useAuth } from "@clerk/expo"

import { env } from "@/lib/env"

import "@/styles/global.css"

if (!env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file")
}

// Keep the splash screen up until Clerk has restored any saved session.
// This way a signed-in user never sees the auth screen flash by.
void SplashScreen.preventAutoHideAsync()

function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hide()
    }
  }, [isLoaded])

  if (!isLoaded) {
    return null
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn} redirectTo="/sign-in">
        <Stack.Screen
          name="(app)"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn} redirectTo="/">
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
      {...(tokenCache !== undefined && { tokenCache })}
    >
      <RootNavigator />
    </ClerkProvider>
  )
}
