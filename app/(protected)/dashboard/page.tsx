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
import { redirect } from "next/navigation"

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Header */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenue, {session.user.name || session.user.email} !
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Créer un groupe</CardTitle>
              <CardDescription>
                Démarrez un nouveau groupe d'abonnements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Nouveau groupe</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rejoindre un groupe</CardTitle>
              <CardDescription>
                Rejoignez un groupe existant avec un code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Rejoindre
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mes groupes</CardTitle>
              <CardDescription>
                Consultez vos groupes actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aucun groupe pour le moment
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>À venir</CardTitle>
            <CardDescription>
              Fonctionnalités en cours de développement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Création et gestion des groupes</li>
              <li>• Gestion des abonnements partagés</li>
              <li>• Calcul automatique des paiements</li>
              <li>• Historique des transactions</li>
              <li>• Notifications de paiement</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
