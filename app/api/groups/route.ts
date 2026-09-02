import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { verifyCsrf } from "@/lib/csrf"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const groups = await prisma.group.findMany({
    where: {
      OR: [
        { ownerId: session.user.id },
        {
          members: {
            some: { userId: session.user.id, status: { in: ["ACTIVE", "PENDING"] } },
          },
        },
      ],
    },
    include: {
      platform: true,
      owner: { select: { id: true, name: true, image: true } },
      members: {
        where: { status: "ACTIVE" },
        include: { user: { select: { id: true, name: true, image: true } } },
      },
      _count: { select: { members: { where: { status: "ACTIVE" } } } },
    },
    orderBy: { createdAt: "desc" },
  })

  const groupIds = groups.map((group) => group.id)
  const ownedGroupIds = groups
    .filter((group) => group.ownerId === session.user.id)
    .map((group) => group.id)

  const memberships = await prisma.groupMember.findMany({
    where: { userId: session.user.id, groupId: { in: groupIds } },
    select: { groupId: true, status: true },
  })
  const statusByGroupId = new Map(memberships.map((m) => [m.groupId, m.status]))

  // Nombre de demandes à traiter, pour signaler à l'admin qu'une action l'attend.
  const pendingCounts = await prisma.groupMember.groupBy({
    by: ["groupId"],
    where: { groupId: { in: ownedGroupIds }, status: "PENDING" },
    _count: { _all: true },
  })
  const pendingByGroupId = new Map(
    pendingCounts.map((row) => [row.groupId, row._count._all])
  )

  return NextResponse.json(
    groups.map((group) => ({
      ...group,
      viewerStatus:
        group.ownerId === session.user.id
          ? "OWNER"
          : (statusByGroupId.get(group.id) ?? null),
      pendingCount: pendingByGroupId.get(group.id) ?? 0,
    }))
  )
}

export async function POST(request: NextRequest) {
  const csrfError = verifyCsrf(request)
  if (csrfError) return csrfError

  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { platformId, planLabel, pricePerMonth, maxMembers, invoiceVerified, instantAcceptance } = body

  if (!platformId || !planLabel || !pricePerMonth || !maxMembers) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const platform = await prisma.platform.findUnique({ where: { id: platformId } })
  if (!platform) {
    return NextResponse.json({ error: "Platform not found" }, { status: 404 })
  }

  const group = await prisma.group.create({
    data: {
      platformId,
      ownerId: session.user.id,
      planLabel,
      pricePerMonth: parseFloat(pricePerMonth),
      maxMembers: parseInt(maxMembers),
      invoiceVerified: invoiceVerified ?? false,
      instantAcceptance: instantAcceptance ?? false,
    },
    include: {
      platform: true,
      owner: { select: { id: true, name: true, image: true } },
    },
  })

  return NextResponse.json(group, { status: 201 })
}
