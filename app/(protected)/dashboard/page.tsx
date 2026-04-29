"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { CreateGroupDialog } from "@/components/features/groups/CreateGroupDialog";
import {
  Users,
  Plus,
  Crown,
  CheckCircle,
  Clock,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface GroupData {
  id: string;
  planLabel: string;
  pricePerMonth: number;
  maxMembers: number;
  invoiceVerified: boolean;
  instantAcceptance: boolean;
  platform: {
    name: string;
    logo: string;
    logoColor: string | null;
    category: string;
  };
  owner: {
    id: string;
    name: string | null;
    image: string | null;
  };
  _count: {
    members: number;
  };
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [scopeFilter, setScopeFilter] = useState<"all" | "owned">("all");
  const [sortMode, setSortMode] = useState<"recent" | "price">("recent");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  const fetchGroups = useCallback(async () => {
    try {
      const res = await fetch("/api/groups");
      if (res.ok) {
        setGroups(await res.json());
      }
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  useEffect(() => {
    if (session) {
      fetchGroups();
    }
  }, [session, fetchGroups]);

  const dashboardGroups = useMemo(() => {
    if (!session) return [];

    const filtered = groups.filter((group) => {
      const matchesScope =
        scopeFilter === "all" || group.owner.id === session.user.id;
      const matchesSearch =
        group.platform.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.planLabel.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesScope && matchesSearch;
    });

    if (sortMode === "price") {
      return filtered.sort((a, b) => a.pricePerMonth - b.pricePerMonth);
    }

    return filtered;
  }, [groups, scopeFilter, searchTerm, sortMode, session]);

  const ownedCount = useMemo(() => {
    if (!session) return 0;
    return groups.filter((group) => group.owner.id === session.user.id).length;
  }, [groups, session]);

  if (isPending || !session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] text-zinc-950">
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white shadow-sm">
              D
            </div>
            <p className="text-sm font-semibold tracking-tight">Dividy</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-zinc-600 sm:block">
              {session.user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-300 bg-white/90"
              onClick={() => signOut()}
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div>
            <Badge className="mb-4 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-800 hover:bg-green-50">
              Tableau de bord
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Tes groupes et partages
            </h1>
            <p className="mt-2 text-zinc-600">
              Bienvenue, {session.user.name || session.user.email} !
            </p>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="mr-2 h-4 w-4" />
                Créer un groupe
              </CardTitle>
              <CardDescription>
                Partagez votre abonnement avec d&apos;autres membres
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <CreateGroupDialog>
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  Nouveau groupe
                </Button>
              </CreateGroupDialog>
            </CardContent>
          </Card>

          <Card className="flex flex-col rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Rejoindre un groupe
              </CardTitle>
              <CardDescription>
                Parcourez les offres disponibles
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button
                variant="outline"
                className="w-full border-zinc-300 bg-white"
                onClick={() => router.push("/platforms")}
              >
                Voir les plateformes
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Mes groupes
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="flex items-end justify-between">
                <p className="text-sm text-zinc-500">Groupes actifs :</p>
                <p className="text-6xl font-bold">
                  {loadingGroups ? "—" : groups.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 rounded-[2rem] border-zinc-200 bg-white/85 shadow-sm">
          <CardContent className="p-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Rechercher un groupe ou un plan..."
                  className="h-11 rounded-2xl border-zinc-200 bg-white pl-10"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={() => setScopeFilter("all")}
                  className={
                    scopeFilter === "all"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }
                >
                  Tous
                </Button>
                <Button
                  size="sm"
                  onClick={() => setScopeFilter("owned")}
                  className={
                    scopeFilter === "owned"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }
                >
                  Mes groupes
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
                <Button
                  size="sm"
                  onClick={() => setSortMode("recent")}
                  className={
                    sortMode === "recent"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }
                >
                  Récents
                </Button>
                <Button
                  size="sm"
                  onClick={() => setSortMode("price")}
                  className={
                    sortMode === "price"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }
                >
                  Prix
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {loadingGroups && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-44 animate-pulse rounded-3xl border border-zinc-200 bg-white/80"
              />
            ))}
          </div>
        )}

        {!loadingGroups && dashboardGroups.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-xl font-semibold tracking-tight">
              Mes groupes
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboardGroups.map((group) => (
                <Card
                  key={group.id}
                  className="cursor-pointer rounded-3xl border-zinc-200 bg-white/85 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(24,24,27,0.12)]"
                  onClick={() => router.push(`/groups/${group.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        {group.platform.name}
                      </CardTitle>
                      {group.owner.id === session.user.id && (
                        <Badge className="rounded-full bg-green-100 text-xs text-green-800 hover:bg-green-100">
                          <Crown className="mr-1 h-3 w-3" />
                          Owner
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{group.planLabel}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-zinc-500">
                        <Users className="h-4 w-4" />
                        {group._count.members}/{group.maxMembers} membres
                      </div>
                      <span className="font-semibold text-green-600">
                        {group.pricePerMonth.toFixed(2)} &euro;/mois
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {group.invoiceVerified && (
                        <Badge className="rounded-full border border-zinc-200 bg-white text-xs text-zinc-700 hover:bg-zinc-50">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Facture
                        </Badge>
                      )}
                      {group.instantAcceptance && (
                        <Badge className="rounded-full border border-zinc-200 bg-white text-xs text-zinc-700 hover:bg-zinc-50">
                          <Clock className="mr-1 h-3 w-3" />
                          Instantané
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!loadingGroups && dashboardGroups.length === 0 && (
          <Card className="rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardContent className="p-10 text-center text-zinc-600">
              Aucun groupe ne correspond à tes filtres pour le moment.
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
