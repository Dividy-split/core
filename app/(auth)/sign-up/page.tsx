import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SignUpForm } from "@/components/auth/sign-up-form"
import { SocialLoginButtons } from "@/components/auth/social-login-buttons"

export const metadata = {
  title: "S'inscrire - Dividy",
  description: "Créez votre compte Dividy pour commencer à économiser",
}

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Créer un compte</CardTitle>
        <CardDescription>Commencez votre aventure Dividy aujourd'hui</CardDescription>
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

        <SignUpForm />

        <p className="text-center text-sm text-muted-foreground">
          Vous avez déjà un compte ?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
