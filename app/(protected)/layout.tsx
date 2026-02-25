import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()

  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session) {
    redirect("/sign-in")
  }

  if (!session.user.emailVerified) {
    redirect("/verify-email")
  }

  return <>{children}</>
}
