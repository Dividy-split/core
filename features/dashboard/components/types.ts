// features/dashboard/types.ts

export type SubscriptionStatus = "actif" | "en_attente" | "suspendu";

export type Subscription = {
  id: string;
  nom: string;
  plateforme: string;
  prixMensuel: number; // Prix plein de l'abonnement
  partPayee: number; // Ce que l'utilisateur paie réellement
  statut: SubscriptionStatus;
  prochaineEcheance: string; // date au format ISO ou string
};

export type Notification = {
  id: string;
  message: string;
  date: string;
};

export type Group = {
  id: string;
  nom: string;
  role: "admin" | "membre";
  abonnement: string;
};

export type DashboardStats = {
  activeCount: number;
  totalSavings: number;
  groupsCount: number;
};
