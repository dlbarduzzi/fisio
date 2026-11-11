import type { ReactNode } from "react"

import { Link } from "expo-router"
import { useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Alert, ScrollView, View } from "react-native"
import { isClerkAPIResponseError, useSSO } from "@clerk/expo"

import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"

import {
  AppleLogo,
  FacebookLogo,
  GoogleLogo,
} from "@/components/icons/brand-logos"

import { DesignSystemLink } from "@/dev/design-system-link"

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

function notImplemented() {
  Alert.alert("Not implemented yet")
}

type ProviderButtonProps = {
  label: string
  logo: ReactNode
  onPress: () => void
  pending?: boolean
}

function ProviderButton({ label, logo, onPress, pending }: ProviderButtonProps) {
  return (
    <Button
      variant="outline"
      onPress={onPress}
      aria-busy={pending}
      aria-label={label}
    >
      <View>
        {logo}
      </View>
      <Text>{label}</Text>
    </Button>
  )
}

export default function SignIn() {
  const google = useGoogleSignIn()
  const insets = useSafeAreaInsets()
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      contentContainerClassName="grow"
      contentInsetAdjustmentBehavior="never"
    >
      <View className="flex-1 justify-between px-6 py-8">
        <Text variant="h1" className="text-center">
          Sign in
        </Text>
        <View className="flex-1" />
        <View className="gap-3">
          <ProviderButton
            label="Sign in with Google"
            logo={<GoogleLogo />}
            onPress={() => void google.signIn()}
            pending={google.pending}
          />
          <ProviderButton
            label="Sign in with Facebook"
            logo={<FacebookLogo />}
            onPress={notImplemented}
          />
          <ProviderButton
            label="Sign in with Apple"
            logo={<AppleLogo />}
            onPress={notImplemented}
          />
          <Text variant="muted" className="mt-3 text-center">
            By continuing, you agree to our
            {"\n"}
            <Link href="/terms" className="font-medium text-heading">
              Terms of Service
            </Link>
            {" "}
            and
            {" "}
            <Link href="/privacy" className="font-medium text-heading">
              Privacy Policy
            </Link>
            .
          </Text>
          <DesignSystemLink className="mt-2" />
        </View>
      </View>
    </ScrollView>
  )
}
