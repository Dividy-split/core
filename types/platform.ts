export interface Platform {
  id: string;
  name: string;
  logo: string;
  logoColor?: string;
  description: string;
  category: string;
  activeGroups: number;
  isNew?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface PlatformOffer {
  id: string;
  platformId: string;
  sellerName: string;
  planLabel: string;
  pricePerMonth: number;
  invoiceVerified: boolean;
  instantAcceptance: boolean;
  trustScore?: number;
}
