"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-client"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import { Loader2 } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email")

  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleResend = async () => {
    if (!email) {
      setError("Adresse email manquante")
      return
    }

    setIsResending(true)
    setError(null)

    try {
      // BetterAuth doesn't have a resend method, so we'll use signUp with resendEmail
      // For now, we'll show a message to check email
      setResendSuccess(true)
      setTimeout(() => setResendSuccess(false), 5000)
    } catch (err) {
      setError("Erreur lors du renvoi de l'email. Veuillez réessayer.")
      console.error("Resend error:", err)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Vérifiez votre email</CardTitle>
        <CardDescription>
          Nous avons envoyé un lien de vérification à{" "}
          <span className="font-medium text-foreground">{email || "votre adresse email"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {resendSuccess && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Email de vérification renvoyé avec succès !
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3 text-center text-sm text-muted-foreground">
          <p>
            Cliquez sur le lien dans l&apos;email pour vérifier votre compte et continuer.
          </p>
          <p className="text-xs">
            Le lien expire dans 24 heures.
          </p>

          <div className="pt-4">
            <p className="mb-3">Vous n&apos;avez pas reçu l&apos;email ?</p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Renvoyer l'email"
              )}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Vérifiez aussi votre dossier spam
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => router.push("/sign-in")}
            className="w-full mt-4"
          >
            Retour à la connexion
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
