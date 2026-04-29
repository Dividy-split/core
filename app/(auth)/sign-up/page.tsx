import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { SocialLoginButtons } from "@/components/auth/social-login-buttons";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "S'inscrire - Dividy",
  description: "Créez votre compte Dividy pour commencer à économiser",
};

export default function SignUpPage() {
  return (
    <Card className="rounded-[1.7rem] border-zinc-200/90 bg-white/95 shadow-[0_16px_44px_rgba(24,24,27,0.10)]">
      <CardHeader className="space-y-3 text-left">
        <Badge className="w-fit rounded-full bg-green-600 text-white hover:bg-green-700">
          Inscription
        </Badge>
        <CardTitle className="text-2xl tracking-tight">
          Créer un compte
        </CardTitle>
        <CardDescription>
          Commencez votre aventure Dividy et activez votre espace en quelques
          secondes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SocialLoginButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-[0.14em]">
            <span className="bg-white px-2 text-zinc-500">
              Ou continuer avec email
            </span>
          </div>
        </div>

        <SignUpForm />

        <p className="text-center text-sm text-zinc-600">
          Vous avez déjà un compte ?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-green-700 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
