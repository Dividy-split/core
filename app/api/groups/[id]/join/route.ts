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
    return NextResponse.json({ error: "Groupe introuvable" }, { status: 404 })
  }

  if (group.ownerId === session.user.id) {
    return NextResponse.json({ error: "Vous êtes le propriétaire de ce groupe" }, { status: 400 })
  }

  const activeMemberCount = group._count.members
  if (activeMemberCount >= group.maxMembers) {
    return NextResponse.json({ error: "Ce groupe est complet" }, { status: 400 })
  }

  const existingMember = await prisma.groupMember.findUnique({
    where: { groupId_userId: { groupId: id, userId: session.user.id } },
  })

  if (existingMember?.status === "ACTIVE") {
    return NextResponse.json({ error: "Vous êtes déjà membre de ce groupe" }, { status: 400 })
  }

  if (existingMember?.status === "PENDING") {
    return NextResponse.json(
      { error: "Votre demande est déjà en attente de validation" },
      { status: 400 }
    )
  }

  const status = group.instantAcceptance ? "ACTIVE" : "PENDING"

  // Une demande refusée peut être renvoyée : on réactive la ligne existante
  // plutôt que d'échouer sur la contrainte unique (groupId, userId).
  const member = existingMember
    ? await prisma.groupMember.update({
        where: { groupId_userId: { groupId: id, userId: session.user.id } },
        data: { status, joinedAt: new Date() },
      })
    : await prisma.groupMember.create({
        data: {
          groupId: id,
          userId: session.user.id,
          status,
        },
      })

  return NextResponse.json({ member, status }, { status: 201 })
}
