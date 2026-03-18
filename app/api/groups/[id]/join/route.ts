import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { verifyCsrf } from "@/lib/csrf"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrfError = verifyCsrf(request)
  if (csrfError) return csrfError

  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const group = await prisma.group.findUnique({
    where: { id },
    include: { _count: { select: { members: { where: { status: "ACTIVE" } } } } },
  })

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 })
  }

  if (group.ownerId === session.user.id) {
    return NextResponse.json({ error: "You own this group" }, { status: 400 })
  }

  const activeMemberCount = group._count.members
  if (activeMemberCount >= group.maxMembers) {
    return NextResponse.json({ error: "Group is full" }, { status: 400 })
  }

  const existingMember = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId: id, userId: session.user.id } },
  })

  if (existingMember) {
    return NextResponse.json({ error: "Already a member" }, { status: 400 })
  }

  const status = group.instantAcceptance ? "ACTIVE" : "PENDING"

  const member = await prisma.groupMember.create({
    data: {
      groupId: id,
      userId: session.user.id,
      status,
    },
  })

  return NextResponse.json({ member, status }, { status: 201 })
}
