import type { NextConfig } from "next"

const devOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]

const extraDevOriginsEnv = process.env.NEXT_ALLOWED_DEV_ORIGINS
const extraDevOrigins = extraDevOriginsEnv
  ? extraDevOriginsEnv.split(",").map((origin) => origin.trim()).filter(Boolean)
  : []

const nextConfig: NextConfig = {
  allowedDevOrigins: [...devOrigins, ...extraDevOrigins],
}

export default nextConfig
