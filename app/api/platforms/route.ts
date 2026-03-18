import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const platforms = await prisma.platform.findMany({
    include: {
      _count: { select: { groups: true } },
    },
    orderBy: { name: "asc" },
  })

  return NextResponse.json(platforms)
}
