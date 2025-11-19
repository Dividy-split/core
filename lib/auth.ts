import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { prisma } from "./db"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.EMAIL_FROM || "noreply@dividy.app",
        to: user.email,
        subject: "Vérifiez votre adresse email - Dividy",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #16a34a 0%, #10b981 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; background: #f9fafb; border-radius: 0 0 8px 8px; }
                .button { display: inline-block; background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .footer { color: #6b7280; font-size: 12px; margin-top: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0;">Bienvenue sur Dividy!</h1>
                </div>
                <div class="content">
                  <p>Merci de vous être inscrit. Pour finaliser votre inscription et accéder à Dividy, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous:</p>
                  <a href="${url}" class="button">Vérifier mon email</a>
                  <p>Ou copiez et collez ce lien dans votre navigateur:</p>
                  <p style="word-break: break-all; font-size: 12px; color: #6b7280;">${url}</p>
                  <p>Ce lien expire dans 24 heures.</p>
                  <div class="footer">
                    <p>Si vous n'avez pas créé de compte Dividy, vous pouvez ignorer cet email en toute sécurité.</p>
                    <p>© 2024 Dividy. Tous droits réservés.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  advanced: {
    generateId: () => {
      // Using crypto.randomUUID() for consistent ID generation
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    },
  },

  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          onboardingCompleted: user.onboardingCompleted,
        },
      }
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.User
