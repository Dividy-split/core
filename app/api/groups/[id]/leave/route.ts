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
  })

  if (!group) {
    return NextResponse.json({ error: "Group not found" }, { status: 404 })
  }

  if (group.ownerId === session.user.id) {
    return NextResponse.json({ error: "Le propriétaire ne peut pas quitter son groupe" }, { status: 400 })
  }

  const member = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId: id, userId: session.user.id } },
  })

  if (!member) {
    return NextResponse.json({ error: "Vous n'êtes pas membre de ce groupe" }, { status: 400 })
  }

  await prisma.groupMember.delete({
    where: { groupId_userId: { groupId: id, userId: session.user.id } },
  })

  return NextResponse.json({ success: true })
}
