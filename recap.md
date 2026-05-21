# Recap — Projet Dividy

## Concept

**Dividy** est une application web de partage de coûts d'abonnements en groupe. Les utilisateurs peuvent rejoindre ou créer des groupes liés à des plateformes (Netflix, Spotify, etc.) pour mutualiser le coût mensuel.

---

## Stack technique

| Couche | Technologie |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui |
| Langage | TypeScript |
| Auth | better-auth (email/password + Google OAuth) |
| BDD | PostgreSQL via Prisma |
| Emails | Resend |
| Déploiement | Scalingo |

---

## Équipe

| Pseudo Git | Commits |
| --- | --- |
| Nathan OGER | 34 |
| Anas | 20 |
| Nicolas-Delahaie (moi) | 11 |
| SkyBlob12 | 8 |
| julescavanier | 7 |
| Théo Gardais / gardaistheo | 5 |
| Clément Andrieu | 1 |

---

## Timeline des fonctionnalités

### Novembre 2025 — Initialisation

- **`83fbcc1`** — Init Next.js + shadcn/ui : mise en place du projet avec tous les composants UI de base
- **`4abf545`** (US-001) — Première landing page : présentation du concept Dividy
- **`f5d7252`** (US-003) — Authentification complète avec BetterAuth + Supabase :
  - Inscription email/password (règles : 8 chars min, majuscule, chiffre)
  - Connexion Google OAuth et Facebook OAuth
  - Vérification email obligatoire par token
  - Session 7 jours
  - Flow onboarding post-vérification
- **`cff808a`** — Liste des plateformes (données mockées)
- **`c8d76ae`** — Fixes UI navigation et authentification

### Janvier 2026 — Dashboard & Navigation

- **`f30c53d`** (US-004) — Dashboard structuré avec sidebar et thème vert :
  - Stats abonnements
  - Accès rapide aux groupes
  - Liste des abonnements
  - Paiements à venir
  - Helpers `formatCurrency` et `formatDate`
- **`7cf9031`** (US-010) — Sidebar + bouton "retour en haut de page"
- **`7dd3525`** — Fix warning d'hydratation Next.js
- **`17edccb`** — Audit de sécurité + correctifs

### Février 2026 — Plateformes & Merges

- **`61b4aa2`** (US-002) — Détails des plateformes (pages individuelles)
- **`5ef9318`** — Fix connexion Supabase
- **Merge #14** — Navigation latérale fusionnée dans main
- **Merge #17** — Branche develop fusionnée dans main
- **Merge #18** — Feature US-002 (évaluation des plateformes) fusionnée
- **Merge #19** — Fix merge main

### Mars 2026 — Groupes & Déploiement

- **`99cb3f4`** — Modèles Prisma `Platform`, `Group`, `GroupMember` + seed de 29 plateformes
- **`333f46a`** — Routes API groupes (CRUD + join) et plateformes :
  - `GET/POST /api/groups`
  - `GET /api/groups/[id]`
  - `POST /api/groups/[id]/join`
  - `GET /api/platforms`
  - `GET /api/platforms/[slug]/groups`
- **`926cd9b`** (US-005) — Dialog de création de groupe, page détail groupe, listing dans le dashboard
- **`56de812`** — Migration des pages plateformes : données mockées → requêtes BDD réelles
- **`bdd0384`** — Migration du middleware vers la convention `proxy.ts` (Next.js 16.1.2)
- **`146e498`** — Fix boucle infinie d'onboarding (déclaration `onboardingCompleted` comme `additionalField` dans BetterAuth)
- **`72502bb`** — Ajout CSRF protection + vérification email sur la route onboarding
- **`2caaf63`** — `crypto.randomUUID()` pour la génération d'IDs + validation password côté serveur
- **`1491821`** — Prévention de l'énumération d'emails (messages d'erreur génériques)
- **`26192d3`** — Fix edge runtime : remplacement des appels Prisma directs par `fetch` dans le middleware
- **Merge #24 / #25** — US-005 "rejoindre un groupe" fusionnée dans main
- **`2e94287`** — Config build : TS → MJS (Scalingo n'a pas accès aux dev deps)
- **Merge #26** — Fix déploiement Scalingo
- **Merge #27** — Dashboard US-004 fusionné
- **`57d0131`** + **Merge #28** — Bouton de retour en arrière ajouté

### Avril 2026 — Landing page, Leave group & Design

- **`a7854c7`** — Refonte landing page + suppression de la route dashboard dupliquée
- **`babaa00`** — Feature "quitter un groupe" + amélioration layout dashboard
- **`638c6d5`** — Fix redirection après inscription
- **Merge #30 / #32 / #33** — Corrections diverses (main, leave group, redirection)
- **Merge #36** (US-011) — Landing page finale fusionnée
- **`8f75cc3` → `6183751`** (commits Nicolas) — Déploiement Scalingo : config, DNS, env vars, fixes proxy
- **Merge #37** — Design unification v2 (17 fichiers, +1772 / -897 lignes) :
  - Redesign plateformes (filtres, tri, cards harmonisées)
  - Redesign détail plateforme (hero, filtres URL)
  - Refonte page confirmation et succès abonnement
  - Restructure dashboard (cards action en tête, filtres avancés)
  - Redesign détail groupe (progression, actions, liste membres)
  - Refonte onboarding compacte avec validation automatique des étapes
  - Redesign sign-in / sign-up / verify-email alignés sur le design system
  - CTA direct vers plateformes sur la home publique

---

## Pull Requests fusionnées

| PR | Branche | Description |
| --- | --- | --- |
| #10 | `1-us-001-comprendre-le-concept` | Landing page initiale |
| #11 | `3-us-003-créer-un-compte-simplement` | Authentification complète |
| #14 | `10-us-010-navigation-latérale` | Sidebar |
| #17 | `develop` | Merge develop → main |
| #18 | `2-us-002-évaluer-les-plateformes-disponibles` | Plateformes |
| #19 | `fix-merge-main` | Fix conflit main |
| #24 / #25 | `5-us-005-rejoindre-un-groupe-en-confiance` | Rejoindre un groupe |
| #26 | `fix-deploy` | Fix déploiement Scalingo |
| #27 | `4-us-004-tableau-de-bord-personnalisé` | Dashboard |
| #28 | `feat/ajouter_bouton` | Bouton retour |
| #30 | — | Fix main |
| #32 | — | Leave group |
| #33 | — | Fix redirection inscription |
| #36 | `codex/us-11-landing-page` | Landing page finale |
| #37 | `feat/design-unification` | Design unification v2 |

---

## Contributions personnelles (Nicolas-Delahaie)

### Séance 1 — Config Scalingo & DNS

- Travail sur Scalingo : configuration DNS
- Correction de variables d'environnement

### Séance 2 — Déploiement & bugs

- Configuration complète du déploiement sur Scalingo
- Résolution de divers bugs liés au déploiement
- Commits : `fd9454c` (DIRECT_URL inaccessible), `270af77` (fix prod), `9fc3903` (simplification .env.example), `8f75cc3` (suppression `.env.local`)

### Séance 3 — Stabilisation & première mise en prod

- Résolution d'un conflit sur `main`
- Suppression de la branche `develop` pour améliorer le workflow de CI
- Première mise en production de l'application (avec bugs à corriger)
- Commits : `ac87750` (explication pooler), `04f29d2` (Procfile Scalingo), `117d55a` (fix proxy Scalingo), `6183751` (fix domaines de confiance CSRF)

### Séance 4 — Absent (après-midi)

### Séance 5 — 29/04/2026 — Mise en prod finale

- Résolution des derniers bugs Scalingo : prod fonctionnelle
- Mise en place de la redirection depuis `www.dividy.fr`
- Commits : `6183751` (confiance en d'autres noms de domaine Scalingo)

---

## Gestion de projet — Points négatifs

- Le chef de projet ne prenait pas de nouvelles de l'avancement, ne donnait pas d'aide et restait dans son coin
- Des US en doublon ont été créées juste après avoir délégué ce même travail à l'équipe
- Pas d'implication réelle du chef de projet dans son propre projet
- Pour le travail sur Scalingo : Nathan avait mis le nom de domaine sur son compte personnel et refusait d'en déléguer l'accès, obligeant à utiliser son ordinateur à chaque intervention sur le DNS — ce qui ralentissait significativement le travail

---

## Problèmes techniques notables résolus

| Problème | Solution |
| --- | --- |
| Middleware incompatible edge runtime | Remplacement des appels Prisma directs par `fetch` dans `proxy.ts` |
| Boucle infinie d'onboarding | Déclaration explicite d'`onboardingCompleted` comme `additionalField` dans BetterAuth |
| Build Scalingo cassé | Migration de la config build de `.ts` vers `.mjs` (Scalingo sans dev deps) |
| `DIRECT_URL` inaccessible | Suppression de la variable, usage du seul `DATABASE_URL` avec pooler |
| Proxy Scalingo HTTP/HTTPS | Appels internes en `http://` dans le middleware pour éviter les erreurs TLS |
| CSRF avec domaines Scalingo | Ajout des domaines Scalingo dans les origines autorisées |
| Énumération d'emails | Messages d'erreur génériques sur les routes auth |

---

## Informations manquantes

> Les champs suivants n'ont pas encore été remplis. À compléter.

- Contexte du projet (école ? formation ? projet perso ?)
- Identité complète des coéquipiers (SkyBlob12, julescavanier, etc.)
- Liste complète des User Stories avec descriptions
- URL de production : `www.dividy.fr` ✓
- Statut de la feature d'abonnement (réelle ou maquette ?)
- Présence ou non de tests automatisés
- Raison du choix de Scalingo vs Vercel
