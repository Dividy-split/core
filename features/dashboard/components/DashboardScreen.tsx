// features/dashboard/components/DashboardScreen.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "./api";
import { DashboardStats as DashboardStatsType } from "./types";
import { DashboardStats } from "./DashboardStats";
import { SubscriptionsList } from "./SubscriptionsList";
import { UpcomingPayments } from "./UpcomingPayments";
import { GroupsQuickAccess } from "./GroupsQuickAccess";

function computeStats(
  data: ReturnType<typeof getDashboardData>
): DashboardStatsType {
  const activeCount = data.subscriptions.filter(
    (s) => s.statut === "actif"
  ).length;

  const totalSavings = data.subscriptions.reduce((total, sub) => {
    const diff = sub.prixMensuel - sub.partPayee;
    return total + (diff > 0 ? diff : 0);
  }, 0);

  const groupsCount = data.groups.length;

  return { activeCount, totalSavings, groupsCount };
}

export function DashboardScreen() {
  // Pour l'instant, data sync depuis un mock.
  // Plus tard, tu pourras ici utiliser React Query / fetch depuis une vraie API.
  const data = getDashboardData();
  const stats = computeStats(data);

  return (
    <div className="space-y-6 py-6">
      <header className="space-y-2">
        <Badge
          variant="outline"
          className="bg-green-100 text-[10px] font-semibold uppercase tracking-wide text-green-700 dark:bg-green-900 dark:text-green-200"
        >
          Tableau de bord
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight">
          Résumé de vos abonnements
        </h1>
        <p className="max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
          Visualisez vos abonnements actifs, les économies réalisées et les
          prochaines échéances en un coup d&apos;œil.
        </p>
      </header>

      <DashboardStats stats={stats} />

      <section className="grid gap-6 md:grid-cols-[2fr,1.2fr]">
        <SubscriptionsList items={data.subscriptions} />
        <div className="space-y-4">
          <UpcomingPayments items={data.notifications} />
          <GroupsQuickAccess items={data.groups} />
        </div>
      </section>
    </div>
  );
}
