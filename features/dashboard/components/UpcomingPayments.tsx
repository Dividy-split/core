// features/dashboard/components/UpcomingPayments.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "./types";
import { formatDateFR } from "@/lib/formatDate";

type Props = {
  items: Notification[];
};

export function UpcomingPayments({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prochains paiements</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Aucun paiement imminent 🎉
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {items.map((notif) => (
              <li
                key={notif.id}
                className="rounded-md border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-950/40"
              >
                <p>{notif.message}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {formatDateFR(notif.date)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
