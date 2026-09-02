import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { verifyCsrf } from "@/lib/csrf"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; memberId: string }> }
) {
  const csrfError = verifyCsrf(request)
  if (csrfError) return csrfError

  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id, memberId } = await params

  const body = await request.json().catch(() => null)
  const action = body?.action

  if (action !== "accept" && action !== "reject") {
    return NextResponse.json({ error: "Action invalide" }, { status: 400 })
  }

  const group = await prisma.group.findUnique({
    where: { id },
    include: { _count: { select: { members: { where: { status: "ACTIVE" } } } } },
  })

  if (!group) {
    return NextResponse.json({ error: "Groupe introuvable" }, { status: 404 })
  }

  if (group.ownerId !== session.user.id) {
    return NextResponse.json(
      { error: "Seul l'admin du groupe peut traiter les demandes" },
      { status: 403 }
    )
  }

  const member = await prisma.groupMember.findUnique({
    where: { id: memberId },
  })

  if (!member || member.groupId !== id) {
    return NextResponse.json({ error: "Demande introuvable" }, { status: 404 })
  }

  if (member.status !== "PENDING") {
    return NextResponse.json(
      { error: "Cette demande a déjà été traitée" },
      { status: 400 }
    )
  }

  if (action === "accept" && group._count.members >= group.maxMembers) {
    return NextResponse.json(
      { error: "Ce groupe est complet, impossible d'accepter la demande" },
      { status: 400 }
    )
  }

  const updated = await prisma.groupMember.update({
    where: { id: memberId },
    data: { status: action === "accept" ? "ACTIVE" : "REJECTED" },
  })

  return NextResponse.json({ member: updated, status: updated.status })
}
