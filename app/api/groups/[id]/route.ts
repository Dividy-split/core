import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const group = await prisma.group.findUnique({
    where: { id },
    include: {
      platform: true,
      owner: { select: { id: true, name: true, image: true, createdAt: true } },
      members: {
        where: { status: "ACTIVE" },
        include: {
          user: { select: { id: true, name: true, image: true, createdAt: true } },
        },
      },
      _count: { select: { members: { where: { status: "ACTIVE" } } } },
    },
  })

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 })
  }

  return NextResponse.json(group)
}
