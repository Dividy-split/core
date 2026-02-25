import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, BadgeCheck, Bolt } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PlatformLogo from '@/components/ui/platformLogo';
import { getOfferById } from '@/data/mockPlatformOffers';
import { mockPlatforms } from '@/data/mockPlatforms';

interface SubscribePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ offer?: string }>;
}

export default async function SubscribePage({ params, searchParams }: SubscribePageProps) {
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
    'use server';
    redirect(`/platforms/${platformId}/subscribe/success?offer=${selectedOfferId}`);
  }

  return (
    <div className="min-h-screen bg-muted/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href={`/platforms/${platform.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux offres
        </Link>

        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <PlatformLogo
                  iconName={platform.logo}
                  color={platform.logoColor || 'currentColor'}
                  size={28}
                  fallbackLabel={platform.name}
                />
              </div>
              <div>
                <CardTitle>Finaliser l&apos;abonnement</CardTitle>
                <p className="text-sm text-muted-foreground">{platform.name}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Proposé par</p>
              <p className="text-lg font-semibold">{offer.sellerName}</p>
              <p className="mt-1 text-sm text-muted-foreground">{offer.planLabel}</p>
            </div>

            <div className="flex items-center justify-between rounded-lg border bg-background p-4">
              <p className="text-sm text-muted-foreground">Prix mensuel</p>
              <p className="text-3xl font-bold">{offer.pricePerMonth.toFixed(2).replace('.', ',')}€</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {offer.invoiceVerified && (
                <Badge variant="secondary" className="gap-1">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Facture vérifiée
                </Badge>
              )}
              {offer.instantAcceptance && (
                <Badge variant="secondary" className="gap-1">
                  <Bolt className="h-3.5 w-3.5" />
                  Acceptation instantanée
                </Badge>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button variant="outline" asChild>
                <Link href={`/platforms/${platform.id}`}>Annuler</Link>
              </Button>
              <form action={confirmSubscription}>
                <Button type="submit">Confirmer l&apos;abonnement</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
