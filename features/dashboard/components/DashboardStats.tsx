// features/dashboard/components/DashboardStats.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats as DashboardStatsType } from "./types";
import { formatCurrency } from "@/lib/formatCurrency";

type Props = {
  stats: DashboardStatsType;
};

export function DashboardStats({ stats }: Props) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-500">
            Abonnements actifs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{stats.activeCount}</p>
          <p className="mt-1 text-xs text-zinc-500">
            Abonnements actuellement en cours
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-500">
            Économies estimées / mois
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {formatCurrency(stats.totalSavings)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Différence entre prix normal et ta part
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-500">
            Groupes rejoints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{stats.groupsCount}</p>
          <p className="mt-1 text-xs text-zinc-500">
            Accès rapide à tes groupes ci-dessous
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
