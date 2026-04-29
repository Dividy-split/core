import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOfferById } from "@/data/mockPlatformOffers";
import { mockPlatforms } from "@/data/mockPlatforms";

interface SubscribeSuccessPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ offer?: string }>;
}

export default async function SubscribeSuccessPage({
  params,
  searchParams,
}: SubscribeSuccessPageProps) {
  const { id } = await params;
  const { offer: offerId } = await searchParams;

  const platform = mockPlatforms.find((item) => item.id === id);

  if (!platform || !offerId) {
    notFound();
  }

  const offer = getOfferById(platform.id, offerId);

  if (!offer) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_36%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="overflow-hidden rounded-[2rem] border-zinc-200 bg-white/90 shadow-[0_20px_60px_rgba(24,24,27,0.12)]">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Abonnement confirmé
            </CardTitle>
            <p className="text-sm text-zinc-600">
              Ton accès est prêt, tu peux continuer.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-center">
              <p className="text-zinc-600">
                Vous avez rejoint l&apos;offre{" "}
                <span className="font-semibold text-zinc-950">
                  {offer.planLabel}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-zinc-950">
                  {offer.sellerName}
                </span>{" "}
                pour{" "}
                <span className="font-semibold text-green-700">
                  {offer.pricePerMonth.toFixed(2).replace(".", ",")}€ / mois
                </span>
                .
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Plateforme
                </p>
                <p className="mt-2 text-base font-semibold">{platform.name}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Offre
                </p>
                <p className="mt-2 text-base font-semibold">
                  {offer.planLabel}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                  Montant
                </p>
                <p className="mt-2 text-base font-semibold text-green-700">
                  {offer.pricePerMonth.toFixed(2).replace(".", ",")}€ / mois
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button
                asChild
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Link href={`/platforms/${platform.id}`}>
                  Voir d&apos;autres offres
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-zinc-300 bg-white/90"
              >
                <Link href="/platforms">Retour aux plateformes</Link>
              </Button>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-center">
              <p className="inline-flex items-center gap-2 text-sm text-green-800">
                <Sparkles className="h-4 w-4" />
                Paiement simplifié, partage plus clair.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
