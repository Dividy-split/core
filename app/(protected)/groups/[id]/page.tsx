"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Users,
  Crown,
  CheckCircle,
  Clock,
  Shield,
  CreditCard,
  CalendarDays,
  Sparkles,
  ChevronDown,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";

interface MemberData {
  id: string;
  status: string;
  joinedAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    createdAt: string;
  };
}

interface GroupDetail {
  id: string;
  planLabel: string;
  pricePerMonth: number;
  maxMembers: number;
  invoiceVerified: boolean;
  instantAcceptance: boolean;
  createdAt: string;
  platform: {
    id: string;
    name: string;
    logo: string;
    logoColor: string | null;
    category: string;
    description: string;
  };
  owner: {
    id: string;
    name: string | null;
    image: string | null;
    createdAt: string;
  };
  members: MemberData[];
  _count: { members: number };
}

function getInitials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
}

function formatCategory(category: string): string {
  const map: Record<string, string> = {
    streaming: "Streaming",
    music: "Musique",
    gaming: "Gaming",
    fitness: "Fitness",
    cloud: "Cloud",
    elearning: "E-learning",
  };

  return map[category] ?? category;
}

export default function GroupDetailPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const params = useParams();
  const groupId = params.id as string;

  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [showMembers, setShowMembers] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (!session) return;
    fetch(`/api/groups/${groupId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setGroup)
      .catch(() => {
        toast.error("Groupe introuvable");
        router.push("/dashboard");
      })
      .finally(() => setLoading(false));
  }, [session, groupId, router]);

  async function handleJoin() {
    setJoining(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.status === "ACTIVE") {
        toast.success("Vous avez rejoint le groupe !");
      } else {
        toast.success("Demande envoyée, en attente d'approbation");
      }
      // Refresh group data
      const refreshed = await fetch(`/api/groups/${groupId}`);
      if (refreshed.ok) setGroup(await refreshed.json());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setJoining(false);
    }
  }

  async function handleLeave() {
    setLeaving(true);
    try {
      const res = await fetch(`/api/groups/${groupId}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Vous avez quitté le groupe");
      const refreshed = await fetch(`/api/groups/${groupId}`);
      if (refreshed.ok) setGroup(await refreshed.json());
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLeaving(false);
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Lien du groupe copié");
    } catch {
      toast.error("Impossible de copier le lien");
    }
  }

  if (isPending || !session) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] px-4 py-8 text-zinc-950">
        <div className="mx-auto max-w-4xl space-y-6 sm:px-2">
          <div className="h-5 w-28 animate-pulse rounded bg-zinc-200" />
          <div className="h-36 animate-pulse rounded-[2rem] border border-zinc-200 bg-white/85" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-64 animate-pulse rounded-3xl border border-zinc-200 bg-white/85" />
            <div className="h-64 animate-pulse rounded-3xl border border-zinc-200 bg-white/85" />
          </div>
        </div>
      </div>
    );
  }

  if (!group) {
    return null;
  }

  const isOwner = group.owner.id === session.user.id;
  const isMember = group.members.some((m) => m.user.id === session.user.id);
  const isFull = group._count.members >= group.maxMembers;
  const spotsLeft = group.maxMembers - group._count.members;
  const occupancy = Math.min(
    100,
    Math.round((group._count.members / group.maxMembers) * 100),
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] text-zinc-950">
      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center px-4 sm:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-700 hover:bg-zinc-100"
            onClick={() => router.push("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <Card className="mb-6 overflow-hidden rounded-[2rem] border-zinc-200 bg-white/85 shadow-[0_18px_54px_rgba(24,24,27,0.10)]">
          <CardHeader className="gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Badge className="mb-3 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-green-800 hover:bg-green-50">
                  Détail du groupe
                </Badge>
                <CardDescription className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                  {formatCategory(group.platform.category)}
                </CardDescription>
                <CardTitle className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {group.platform.name}
                </CardTitle>
                <p className="mt-2 text-sm text-zinc-600">{group.planLabel}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600">
                  {group.platform.description}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2">
                {isOwner && (
                  <Badge className="rounded-full bg-zinc-950 text-white hover:bg-zinc-950">
                    <Crown className="mr-1 h-3 w-3" />
                    Votre groupe
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-300 bg-white/90"
                  onClick={handleCopyLink}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Copier le lien
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                  Prix / membre
                </p>
                <p className="mt-1 text-2xl font-semibold text-green-700">
                  {group.pricePerMonth.toFixed(2)} &euro;
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                  Places
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {group._count.members}/{group.maxMembers}
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-zinc-500">
                  Statut
                </p>
                <p className="mt-1 text-2xl font-semibold">
                  {isFull ? "Complet" : `${spotsLeft} dispo`}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.1em] text-zinc-500">
                <span>Occupation</span>
                <span>{occupancy}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all"
                  style={{ width: `${occupancy}%` }}
                />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Price & Payment */}
          <Card className="rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Prix et paiement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-zinc-500">Prix par personne</span>
                <span className="text-2xl font-bold text-green-600">
                  {group.pricePerMonth.toFixed(2)} &euro;
                  <span className="text-sm font-normal text-zinc-500">
                    /mois
                  </span>
                </span>
              </div>
              <Separator className="bg-zinc-200" />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    Facture vérifiée
                  </span>
                  {group.invoiceVerified ? (
                    <Badge className="rounded-full bg-green-600 text-white hover:bg-green-700">
                      Oui
                    </Badge>
                  ) : (
                    <Badge className="rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-100">
                      Non
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Acceptation instantanée
                  </span>
                  {group.instantAcceptance ? (
                    <Badge className="rounded-full bg-green-600 text-white hover:bg-green-700">
                      Oui
                    </Badge>
                  ) : (
                    <Badge className="rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-100">
                      Non
                    </Badge>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  {group.instantAcceptance
                    ? "Entrée instantanée activée: tu rejoins directement ce groupe."
                    : "Entrée manuelle: l'admin valide les nouvelles demandes."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Members */}
          <Card className="rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Membres ({group._count.members}/{group.maxMembers})
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMembers((prev) => !prev)}
                  className="h-8 rounded-full px-2 text-zinc-600 hover:bg-zinc-100"
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${showMembers ? "rotate-180" : ""}`}
                  />
                </Button>
              </div>
              <CardDescription>
                {spotsLeft > 0
                  ? `${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}`
                  : "Groupe complet"}
              </CardDescription>
            </CardHeader>
            {showMembers && (
              <CardContent className="space-y-3">
                {/* Owner */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={group.owner.image || undefined} />
                    <AvatarFallback>
                      {getInitials(group.owner.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {group.owner.name || "Utilisateur"}
                    </p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      Membre depuis {formatDate(group.owner.createdAt)}
                    </p>
                  </div>
                  <Badge className="shrink-0 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50">
                    <Crown className="mr-1 h-3 w-3" />
                    Admin
                  </Badge>
                </div>

                {group.members.length > 0 && (
                  <Separator className="bg-zinc-200" />
                )}

                {/* Members */}
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.user.image || undefined} />
                      <AvatarFallback>
                        {getInitials(member.user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.user.name || "Utilisateur"}
                      </p>
                      <p className="text-xs text-zinc-500 flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        Membre depuis {formatDate(member.user.createdAt)}
                      </p>
                    </div>
                    <Badge className="shrink-0 rounded-full border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50">
                      <Shield className="mr-1 h-3 w-3" />
                      Membre
                    </Badge>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Join Button */}
        {!isOwner && !isMember && (
          <Card className="mt-6 rounded-3xl border-zinc-200 bg-white/85 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">Rejoindre ce groupe</p>
                  <p className="text-sm text-zinc-500">
                    {group.instantAcceptance
                      ? "Vous serez accepté immédiatement"
                      : "Votre demande sera examinée par l'admin"}
                  </p>
                </div>
                <Button
                  size="lg"
                  disabled={isFull || joining}
                  onClick={handleJoin}
                  className="bg-green-600 text-white hover:bg-green-700 sm:min-w-44"
                >
                  {joining
                    ? "En cours..."
                    : isFull
                      ? "Groupe complet"
                      : "Rejoindre"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isMember && (
          <Card className="mt-6 rounded-3xl border-green-200 bg-green-50/70 shadow-sm">
            <CardContent>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                <p className="text-green-700 font-medium flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Vous êtes membre de ce groupe
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={leaving}
                  onClick={handleLeave}
                  className="shrink-0 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  {leaving ? "En cours..." : "Quitter le groupe"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
