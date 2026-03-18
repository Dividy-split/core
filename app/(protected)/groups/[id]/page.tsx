"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Users,
  Crown,
  CheckCircle,
  Clock,
  Shield,
  CreditCard,
  CalendarDays,
} from "lucide-react"
import { toast } from "sonner"

interface MemberData {
  id: string
  status: string
  joinedAt: string
  user: {
    id: string
    name: string | null
    image: string | null
    createdAt: string
  }
}

interface GroupDetail {
  id: string
  planLabel: string
  pricePerMonth: number
  maxMembers: number
  invoiceVerified: boolean
  instantAcceptance: boolean
  createdAt: string
  platform: {
    id: string
    name: string
    logo: string
    logoColor: string | null
    category: string
    description: string
  }
  owner: {
    id: string
    name: string | null
    image: string | null
    createdAt: string
  }
  members: MemberData[]
  _count: { members: number }
}

function getInitials(name: string | null): string {
  if (!name) return "?"
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  })
}

export default function GroupDetailPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const params = useParams()
  const groupId = params.id as string

  const [group, setGroup] = useState<GroupDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  useEffect(() => {
    if (!session) return
    fetch(`/api/groups/${groupId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found")
        return res.json()
      })
      .then(setGroup)
      .catch(() => {
        toast.error("Groupe introuvable")
        router.push("/dashboard")
      })
      .finally(() => setLoading(false))
  }, [session, groupId, router])

  async function handleJoin() {
    setJoining(true)
    try {
      const res = await fetch(`/api/groups/${groupId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      if (data.status === "ACTIVE") {
        toast.success("Vous avez rejoint le groupe !")
      } else {
        toast.success("Demande envoyée, en attente d'approbation")
      }
      // Refresh group data
      const refreshed = await fetch(`/api/groups/${groupId}`)
      if (refreshed.ok) setGroup(await refreshed.json())
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur")
    } finally {
      setJoining(false)
    }
  }

  if (isPending || loading || !session) {
    return null
  }

  if (!group) {
    return null
  }

  const isOwner = group.owner.id === session.user.id
  const isMember = group.members.some((m) => m.user.id === session.user.id)
  const isFull = group._count.members >= group.maxMembers
  const spotsLeft = group.maxMembers - group._count.members

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
        <div className="container mx-auto flex h-16 items-center px-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Platform & Group Info */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardDescription className="text-xs uppercase tracking-wider">
                  {group.platform.category}
                </CardDescription>
                <CardTitle className="text-2xl mt-1">
                  {group.platform.name}
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  {group.planLabel}
                </p>
              </div>
              {isOwner && (
                <Badge>
                  <Crown className="mr-1 h-3 w-3" />
                  Votre groupe
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {group.platform.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Price & Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Prix et paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground text-sm">Prix par personne</span>
                <span className="text-2xl font-bold text-green-600">
                  {group.pricePerMonth.toFixed(2)} &euro;
                  <span className="text-sm font-normal text-muted-foreground">/mois</span>
                </span>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Facture vérifiée
                  </span>
                  {group.invoiceVerified ? (
                    <Badge variant="default" className="bg-green-600">Oui</Badge>
                  ) : (
                    <Badge variant="secondary">Non</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Acceptation instantanée
                  </span>
                  {group.instantAcceptance ? (
                    <Badge variant="default" className="bg-green-600">Oui</Badge>
                  ) : (
                    <Badge variant="secondary">Non</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Members */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                Membres ({group._count.members}/{group.maxMembers})
              </CardTitle>
              <CardDescription>
                {spotsLeft > 0
                  ? `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}`
                  : "Groupe complet"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Owner */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={group.owner.image || undefined} />
                  <AvatarFallback>{getInitials(group.owner.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {group.owner.name || "Utilisateur"}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    Membre depuis {formatDate(group.owner.createdAt)}
                  </p>
                </div>
                <Badge variant="outline" className="shrink-0">
                  <Crown className="mr-1 h-3 w-3" />
                  Admin
                </Badge>
              </div>

              {group.members.length > 0 && <Separator />}

              {/* Members */}
              {group.members.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.user.image || undefined} />
                    <AvatarFallback>{getInitials(member.user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {member.user.name || "Utilisateur"}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      Membre depuis {formatDate(member.user.createdAt)}
                    </p>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    <Shield className="mr-1 h-3 w-3" />
                    Membre
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Join Button */}
        {!isOwner && !isMember && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rejoindre ce groupe</p>
                  <p className="text-sm text-muted-foreground">
                    {group.instantAcceptance
                      ? "Vous serez accepté immédiatement"
                      : "Votre demande sera examinée par l'admin"}
                  </p>
                </div>
                <Button
                  size="lg"
                  disabled={isFull || joining}
                  onClick={handleJoin}
                >
                  {joining
                    ? "En cours..."
                    : isFull
                      ? "Groupe complet"
                      : "Rejoindre"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isMember && (
          <Card className="mt-6 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <p className="text-center text-green-600 font-medium flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Vous êtes membre de ce groupe
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
