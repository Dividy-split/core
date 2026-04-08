import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Bolt,
  Users,
  SlidersHorizontal,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PlatformLogo from "@/components/ui/platformLogo";
import { prisma } from "@/lib/db";

interface PlatformDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ plan?: string; sort?: string }>;
}

function getInitials(name: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function PlatformDetailPage({
  params,
  searchParams,
}: PlatformDetailPageProps) {
  const { id } = await params;
  const { plan, sort } = await searchParams;

  const platform = await prisma.platform.findUnique({
    where: { slug: id },
  });

  if (!platform) {
    notFound();
  }

  const groups = await prisma.group.findMany({
    where: { platformId: platform.id },
    include: {
      owner: { select: { id: true, name: true, image: true } },
      _count: { select: { members: { where: { status: "ACTIVE" } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  const planFilters = ["Tous", ...new Set(groups.map((g) => g.planLabel))];
  const selectedPlan = plan && plan !== "Tous" ? plan : "Tous";
  const selectedSort = sort === "recent" ? "recent" : "price";

  const filteredGroups = groups.filter((group) =>
    selectedPlan === "Tous" ? true : group.planLabel === selectedPlan,
  );

  const displayedGroups = [...filteredGroups].sort((a, b) => {
    if (selectedSort === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.pricePerMonth - b.pricePerMonth;
  });

  const hasFilters = selectedPlan !== "Tous" || selectedSort !== "price";
  const lowestPrice =
    groups.length > 0 ? Math.min(...groups.map((g) => g.pricePerMonth)) : 0;

  const buildQueryHref = (nextPlan: string, nextSort: string) => {
    const query = new URLSearchParams();
    if (nextPlan !== "Tous") query.set("plan", nextPlan);
    if (nextSort !== "price") query.set("sort", nextSort);
    const queryString = query.toString();
    return queryString ? `/platforms/${id}?${queryString}` : `/platforms/${id}`;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          href="/platforms"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour aux plateformes
        </Link>

        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-green-100/40 via-white to-zinc-100/50" />
          <div className="space-y-4 text-center">
            <Badge className="mx-auto rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-green-800 hover:bg-green-50">
              Détails plateforme
            </Badge>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-200 bg-white/90 shadow-sm">
              <PlatformLogo
                iconName={platform.logo}
                color={platform.logoColor || "currentColor"}
                size={48}
                fallbackLabel={platform.name}
              />
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {platform.name}
            </h1>
            <p className="mx-auto max-w-3xl text-base text-zinc-600 md:text-lg">
              {platform.description}
            </p>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-3 shadow-sm">
                <p className="text-xs text-zinc-500">Offres disponibles</p>
                <p className="text-2xl font-semibold">{groups.length}</p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-3 shadow-sm">
                <p className="text-xs text-zinc-500">Prix à partir de</p>
                <p className="text-2xl font-semibold">
                  {groups.length > 0
                    ? `${lowestPrice.toFixed(2).replace(".", ",")}€`
                    : "-"}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white/80 p-3 shadow-sm">
                <p className="text-xs text-zinc-500">Groupes actifs</p>
                <p className="text-2xl font-semibold">{groups.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <Card className="h-fit rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardHeader>
              <CardTitle>Type d&apos;offre {platform.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {planFilters.map((label) => (
                  <Link key={label} href={buildQueryHref(label, selectedSort)}>
                    <Badge
                      className={
                        selectedPlan === label
                          ? "cursor-pointer rounded-full border border-green-600 bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                          : "cursor-pointer rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 hover:bg-zinc-50"
                      }
                    >
                      {label}
                    </Badge>
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-zinc-500">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Tri
                </span>
                <Link href={buildQueryHref(selectedPlan, "price")}>
                  <Badge
                    className={
                      selectedSort === "price"
                        ? "cursor-pointer rounded-full border border-green-600 bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                        : "cursor-pointer rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 hover:bg-zinc-50"
                    }
                  >
                    Prix croissant
                  </Badge>
                </Link>
                <Link href={buildQueryHref(selectedPlan, "recent")}>
                  <Badge
                    className={
                      selectedSort === "recent"
                        ? "cursor-pointer rounded-full border border-green-600 bg-green-600 px-3 py-1 text-white hover:bg-green-700"
                        : "cursor-pointer rounded-full border border-zinc-200 bg-white px-3 py-1 text-zinc-700 hover:bg-zinc-50"
                    }
                  >
                    Plus récents
                  </Badge>
                </Link>
                {hasFilters && (
                  <Link href={`/platforms/${id}`}>
                    <Badge className="cursor-pointer rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-zinc-700 hover:bg-zinc-200">
                      Réinitialiser
                    </Badge>
                  </Link>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 text-foreground" />
                  <div>
                    <p className="text-sm font-medium">Facture vérifiée</p>
                    <p className="text-sm text-muted-foreground">
                      Le propriétaire a fait vérifier son abonnement en
                      fournissant une facture.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bolt className="mt-0.5 h-4 w-4 text-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Acceptation instantanée
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Le propriétaire accepte instantanément les nouveaux
                      co-abonnés.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 text-foreground" />
                  <div>
                    <p className="text-sm font-medium">Profils actifs</p>
                    <p className="text-sm text-muted-foreground">
                      Consultez les informations de chaque profil avant de
                      rejoindre un partage.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {displayedGroups.length === 0 ? (
              <Card className="rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
                <CardContent className="p-6 text-center text-zinc-600">
                  Aucun groupe disponible pour le moment. Soyez le premier à
                  partager votre abonnement !
                </CardContent>
              </Card>
            ) : (
              displayedGroups.map((group) => (
                <Card
                  key={group.id}
                  className="rounded-3xl border-zinc-200 bg-white/85 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(24,24,27,0.12)]"
                >
                  <CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="size-12 border border-zinc-200">
                        <AvatarFallback>
                          {getInitials(group.owner.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">
                            {group.owner.name || "Utilisateur"}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-white">
                            <PlatformLogo
                              iconName={platform.logo}
                              color={platform.logoColor || "currentColor"}
                              size={16}
                              fallbackLabel={platform.name}
                            />
                          </div>
                          <span>{group.planLabel}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {group.invoiceVerified && (
                            <Badge className="rounded-full bg-green-100 text-green-800 hover:bg-green-100">
                              Facture vérifiée
                            </Badge>
                          )}
                          {group.instantAcceptance && (
                            <Badge className="rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-100">
                              Acceptation instantanée
                            </Badge>
                          )}
                          <Badge className="rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50">
                            <Users className="mr-1 h-3 w-3" />
                            {group._count.members}/{group.maxMembers}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="text-right">
                        <p className="text-3xl font-bold">
                          {group.pricePerMonth.toFixed(2).replace(".", ",")}€
                        </p>
                        <p className="text-sm text-zinc-500">/ mois</p>
                      </div>
                      <Button
                        asChild
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <Link href={`/groups/${group.id}`}>Voir le groupe</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
