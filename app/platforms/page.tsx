"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import PlatformCard from "@/components/features/platforms/PlatformCard";
import CategoryFilter from "@/components/features/platforms/CategoryFilter";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Grid3X3,
  SearchIcon,
  Tag,
  SlidersHorizontal,
} from "lucide-react";

interface PlatformData {
  id: string;
  slug: string;
  name: string;
  logo: string;
  logoColor: string | null;
  description: string;
  category: string;
  _count: { groups: number };
}

const categoryList = [
  { id: "streaming", name: "Streaming Vidéo", icon: "🎬" },
  { id: "music", name: "Musique", icon: "🎵" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "fitness", name: "Fitness", icon: "💪" },
  { id: "cloud", name: "Cloud & Stockage", icon: "☁️" },
  { id: "elearning", name: "E-Learning", icon: "🎓" },
];

export default function PlatformsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortMode, setSortMode] = useState<"popular" | "az">("popular");
  const [platforms, setPlatforms] = useState<PlatformData[]>([]);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch("/api/platforms")
      .then((res) => res.json())
      .then(setPlatforms)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== searchRef.current) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredPlatforms = useMemo(() => {
    const filtered = platforms.filter((platform) => {
      const matchesCategory =
        selectedCategory === "all" || platform.category === selectedCategory;
      const matchesSearch = platform.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortMode === "az") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    }

    return filtered.sort((a, b) => b._count.groups - a._count.groups);
  }, [selectedCategory, searchTerm, platforms, sortMode]);

  const categories = categoryList.map((cat) => ({
    ...cat,
    count: platforms.filter((p) => p.category === cat.id).length,
  }));

  const totalPlatforms = filteredPlatforms.length;
  const hasActiveFilters =
    selectedCategory !== "all" ||
    searchTerm.length > 0 ||
    sortMode !== "popular";

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setSortMode("popular");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="h-5 w-36 animate-pulse rounded bg-zinc-200" />
          <section className="rounded-[2rem] border border-zinc-200/80 bg-white/85 p-6 shadow-sm md:p-8">
            <div className="mx-auto mb-6 h-6 w-52 animate-pulse rounded bg-zinc-200" />
            <div className="mx-auto h-11 max-w-xl animate-pulse rounded-2xl bg-zinc-100" />
          </section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-3xl border border-zinc-200 bg-white/80"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.14),transparent_34%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] px-4 py-10 text-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-950"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l&apos;accueil
        </Link>

        <section className="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white/85 p-6 shadow-sm backdrop-blur md:p-8">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-green-100/40 via-white to-zinc-100/50" />

          <div className="mb-8 text-center">
            <Badge className="mb-5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-green-800 hover:bg-green-50">
              Catalogue des plateformes
            </Badge>
            <h1 className="mb-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Trouve la bonne plateforme
              <span className="block bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 bg-clip-text text-transparent">
                et rejoins un partage clair.
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-base text-zinc-600 md:text-lg">
              Trouvez rapidement un abonnement à partager et comparez les
              plateformes les plus demandées.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm">
              <p className="mb-1 text-xs text-zinc-500">Total plateformes</p>
              <p className="flex items-center gap-2 text-2xl font-semibold">
                <Grid3X3 className="h-5 w-5" />
                {platforms.length}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm">
              <p className="mb-1 text-xs text-zinc-500">Catégories</p>
              <p className="flex items-center gap-2 text-2xl font-semibold">
                <Tag className="h-5 w-5" />
                {categories.length}
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-sm">
              <p className="mb-1 text-xs text-zinc-500">Résultats actuels</p>
              <p className="text-2xl font-semibold">{totalPlatforms}</p>
            </div>
          </div>

          <div className="mx-auto mb-6 max-w-xl">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                ref={searchRef}
                type="text"
                placeholder="Rechercher une plateforme... ( / )"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 rounded-2xl border-zinc-200 bg-white/90 pl-11"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => setSortMode("popular")}
              className={
                sortMode === "popular"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
              }
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Top partages
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setSortMode("az")}
              className={
                sortMode === "az"
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50"
              }
            >
              Tri A-Z
            </Button>
            {hasActiveFilters && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={resetFilters}
                className="text-zinc-600 hover:text-zinc-950"
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </section>

        <div className="mb-6 flex justify-center">
          <Badge className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-base text-green-800 hover:bg-green-50">
            {totalPlatforms} plateforme{totalPlatforms > 1 ? "s" : ""} trouvée
            {totalPlatforms > 1 ? "s" : ""}
          </Badge>
        </div>

        {filteredPlatforms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={{
                  id: platform.slug,
                  name: platform.name,
                  logo: platform.logo,
                  logoColor: platform.logoColor || undefined,
                  description: platform.description,
                  category: platform.category,
                  activeGroups: platform._count.groups,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-zinc-200 bg-white/85 p-10 text-center shadow-sm">
            <p className="text-lg text-zinc-600">Aucune plateforme trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
