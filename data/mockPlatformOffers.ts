import { PlatformOffer } from '@/types/platform';

const mockPlatformOffers: PlatformOffer[] = [
  {
    id: 'disney-1',
    platformId: 'disney-plus',
    sellerName: 'Angebrun34',
    planLabel: 'Partage Disney+ Premium 4K',
    pricePerMonth: 5.19,
    invoiceVerified: true,
    instantAcceptance: false,
    trustScore: 98,
  },
  {
    id: 'disney-2',
    platformId: 'disney-plus',
    sellerName: 'Axou',
    planLabel: 'Partage Disney+ Premium 4K',
    pricePerMonth: 5.19,
    invoiceVerified: true,
    instantAcceptance: true,
    trustScore: 95,
  },
  {
    id: 'disney-3',
    platformId: 'disney-plus',
    sellerName: 'Nikpar31',
    planLabel: 'Partage Disney+ Premium 4K',
    pricePerMonth: 5.19,
    invoiceVerified: true,
    instantAcceptance: true,
    trustScore: 100,
  },
  {
    id: 'netflix-1',
    platformId: 'netflix',
    sellerName: 'Tommy',
    planLabel: 'Partage Netflix Premium 4 écrans',
    pricePerMonth: 6.49,
    invoiceVerified: true,
    instantAcceptance: true,
    trustScore: 96,
  },
  {
    id: 'spotify-1',
    platformId: 'spotify',
    sellerName: 'LinaM',
    planLabel: 'Partage Spotify Family',
    pricePerMonth: 3,
    invoiceVerified: true,
    instantAcceptance: true,
    trustScore: 94,
  },
  {
    id: 'prime-video-1',
    platformId: 'prime-video',
    sellerName: 'Martin92',
    planLabel: 'Partage Prime Video',
    pricePerMonth: 4.9,
    invoiceVerified: false,
    instantAcceptance: true,
    trustScore: 90,
  },
];

export function getOffersByPlatformId(platformId: string): PlatformOffer[] {
  const offers = mockPlatformOffers.filter((offer) => offer.platformId === platformId);

  if (offers.length > 0) {
    return offers;
  }

  return [
    {
      id: `${platformId}-default-1`,
      platformId,
      sellerName: 'Membre vérifié',
      planLabel: 'Partage abonnement',
      pricePerMonth: 4.99,
      invoiceVerified: true,
      instantAcceptance: true,
      trustScore: 92,
    },
    {
      id: `${platformId}-default-2`,
      platformId,
      sellerName: 'Utilisateur premium',
      planLabel: 'Partage abonnement',
      pricePerMonth: 5.49,
      invoiceVerified: true,
      instantAcceptance: false,
      trustScore: 89,
    },
  ];
}

export function getOfferById(platformId: string, offerId: string): PlatformOffer | undefined {
  return getOffersByPlatformId(platformId).find((offer) => offer.id === offerId);
}
