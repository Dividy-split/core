// features/dashboard/components/GroupsQuickAccess.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Group } from "./types";

type Props = {
  items: Group[];
};

export function GroupsQuickAccess({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes groupes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((group) => (
          <Button
            key={group.id}
            variant="outline"
            size="sm"
            className="flex w-full flex-col items-start justify-start gap-1 border-zinc-200 bg-white text-left dark:border-zinc-800 dark:bg-zinc-950/40"
            onClick={() => {
              // plus tard tu remplaceras par un vrai router.push(`/groups/${group.id}`)
              console.log("Go to group", group.id);
            }}
          >
            <span className="text-sm font-medium">{group.nom}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Abonnement : {group.abonnement} · Rôle : {group.role}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
