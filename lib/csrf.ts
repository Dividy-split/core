import { NextRequest, NextResponse } from "next/server"

const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
]

export function verifyCsrf(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin")

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return null
}
