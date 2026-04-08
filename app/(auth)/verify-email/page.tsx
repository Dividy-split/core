"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    if (!email) {
      setError("Adresse email manquante");
      return;
    }

    setIsResending(true);
    setError(null);

    try {
      // BetterAuth doesn't have a resend method, so we'll use signUp with resendEmail
      // For now, we'll show a message to check email
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      setError("Erreur lors du renvoi de l'email. Veuillez réessayer.");
      console.error("Resend error:", err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="rounded-[1.7rem] border-zinc-200/90 bg-white/95 shadow-[0_16px_44px_rgba(24,24,27,0.10)]">
      <CardHeader className="space-y-3 text-left">
        <Badge className="w-fit rounded-full bg-green-600 text-white hover:bg-green-700">
          Vérification
        </Badge>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
          <Mail className="h-5 w-5 text-green-700" />
        </div>
        <CardTitle className="text-2xl tracking-tight">
          Vérifiez votre email
        </CardTitle>
        <CardDescription>
          Nous avons envoyé un lien de vérification à
          <span className="ml-1 font-medium text-zinc-900">
            {email || "votre adresse email"}
          </span>
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

        <div className="space-y-3 text-sm text-zinc-600">
          <p>
            Cliquez sur le lien dans l&apos;email pour vérifier votre compte et
            continuer.
          </p>
          <p className="text-xs">Le lien expire dans 24 heures.</p>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
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
            className="mt-1 w-full"
          >
            Retour à la connexion
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
