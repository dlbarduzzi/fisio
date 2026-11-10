import { z } from "zod"
import { createEnv } from "@t3-oss/env-core"

const env = createEnv({
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnvStrict: {
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  onValidationError: (issues) => {
    console.error(
      "❌ CLIENT - Invalid Environment Variables ❌",
      JSON.stringify(issues, null, 2),
    )
    process.exit(1)
  },
  emptyStringAsUndefined: true,
  skipValidation: process.env.DANGEROUSLY_SKIP_ENV_VALIDATION === "true",
})

export { env }
