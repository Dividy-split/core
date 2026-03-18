import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const platform = await prisma.platform.findUnique({ where: { slug } })
  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 })
  }

  const groups = await prisma.group.findMany({
    where: { platformId: platform.id },
    include: {
      owner: { select: { id: true, name: true, image: true } },
      _count: { select: { members: { where: { status: "ACTIVE" } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(groups)
}
