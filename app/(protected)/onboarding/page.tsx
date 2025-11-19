"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleComplete = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Call API to mark onboarding as complete
      const response = await fetch("/api/user/complete-onboarding", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to complete onboarding")
      }

      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError("Erreur lors de la fin de l'onboarding. Veuillez réessayer.")
      console.error("Onboarding error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Bienvenue sur Dividy !</CardTitle>
          <CardDescription>
            Votre compte a été créé avec succès. Commençons.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3 py-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Email vérifié</p>
                <p className="text-sm text-muted-foreground">
                  Votre adresse email a été confirmée
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Compte créé</p>
                <p className="text-sm text-muted-foreground">
                  Vous êtes maintenant membre de Dividy
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Prêt à économiser</p>
                <p className="text-sm text-muted-foreground">
                  Commencez à partager vos abonnements
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground py-4">
            Accédez à votre tableau de bord pour créer ou rejoindre un groupe et commencer à économiser.
          </p>

          <Button
            className="w-full"
            onClick={handleComplete}
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? "Chargement..." : "Accéder à mon tableau de bord"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
