import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOfferById } from '@/data/mockPlatformOffers';
import { mockPlatforms } from '@/data/mockPlatforms';

interface SubscribeSuccessPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ offer?: string }>;
}

export default async function SubscribeSuccessPage({ params, searchParams }: SubscribeSuccessPageProps) {
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
    <div className="min-h-screen bg-muted/20 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-700">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <CardTitle>Abonnement confirmé</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              Vous avez rejoint l&apos;offre <span className="font-medium text-foreground">{offer.planLabel}</span> de{' '}
              <span className="font-medium text-foreground">{offer.sellerName}</span> pour{' '}
              <span className="font-medium text-foreground">{offer.pricePerMonth.toFixed(2).replace('.', ',')}€ / mois</span>.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href={`/platforms/${platform.id}`}>Voir d&apos;autres offres</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/platforms">Retour aux plateformes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
