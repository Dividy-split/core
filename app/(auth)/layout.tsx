import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_38%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] p-4 sm:p-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 p-8 text-white shadow-[0_24px_70px_rgba(24,24,27,0.25)] lg:block">
          <Badge className="mb-5 rounded-full bg-green-600 text-white hover:bg-green-700">
            Espace Auth Dividy
          </Badge>
          <h1 className="max-w-md text-4xl font-semibold leading-tight tracking-tight">
            Rejoins Dividy et simplifie le partage d&apos;abonnements.
          </h1>
          <p className="mt-4 max-w-md text-zinc-300">
            Un flux d&apos;accès rapide, un design clair, et un dashboard prêt
            en quelques secondes.
          </p>

          <div className="mt-8 space-y-3">
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3.5">
              <p className="inline-flex items-center gap-2 text-sm text-zinc-200">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                Connexion sécurisée avec email ou Google
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-700 bg-zinc-900/80 p-3.5">
              <p className="inline-flex items-center gap-2 text-sm text-zinc-200">
                <Sparkles className="h-4 w-4 text-green-400" />
                Onboarding guidé puis accès direct au dashboard
              </p>
            </div>
          </div>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-white"
          >
            Retour à l&apos;accueil
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="w-full">
          <div className="mx-auto mb-4 w-full max-w-md text-center lg:hidden">
            <Badge className="rounded-full bg-green-600 text-white hover:bg-green-700">
              Dividy
            </Badge>
          </div>
          <div className="mx-auto w-full max-w-md">{children}</div>
        </section>
      </div>
    </div>
  );
}
