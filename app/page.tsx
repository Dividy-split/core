import Link from "next/link"
import { ArrowRight, Check, CreditCard, Shield, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HomeSidebar } from "@/components/ui/home-sidebar"
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button"
import { Separator } from "@/components/ui/separator"

const savingsExamples = [
  {
    name: "Netflix Premium",
    total: "22,99EUR",
    split: "5,75EUR",
    saving: "17,24EUR",
    note: "4 personnes",
  },
  {
    name: "Spotify Family",
    total: "17,99EUR",
    split: "3,00EUR",
    saving: "14,99EUR",
    note: "6 personnes",
  },
  {
    name: "YouTube Premium",
    total: "25,99EUR",
    split: "4,33EUR",
    saving: "21,66EUR",
    note: "6 personnes",
  },
  {
    name: "Adobe Creative Cloud",
    total: "60,49EUR",
    split: "15,12EUR",
    saving: "45,37EUR",
    note: "4 personnes",
  },
]

const featureCards = [
  {
    title: "Un cadre clair",
    description:
      "Chaque groupe correspond a un abonnement precis, avec une repartition simple et lisible.",
    icon: Users,
  },
  {
    title: "Un suivi simple",
    description:
      "Tu vois rapidement qui participe, combien il reste de places et ce que chacun paie.",
    icon: Check,
  },
  {
    title: "Une base secure",
    description:
      "Le partage se fait dans un espace plus propre qu'une conversation ou un tableur improvise.",
    icon: Shield,
  },
  {
    title: "Un usage concret",
    description:
      "L'outil est pense pour des vrais usages: amis, colocs, couples, fratries ou petites equipes.",
    icon: CreditCard,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.18),transparent_32%),linear-gradient(to_bottom,#fafaf9,#f4f4f5)] text-zinc-950">
      <HomeSidebar />
      <ScrollToTopButton />

      <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white shadow-sm">
              D
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Dividy</p>
              <p className="text-xs text-zinc-500">Partage d&apos;abonnements</p>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <Link href="/sign-in">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-green-600 text-white hover:bg-green-700">
                Creer un compte
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section
          id="hero"
          className="mx-auto grid min-h-[calc(100vh-81px)] max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20"
        >
          <div className="max-w-2xl">
            <Badge className="mb-5 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-green-800 hover:bg-green-50">
              Partager un abonnement sans improviser
            </Badge>

            <h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Arrete les tableaux bancals.
              <span className="block bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 bg-clip-text text-transparent">
                Organise les abonnements a plusieurs proprement.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 sm:text-xl">
              Dividy t&apos;aide a gerer un abonnement partage avec un groupe
              dedie. Un service, un groupe, une repartition claire.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="w-full bg-green-600 px-6 text-base text-white hover:bg-green-700 sm:w-auto"
                >
                  Commencer gratuitement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-zinc-300 bg-white/80 px-6 text-base sm:w-auto"
                >
                  J&apos;ai deja un compte
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 text-sm text-zinc-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-semibold text-zinc-950">4 min</p>
                <p className="mt-1">pour ouvrir un groupe autour d&apos;un abonnement</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-semibold text-zinc-950">1 espace</p>
                <p className="mt-1">pour suivre qui partage le service et a quel prix</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className="text-2xl font-semibold text-zinc-950">0 flou</p>
                <p className="mt-1">sur qui paie quoi et qui doit encore agir</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-green-200/50 via-white to-zinc-200 blur-2xl" />
            <Card className="overflow-hidden rounded-[2rem] border-zinc-200/80 bg-white/90 shadow-[0_30px_90px_rgba(24,24,27,0.12)] backdrop-blur">
              <CardHeader className="border-b border-zinc-100 bg-zinc-50/80">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">Groupe Netflix Premium</CardTitle>
                    <CardDescription>
                      3 participants deja dans le groupe
                    </CardDescription>
                  </div>
                  <Badge className="rounded-full bg-green-600 px-3 py-1 text-white hover:bg-green-600">
                    17,24EUR economises
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="text-sm font-medium text-green-800">
                    Ce groupe partage uniquement Netflix Premium.
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-green-900">
                    5,75EUR
                    <span className="ml-2 text-sm font-medium text-green-700">
                      par personne
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
                    <div>
                      <p className="font-medium">Prix total</p>
                      <p className="text-sm text-zinc-500">Abonnement mensuel</p>
                    </div>
                    <p className="font-semibold text-zinc-950">22,99EUR</p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
                    <div>
                      <p className="font-medium">Places occupees</p>
                      <p className="text-sm text-zinc-500">
                        Ajoute encore une personne pour reduire les frais par membre
                      </p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap pl-4 text-right text-2xl font-semibold text-zinc-950">
                      3 / 4
                    </p>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-zinc-200 p-4">
                    <div>
                      <p className="font-medium">Mode d&apos;entree</p>
                      <p className="text-sm text-zinc-500">Validation manuelle par le createur du groupe</p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap pl-4 text-right text-2xl font-semibold text-zinc-950">
                      Prive
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <div className="mb-10 max-w-2xl">
            <Badge variant="outline" className="mb-4 rounded-full px-3 py-1">
              Comment ca marche
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Un flow simple pour un sujet qui devient vite penible sans cadre
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="rounded-3xl border-zinc-200 bg-white/80 shadow-sm">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white">
                  01
                </div>
                <CardTitle>Creer le groupe</CardTitle>
                <CardDescription>
                  Tu ouvres un groupe pour un abonnement precis, pas une pile
                  de services melanges.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-zinc-600">
                Choisis la plateforme, fixes les places disponibles et invites
                les bonnes personnes.
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-zinc-200 bg-white/80 shadow-sm">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-sm font-semibold text-white">
                  02
                </div>
                <CardTitle>Repartir les abonnements</CardTitle>
                <CardDescription>
                  Chaque groupe a son prix, ses membres et son equilibre.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-zinc-600">
                Tu comprends tout de suite combien coute l&apos;abonnement en
                solo et combien il revient une fois partage.
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-zinc-200 bg-white/80 shadow-sm">
              <CardHeader>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-sm font-semibold text-emerald-800">
                  03
                </div>
                <CardTitle>Suivre sans se prendre la tete</CardTitle>
                <CardDescription>
                  Pas besoin de renegocier le cadre a chaque nouveau service.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-zinc-600">
                Un groupe reste lisible, ferme et simple a suivre dans le temps.
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Separator className="bg-zinc-200" />
        </div>

        <section
          id="savings"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 rounded-full px-3 py-1">
                Exemples d&apos;economies
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Quelques abonnements, et l&apos;addition change vite
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-zinc-600">
              La promesse n&apos;est pas magique. Elle est juste concrete: mieux
              repartir, mieux suivre, moins gaspiller.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {savingsExamples.map((item) => (
              <Card
                key={item.name}
                className="rounded-3xl border-zinc-200 bg-white/85 shadow-sm"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription>{item.note}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      Prix normal
                    </p>
                    <p className="mt-1 text-2xl font-semibold">{item.total}</p>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-green-700">
                      Cout par personne
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-green-800">
                      {item.split}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-zinc-700">
                    Economie potentielle:{" "}
                    <span className="text-green-700">{item.saving}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Separator className="bg-zinc-200" />
        </div>

        <section
          id="features"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          <div className="mb-10 max-w-2xl">
            <Badge variant="outline" className="mb-4 rounded-full px-3 py-1">
              Pourquoi Dividy
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Une facon plus claire de partager des services sans confusion
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featureCards.map((feature) => {
              const Icon = feature.icon

              return (
                <Card
                  key={feature.title}
                  className="rounded-3xl border-zinc-200 bg-white/85 shadow-sm"
                >
                  <CardHeader className="gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription className="mt-2 text-sm leading-7">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          <Card className="mt-10 rounded-[2rem] border-zinc-200 bg-zinc-950 text-white shadow-[0_24px_70px_rgba(24,24,27,0.22)]">
            <CardContent className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.22em] text-zinc-400">
                  Passer a l&apos;action
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
                  Ouvre ton premier groupe et partage un abonnement proprement.
                </h3>
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  Cree un espace dedie a un service, invites les bonnes
                  personnes et rends enfin le partage lisible.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="w-full bg-green-600 text-white hover:bg-green-700 sm:w-auto"
                  >
                    Ouvrir un compte
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-zinc-700 bg-transparent text-white hover:bg-zinc-900 sm:w-auto"
                  >
                    Acceder a mon espace
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
