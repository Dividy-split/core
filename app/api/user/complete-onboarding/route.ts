import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { verifyCsrf } from "@/lib/csrf"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const csrfError = verifyCsrf(request)
    if (csrfError) return csrfError

    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!session.user.emailVerified) {
      return NextResponse.json(
        { error: "Email not verified" },
        { status: 403 }
      )
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { onboardingCompleted: true },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error completing onboarding:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
