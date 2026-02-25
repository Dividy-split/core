import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SignInForm } from "@/components/auth/sign-in-form"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"

export const metadata = {
  title: "Se connecter - Dividy",
  description: "Connectez-vous à votre compte Dividy",
}

export default function SignInPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Bienvenue</CardTitle>
        <CardDescription>Connectez-vous à votre compte Dividy</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SocialLoginButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continuer avec email
            </span>
          </div>
        </div>

        <SignInForm />

        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
