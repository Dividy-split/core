// features/dashboard/api.ts
import { Group, Notification, Subscription } from "./types";

export function getDashboardData(): {
  subscriptions: Subscription[];
  notifications: Notification[];
  groups: Group[];
} {
  const subscriptions: Subscription[] = [
    {
      id: "1",
      nom: "Netflix Premium",
      plateforme: "Netflix",
      prixMensuel: 17.99,
      partPayee: 4.5,
      statut: "actif",
      prochaineEcheance: "2025-01-05",
    },
    {
      id: "2",
      nom: "Spotify Family",
      plateforme: "Spotify",
      prixMensuel: 14.99,
      partPayee: 3.0,
      statut: "actif",
      prochaineEcheance: "2025-01-12",
    },
    {
      id: "3",
      nom: "Disney+",
      plateforme: "Disney+",
      prixMensuel: 10.99,
      partPayee: 0,
      statut: "suspendu",
      prochaineEcheance: "2025-02-01",
    },
  ];

  const notifications: Notification[] = [
    {
      id: "n1",
      message: "Paiement Netflix prévu le 05/01.",
      date: "2024-12-28",
    },
    {
      id: "n2",
      message: "Spotify sera prélevé le 12/01.",
      date: "2024-12-29",
    },
  ];

  const groups: Group[] = [
    {
      id: "g1",
      nom: "Groupe Netflix Famille",
      role: "membre",
      abonnement: "Netflix Premium",
    },
    {
      id: "g2",
      nom: "Team Spotify",
      role: "admin",
      abonnement: "Spotify Family",
    },
  ];

  return { subscriptions, notifications, groups };
}
