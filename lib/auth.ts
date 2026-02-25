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
      const emailPayload = {
        from: process.env.EMAIL_FROM || "noreply@dividy.app",
        to: user.email,
        subject: "Vérifiez votre adresse email - Dividy",
        html: `
          <!DOCTYPE html>
          <html lang="fr">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Vérification d'email - Dividy</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  background: #f3f7f4;
                  font-family: "Trebuchet MS", "Segoe UI", Arial, sans-serif;
                  color: #111827;
                }
                .wrapper {
                  width: 100%;
                  padding: 28px 12px;
                }
                .card {
                  max-width: 620px;
                  margin: 0 auto;
                  background: #ffffff;
                  border: 1px solid #e5e7eb;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 12px 32px rgba(6, 78, 59, 0.12);
                }
                .hero {
                  padding: 28px 28px 26px;
                  background: linear-gradient(135deg, #14532d 0%, #16a34a 45%, #34d399 100%);
                  color: #ffffff;
                }
                .eyebrow {
                  display: inline-block;
                  font-size: 12px;
                  font-weight: 700;
                  letter-spacing: 0.12em;
                  text-transform: uppercase;
                  background: rgba(255, 255, 255, 0.16);
                  border: 1px solid rgba(255, 255, 255, 0.32);
                  border-radius: 999px;
                  padding: 6px 10px;
                  margin-bottom: 14px;
                }
                .hero h1 {
                  margin: 0;
                  font-size: 30px;
                  line-height: 1.2;
                }
                .hero p {
                  margin: 10px 0 0;
                  font-size: 15px;
                  line-height: 1.6;
                  opacity: 0.95;
                }
                .content {
                  padding: 30px 28px 26px;
                }
                .content p {
                  margin: 0 0 14px;
                  line-height: 1.65;
                  font-size: 15px;
                  color: #1f2937;
                }
                .cta-wrap {
                  text-align: center;
                  margin: 26px 0 22px;
                }
                .button {
                  display: inline-block;
                  background: #15803d;
                  color: #ffffff !important;
                  text-decoration: none;
                  font-weight: 700;
                  font-size: 15px;
                  padding: 13px 24px;
                  border-radius: 10px;
                }
                .meta {
                  margin-top: 18px;
                  padding: 14px 16px;
                  background: #f0fdf4;
                  border: 1px solid #bbf7d0;
                  border-radius: 10px;
                  font-size: 13px;
                  color: #166534;
                }
                .url {
                  margin-top: 8px;
                  word-break: break-all;
                  font-size: 12px;
                  color: #374151;
                }
                .footer {
                  border-top: 1px solid #e5e7eb;
                  margin-top: 24px;
                  padding-top: 18px;
                  font-size: 12px;
                  color: #6b7280;
                  line-height: 1.6;
                }
                .preheader {
                  display: none !important;
                  visibility: hidden;
                  opacity: 0;
                  color: transparent;
                  height: 0;
                  width: 0;
                  overflow: hidden;
                }
              </style>
            </head>
            <body>
              <div class="preheader">Confirmez votre email pour activer votre compte Dividy.</div>
              <div class="wrapper">
                <div class="card">
                  <div class="hero">
                    <span class="eyebrow">Activation du compte</span>
                    <h1>Prêt à lancer Dividy ?</h1>
                    <p>Il ne reste qu'une étape avant de démarrer: confirmer votre adresse email.</p>
                  </div>

                  <div class="content">
                    <p>Merci pour votre inscription. Cliquez sur le bouton ci-dessous pour vérifier votre email et sécuriser votre accès.</p>

                    <div class="cta-wrap">
                      <a href="${url}" class="button">Confirmer mon email</a>
                    </div>

                    <div class="meta">
                      Ce lien est valable pendant 24 heures.
                      <div class="url">${url}</div>
                    </div>

                    <div class="footer">
                      Si vous n'êtes pas à l'origine de cette inscription, ignorez simplement ce message.
                      <br />
                      © 2026 Dividy. Tous droits réservés.
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      }

      try {
        const result = await resend.emails.send(emailPayload)

        if (result?.error) {
          throw new Error(
            typeof result.error === "string"
              ? result.error
              : JSON.stringify(result.error)
          )
        }
      } catch (error) {
        console.error("[auth] Failed to send verification email:", error)

        if (process.env.NODE_ENV === "production") {
          throw error
        }

        console.warn(
          "[auth] Dev fallback active: verification email not sent. Use this URL to verify manually:"
        )
        console.warn(url)
      }
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
    database: {
      generateId: () => {
        // Using Date + random suffix for compact IDs
        return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
      },
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
