import { useState } from "react"
import { Alert, ScrollView, View } from "react-native"
import { isClerkAPIResponseError, useSSO } from "@clerk/expo"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Link } from "expo-router"

function errorMessage(error: unknown) {
  if (isClerkAPIResponseError(error)) {
    const first = error.errors[0]
    return first?.longMessage ?? first?.message ?? error.message
  }
  return error instanceof Error
    ? error.message
    : "Something went wrong! Please try again."
}

function useGoogleSignIn() {
  const { startSSOFlow } = useSSO()
  const [pending, setPending] = useState(false)

  async function signIn() {
    if (pending) {
      return
    }
    setPending(true)
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })
      if (createdSessionId !== null && setActive !== undefined) {
        await setActive({ session: createdSessionId })
      }
    }
    catch (error) {
      Alert.alert("Failed to sign in", errorMessage(error))
    }
    finally {
      setPending(false)
    }
  }

  return { pending, signIn }
}

export default function SignIn() {
  const google = useGoogleSignIn()
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="grow"
      contentInsetAdjustmentBehavior="never"
    >
      <View className="flex-1 items-center justify-center bg-white">
        <Text variant="h1">
          Sign in
        </Text>
        <View className="mt-6">
          <Button
            variant="outline"
            onPress={google.signIn}
            aria-busy={google.pending}
          >
            <Text>Sign in with Google</Text>
          </Button>
        </View>
        <View className="mt-3">
          <Button variant="outline">
            <Text>
              Sign in with Facebook
            </Text>
          </Button>
        </View>
        <View className="mt-3">
          <Button variant="outline">
            <Text>
              Sign in with Apple
            </Text>
          </Button>
        </View>
      </View>
      <View className="mt-[10px] grow">
        <Text
          className="absolute inset-x-0 px-10 text-center leading-[20px]"
        >
          By continuing, you agree to our
          {"\n"}
          <Link
            href="/terms"
            className="font-medium"
          >
            Terms of Service
          </Link>
          {" "}
          and
          {" "}
          <Link
            href="/privacy"
            className="font-medium"
          >
            Privacy Policy
          </Link>
          .
        </Text>
      </View>
    </ScrollView>
  )
}
