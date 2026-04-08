import { Platform } from "@/types/platform";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PlatformLogo from "@/components/ui/platformLogo";
import Link from "next/link";

interface PlatformCardProps {
  platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <Link
      href={`/platforms/${platform.id}`}
      className="block h-full"
      aria-label={`Voir les offres pour ${platform.name}`}
    >
      <Card className="group h-full overflow-hidden rounded-3xl border-zinc-200 bg-white/85 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(24,24,27,0.14)]">
        {/* Logo Container */}
        <CardHeader className="relative pb-4">
          <div className="mb-4 flex h-32 items-center justify-center rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <PlatformLogo
                iconName={platform.logo}
                color={platform.logoColor || "currentColor"}
                size={64}
                fallbackLabel={platform.name}
              />
            </div>
          </div>

          {platform.isNew && (
            <Badge
              variant="default"
              className="absolute right-6 top-6 bg-green-600 text-white hover:bg-green-700"
            >
              Nouveau
            </Badge>
          )}

          <CardTitle className="text-xl tracking-tight">
            {platform.name}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {platform.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          {/* Active Groups Counter */}
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <span className="text-sm font-semibold text-green-700">
                {platform.activeGroups}
              </span>
            </div>
            <span className="text-sm text-zinc-600">
              groupe{platform.activeGroups > 1 ? "s" : ""} actif
              {platform.activeGroups > 1 ? "s" : ""}
            </span>
          </div>
        </CardContent>

        <CardFooter className="border-t border-zinc-200 pt-4">
          <Badge
            variant="secondary"
            className={getCategoryVariant(platform.category)}
          >
            {getCategoryLabel(platform.category)}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}

function getCategoryVariant(category: string): string {
  const variants: Record<string, string> = {
    streaming: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
    music: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
    gaming: "bg-green-100 text-green-700 hover:bg-green-200",
    fitness: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
    cloud: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
    elearning: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
  };
  return variants[category] || "bg-zinc-100 text-zinc-700 hover:bg-zinc-200";
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    streaming: "Streaming Vidéo",
    music: "Musique",
    gaming: "Gaming",
    fitness: "Fitness",
    cloud: "Cloud & Stockage",
    elearning: "E-Learning",
  };
  return labels[category] || category;
}
