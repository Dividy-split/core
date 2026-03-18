// features/dashboard/components/SubscriptionsList.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Subscription } from "./types";
import { formatCurrency } from "@/lib/formatCurrency";
import { formatDateFR } from "@/lib/formatDate";

type Props = {
  items: Subscription[];
};

function statusLabel(status: Subscription["statut"]) {
  switch (status) {
    case "actif":
      return "Actif";
    case "en_attente":
      return "En attente";
    case "suspendu":
      return "Suspendu";
  }
}

export function SubscriptionsList({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Abonnements actifs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((sub) => (
          <div
            key={sub.id}
            className="flex flex-col gap-2 rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950/40 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-sm font-medium">{sub.nom}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {sub.plateforme} · Prochaine échéance :{" "}
                {formatDateFR(sub.prochaineEcheance)}
              </p>
            </div>
            <div className="flex flex-col items-start gap-1 text-sm md:items-end">
              <p>
                Tu paies :{" "}
                <span className="font-semibold">
                  {formatCurrency(sub.partPayee)}
                </span>
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Prix normal : {formatCurrency(sub.prixMensuel)}
              </p>
              <Badge
                variant="outline"
                className="mt-1 text-[10px] uppercase tracking-wide"
              >
                {statusLabel(sub.statut)}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
