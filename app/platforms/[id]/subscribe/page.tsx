import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Bolt,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformLogo from "@/components/ui/platformLogo";
import { getOfferById } from "@/data/mockPlatformOffers";
import { mockPlatforms } from "@/data/mockPlatforms";

interface SubscribePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ offer?: string }>;
}

export default async function SubscribePage({
  params,
  searchParams,
}: SubscribePageProps) {
  const { id } = await params;
  const { offer: offerId } = await searchParams;

  const platform = mockPlatforms.find((item) => item.id === id);

  if (!platform || !offerId) {
    return notFound();
  }

  const offer = getOfferById(platform.id, offerId);

  if (!offer) {
    return notFound();
  }

  const platformId = platform.id;
  const selectedOfferId = offer.id;

  async function confirmSubscription() {
    "use server";
    redirect(
      `/platforms/${platformId}/subscribe/success?offer=${selectedOfferId}`,
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          href={`/platforms/${platform.id}`}
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux offres
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
          <Card className="overflow-hidden rounded-[2rem] border-zinc-200 bg-white/85 shadow-[0_20px_60px_rgba(24,24,27,0.10)]">
            <CardHeader className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white shadow-sm">
                  <PlatformLogo
                    iconName={platform.logo}
                    color={platform.logoColor || "currentColor"}
                    size={28}
                    fallbackLabel={platform.name}
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                    Finalisation
                  </p>
                  <CardTitle className="mt-1 text-2xl tracking-tight">
                    Finaliser l&apos;abonnement
                  </CardTitle>
                  <p className="text-sm text-zinc-600">{platform.name}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-sm text-zinc-500">Proposé par</p>
                <p className="mt-1 text-lg font-semibold">{offer.sellerName}</p>
                <p className="mt-1 text-sm text-zinc-600">{offer.planLabel}</p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-sm text-green-800">Prix mensuel</p>
                <p className="mt-1 text-4xl font-semibold tracking-tight text-green-900">
                  {offer.pricePerMonth.toFixed(2).replace(".", ",")}€
                  <span className="ml-2 text-sm font-medium text-green-700">
                    / mois
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {offer.invoiceVerified && (
                  <Badge className="rounded-full bg-green-600 text-white hover:bg-green-700">
                    <BadgeCheck className="mr-1 h-3.5 w-3.5" />
                    Facture vérifiée
                  </Badge>
                )}
                {offer.instantAcceptance && (
                  <Badge className="rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50">
                    <Bolt className="mr-1 h-3.5 w-3.5" />
                    Acceptation instantanée
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.11em] text-zinc-500">
                    Sécurité
                  </p>
                  <p className="mt-2 text-sm text-zinc-700">
                    Paiement clair, infos lisibles, et règles de groupe
                    explicites.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.11em] text-zinc-500">
                    Activation
                  </p>
                  <p className="mt-2 text-sm text-zinc-700">
                    Tu confirmes maintenant et l&apos;accès suit immédiatement
                    selon l&apos;offre.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  asChild
                  className="border-zinc-300 bg-white/90"
                >
                  <Link href={`/platforms/${platform.id}`}>Annuler</Link>
                </Button>
                <form action={confirmSubscription}>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-white hover:bg-green-700 sm:w-auto"
                  >
                    Confirmer l&apos;abonnement
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit rounded-[2rem] border-zinc-200 bg-zinc-950 text-white shadow-[0_20px_60px_rgba(24,24,27,0.22)]">
            <CardHeader>
              <CardTitle className="text-xl tracking-tight">
                Avant de confirmer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 rounded-2xl bg-zinc-900 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-green-400" />
                <p className="text-sm text-zinc-200">
                  Vérifie le plan et le prix. Tu rejoins un groupe réel avec un
                  cadre précis.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-zinc-900 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 text-green-400" />
                <p className="text-sm text-zinc-200">
                  Tu peux ensuite suivre ton abonnement directement depuis ton
                  tableau de bord.
                </p>
              </div>

              <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">
                Dividy • Partage propre des abonnements
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
