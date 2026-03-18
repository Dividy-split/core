import { NextRequest, NextResponse } from "next/server"

function getAllowedOrigins(): string[] {
  const origins = new Set<string>()

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
  if (appUrl) {
    try {
      origins.add(new URL(appUrl).origin)
    } catch {
      // If NEXT_PUBLIC_APP_URL is misconfigured, fall back to localhost
      origins.add("http://localhost:3000")
    }
  } else {
    origins.add("http://localhost:3000")
  }

  if (process.env.NODE_ENV !== "production") {
    const allowedDevOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]

    for (const origin of allowedDevOrigins) {
      origins.add(origin)
    }
  }

  return Array.from(origins)
}

export function verifyCsrf(request: NextRequest): NextResponse | null {
  const originHeader = request.headers.get("origin")
  let origin: string | null = null

  if (originHeader) {
    try {
      origin = new URL(originHeader).origin
    } catch {
      origin = null
    }
  }

  const allowedOrigins = getAllowedOrigins()

  if (!origin || !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return null
}
