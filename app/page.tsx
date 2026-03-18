import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HomeSidebar } from "@/components/ui/home-sidebar";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      {/* Navigation latérale */}
      <HomeSidebar />

      {/* Bouton pour remonter en haut */}
      <ScrollToTopButton />

      {/* Hero Section */}
      <section
        id="hero"
        className="container mx-auto px-4 py-12 max-w-5xl text-center"
      >
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Divisez vos abonnements,
          <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {" "}
            pas vos économies
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Partagez les coûts de vos abonnements préférés avec vos amis et votre
          famille. Dividy gère les paiements équitablement et vous aide à
          économiser des centaines d'euros chaque année.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/platforms">
            <Button size="lg" variant="outline" className="text-base">
              Plateformes
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              size="lg"
              className="text-base bg-green-600 hover:bg-green-700"
            >
              C&apos;est parti !
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="container mx-auto px-4 py-8 max-w-5xl"
      >
        <h2 className="mb-12 text-center text-3xl font-bold">
          Comment ça marche
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="font-bold text-green-700 dark:text-green-200">
                  1
                </span>
              </div>
              <CardTitle>Créer ou rejoindre</CardTitle>
              <CardDescription>
                Démarrez un nouveau groupe ou rejoignez celui d'un ami
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Créez facilement un groupe avec vos amis et votre famille.
                Invitez-les avec un simple lien ou un code d'accès.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="font-bold text-green-700 dark:text-green-200">
                  2
                </span>
              </div>
              <CardTitle>Ajouter les abonnements</CardTitle>
              <CardDescription>
                Partagez la liste de vos abonnements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Ajoutez vos abonnements Netflix, Spotify, Adobe Cloud, etc.
                Dividy calcule automatiquement qui paie quoi.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <span className="font-bold text-green-700 dark:text-green-200">
                  3
                </span>
              </div>
              <CardTitle>Économiser</CardTitle>
              <CardDescription>Suivez vos économies mensuelles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Recevez des rappels de paiement automatiques et suivez vos
                économies en temps réel.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <Separator className="my-8" />
      </div>

      {/* Savings Examples Section */}
      <section id="savings" className="container mx-auto px-4 py-8 max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Exemples d'économies
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Netflix Premium</CardTitle>
              <CardDescription>Plan 4 écrans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Prix normal: 22,99€/mois
                  </span>
                </p>
                <p className="text-2xl font-bold text-green-600">5,75€</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  par personne (groupe de 4)
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Économie: 17,24€/mois
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spotify Family</CardTitle>
              <CardDescription>6 comptes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Prix normal: 17,99€/mois
                  </span>
                </p>
                <p className="text-2xl font-bold text-green-600">3,00€</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  par personne (groupe de 6)
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Économie: 14,99€/mois
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adobe Creative Cloud</CardTitle>
              <CardDescription>Plan individuel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Prix normal: 60,49€/mois
                  </span>
                </p>
                <p className="text-2xl font-bold text-green-600">15,12€</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  par personne (groupe de 4)
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Économie: 45,37€/mois
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disney+</CardTitle>
              <CardDescription>Plan Premium</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Prix normal: 13,99€/mois
                  </span>
                </p>
                <p className="text-2xl font-bold text-green-600">4,66€</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  par personne (groupe de 3)
                </p>
                <p className="text-sm font-semibold text-green-600">
                  Économie: 9,33€/mois
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Économies potentielles:{" "}
            <span className="text-3xl text-green-600">87€+/mois</span>
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <Separator className="my-8" />
      </div>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-8 max-w-5xl">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Avantages de Dividy
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>💳 Paiements sécurisés</CardTitle>
              <CardDescription>Protection de vos données</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Tous les paiements sont sécurisés avec chiffrement de niveau
                bancaire. Vos données financières ne sont jamais stockées sur
                nos serveurs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>✨ Simple et intuitif</CardTitle>
              <CardDescription>Facile pour tout le monde</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Interface claire et épurée. En quelques clics, créez un groupe
                et commencez à économiser sans complications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🔐 Gestion équitable</CardTitle>
              <CardDescription>Transparence totale</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dividy calcule automatiquement qui doit payer quoi. Pas de
                disputes, tous les calculs sont transparents.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⏰ Rappels automatiques</CardTitle>
              <CardDescription>Ne manquez jamais un paiement</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Recevez des notifications avant chaque échéance de paiement.
                Jamais d'oubli avec Dividy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Suivi en temps réel</CardTitle>
              <CardDescription>Voyez vos économies</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Dashboard complet pour suivre vos dépenses et économies.
                Graphiques détaillés pour chaque abonnement.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💬 Support 24/7</CardTitle>
              <CardDescription>Nous sommes là pour vous</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Équipe disponible 24h/24 pour vous aider. Questions ou
                problèmes? Nous répondons rapidement.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mx-auto max-w-3xl">
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl">
                Prêt à commencer ?
              </CardTitle>
              <CardDescription className="text-emerald-50">
                Rejoignez les milliers d'utilisateurs qui économisent des
                centaines d'euros chaque année
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href={"/sign-up"}>
                <Button
                  size="lg"
                  className="text-base bg-white text-green-600 hover:bg-emerald-50"
                >
                  Créer mon compte gratuitement
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold">Produit</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#features" className="hover:underline">
                    Avantages
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:underline">
                    Comment ça marche
                  </a>
                </li>
                <li>
                  <a href="#savings" className="hover:underline">
                    Économies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Entreprise</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Carrières
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Légal</h3>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="#" className="hover:underline">
                    Confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Conditions d'utilisation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Politique de cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
            © 2024 Dividy. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
