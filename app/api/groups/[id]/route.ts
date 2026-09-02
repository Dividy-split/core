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

  const isOwner = group.ownerId === session.user.id

  // Adhésion du visiteur, quel que soit son statut : sans ça l'UI ne peut pas
  // distinguer "jamais demandé" de "demande en attente" ou "refusée".
  const viewerMembership = isOwner
    ? null
    : await prisma.groupMember.findUnique({
        where: { groupId_userId: { groupId: id, userId: session.user.id } },
        select: { id: true, status: true, joinedAt: true },
      })

  // Seul l'admin du partage voit les demandes à traiter.
  const pendingRequests = isOwner
    ? await prisma.groupMember.findMany({
        where: { groupId: id, status: "PENDING" },
        include: {
          user: { select: { id: true, name: true, image: true, createdAt: true } },
        },
        orderBy: { joinedAt: "asc" },
      })
    : []

  return NextResponse.json({ ...group, isOwner, viewerMembership, pendingRequests })
}
