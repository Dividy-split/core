"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowRight,
  CheckCircle2,
  LogOut,
  ShieldCheck,
  Orbit,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [autoAnimationDone, setAutoAnimationDone] = useState(false);
  const auth = authClient as {
    updateUser: (data: { onboardingCompleted: boolean }) => Promise<unknown>;
    signOut: () => Promise<unknown>;
  };

  const handleComplete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await auth.updateUser({ onboardingCompleted: true });

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Erreur lors de la fin de l'onboarding. Veuillez réessayer.");
      console.error("Onboarding error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await auth.signOut();
      router.push("/");
    } catch (err) {
      setError("Erreur lors de la déconnexion. Veuillez réessayer.");
      console.error("Sign out error:", err);
      setIsSigningOut(false);
    }
  };

  useEffect(() => {
    const delays = [600, 1400, 2200];
    const timers = delays.map((delay, idx) =>
      window.setTimeout(() => {
        setActiveStep((idx + 1) as 1 | 2 | 3);
        if (idx === delays.length - 1) {
          setAutoAnimationDone(true);
        }
      }, delay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const isStepValidated = (step: 1 | 2 | 3) => {
    if (autoAnimationDone) return true;
    return step <= activeStep;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] p-3 text-zinc-950 sm:p-4 lg:p-5">
      <div className="mx-auto grid w-full max-w-4xl gap-4 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4 lg:items-stretch">
        <Card className="relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border-zinc-800 bg-zinc-950 text-white shadow-[0_22px_62px_rgba(24,24,27,0.24)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(74,222,128,0.22),transparent_36%),radial-gradient(circle_at_90%_90%,rgba(59,130,246,0.16),transparent_40%)]" />
          <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 bottom-10 h-28 w-28 rounded-full border border-white/10" />

          <CardHeader className="relative space-y-2.5 px-5 pt-5.5 text-left sm:px-6 sm:pt-6 lg:px-7">
            <Badge className="w-fit rounded-full bg-green-600 text-white hover:bg-green-700">
              Onboarding
            </Badge>
            <CardTitle className="max-w-lg text-2xl font-semibold leading-tight tracking-tight sm:text-[1.75rem] lg:text-[1.9rem]">
              Bienvenue sur Dividy
            </CardTitle>
            <CardDescription className="max-w-lg text-left text-sm leading-relaxed text-zinc-300/95">
              Ton compte est prêt. Encore une étape avant le dashboard.
            </CardDescription>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-zinc-200 backdrop-blur-sm">
                <Orbit className="h-3.5 w-3.5 text-green-400" />
                Espace Prêt
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-2.5 px-5 pb-5 sm:px-6 lg:px-7">
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/90 p-3.5 text-left shadow-sm">
              <p className="inline-flex items-center gap-2 text-sm text-zinc-200">
                <ShieldCheck className="h-4 w-4 shrink-0 text-green-400" />
                Espace sécurisé, validation automatique et accès immédiat.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-700/70 bg-zinc-900/70 p-3 text-left">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">
                Validation en cours
              </p>
              <p className="mt-1 text-sm text-zinc-200">
                3 étapes visuelles confirmées avant accès dashboard.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex h-full w-full flex-col rounded-[1.7rem] border-zinc-200 bg-white/90 shadow-[0_16px_40px_rgba(24,24,27,0.10)]">
          <CardHeader className="space-y-1.5 px-5 pt-5 text-left sm:px-6 sm:pt-5.5">
            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-4.5 w-4.5 text-green-600" />
            </div>
            <CardTitle className="text-lg tracking-tight sm:text-[1.2rem]">
              Compte configuré avec succès
            </CardTitle>
            <CardDescription className="text-xs leading-relaxed text-zinc-600">
              Les étapes se valident automatiquement.
            </CardDescription>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-300"
                style={{ width: `${activeStep * 33.3}%` }}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
              Étape active: 0{activeStep}
            </p>
          </CardHeader>

          <CardContent className="space-y-3 px-5 pb-4.5 sm:px-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <div
                className={`w-full rounded-2xl border bg-white p-3 text-left transition-all ${isStepValidated(1) ? "border-green-300 shadow-[0_8px_18px_rgba(34,197,94,0.12)]" : "border-zinc-200"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold">01. Email vérifié</p>
                  {isStepValidated(1) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Validé
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-zinc-600">
                  Votre adresse email a été confirmée
                </p>
              </div>

              <div
                className={`w-full rounded-2xl border bg-white p-3 text-left transition-all ${isStepValidated(2) ? "border-green-300 shadow-[0_8px_18px_rgba(34,197,94,0.12)]" : "border-zinc-200"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold">02. Compte créé</p>
                  {isStepValidated(2) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Validé
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-zinc-600">
                  Vous êtes maintenant membre de Dividy
                </p>
              </div>

              <div
                className={`w-full rounded-2xl border bg-white p-3 text-left transition-all ${isStepValidated(3) ? "border-green-300 shadow-[0_8px_18px_rgba(34,197,94,0.12)]" : "border-zinc-200"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[13px] font-semibold">
                    03. Prêt à économiser
                  </p>
                  {isStepValidated(3) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Validé
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-zinc-600">
                  Commencez à partager vos abonnements
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-green-600 text-white hover:bg-green-700"
              onClick={handleComplete}
              disabled={isLoading || isSigningOut}
              size="default"
            >
              {isLoading ? "Chargement..." : "Accéder à mon tableau de bord"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>

            <Button
              className="w-full border-zinc-300 bg-white/90"
              variant="outline"
              onClick={handleSignOut}
              disabled={isSigningOut || isLoading}
              size="sm"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isSigningOut ? "Déconnexion..." : "Se déconnecter"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
