"use client"

import { useSession, signOut } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { CreateGroupDialog } from "@/components/features/groups/CreateGroupDialog"
import { Users, Plus, Crown, CheckCircle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GroupData {
  id: string
  planLabel: string
  pricePerMonth: number
  maxMembers: number
  invoiceVerified: boolean
  instantAcceptance: boolean
  platform: {
    name: string
    logo: string
    logoColor: string | null
    category: string
  }
  owner: {
    id: string
    name: string | null
    image: string | null
  }
  _count: {
    members: number
  }
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [groups, setGroups] = useState<GroupData[]>([])
  const [loadingGroups, setLoadingGroups] = useState(true)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [session, isPending, router])

  const fetchGroups = useCallback(async () => {
    try {
      const res = await fetch("/api/groups")
      if (res.ok) {
        setGroups(await res.json())
      }
    } finally {
      setLoadingGroups(false)
    }
  }, [])

  useEffect(() => {
    if (session) {
      fetchGroups()
    }
  }, [session, fetchGroups])

  if (isPending || !session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-zinc-950/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="text-xl font-bold">Dividy</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut()}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground mt-2">
              Bienvenue, {session.user.name || session.user.email} !
            </p>
          </div>
          <CreateGroupDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau groupe
            </Button>
          </CreateGroupDialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Créer un groupe
              </CardTitle>
              <CardDescription>
                Partagez votre abonnement avec d&apos;autres membres
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <CreateGroupDialog>
                <Button className="w-full">Nouveau groupe</Button>
              </CreateGroupDialog>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Rejoindre un groupe
              </CardTitle>
              <CardDescription>
                Parcourez les offres disponibles
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/platforms")}
              >
                Voir les plateformes
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Mes groupes
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex items-end justify-between">
                <p className="text-sm text-muted-foreground">Groupes actifs :</p>
                <p className="text-6xl font-bold">{loadingGroups ? "—" : groups.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {groups.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Mes groupes</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Card
                  key={group.id}
                  className="cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => router.push(`/groups/${group.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {group.platform.name}
                      </CardTitle>
                      {group.owner.id === session.user.id && (
                        <Badge variant="secondary" className="text-xs">
                          <Crown className="mr-1 h-3 w-3" />
                          Owner
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{group.planLabel}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {group._count.members}/{group.maxMembers} membres
                      </div>
                      <span className="font-semibold text-green-600">
                        {group.pricePerMonth.toFixed(2)} &euro;/mois
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {group.invoiceVerified && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Facture
                        </Badge>
                      )}
                      {group.instantAcceptance && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="mr-1 h-3 w-3" />
                          Instantané
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
