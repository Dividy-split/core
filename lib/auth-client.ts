import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : (() => {
          const url = process.env.NEXT_PUBLIC_APP_URL
          if (!url) {
            throw new Error("NEXT_PUBLIC_APP_URL must be defined on the server")
          }
          return url
        })(),
})

export const { signIn, signUp, signOut, useSession, getSession } = authClient
